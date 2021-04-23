import React, {useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import clsx from "clsx";
import {
    AppBar,
    createStyles,
    Container,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    Theme,
    Toolbar,
    Typography,
    withStyles,
    WithStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import CreateRecipe from "modules/recipes/CreateRecipe";
import Login from "modules/main/Login";
import NavItems from "modules/main/NavItems";
import RecipesOverview from "modules/recipes/RecipesOverview";
import ShowRecipe from "modules/recipes/ShowRecipe";
import ImportRecipe from "modules/recipes/ImportRecipe";
import PlansOverview from "modules/plans/PlansOverview";
import CreatePlan from "modules/plans/CreatePlan";
import {useEffect} from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import {logout} from "services/api";

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
    root: {
        display: "flex",
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: "none",
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
});

interface AppProps extends WithStyles<typeof styles> {}

const App = ({classes}: AppProps) => {
    const [open, setOpen] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            setIsAuth(true);
        }
    }, []);

    const logoutHandler = async () => {
        const success = await logout();
        if (success) {
            localStorage.clear();
            window.location.reload();
            return;
        }
        alert("Error during logout!");
    }

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="absolute"
                    className={clsx(classes.appBar, open && classes.appBarShift)}
                >
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="secondary"
                            aria-label="open drawer"
                            onClick={() => setOpen(true)}
                            className={clsx(
                                classes.menuButton,
                                open && classes.menuButtonHidden,
                            )}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            Rezepte
                        </Typography>
                        <RestaurantIcon color="secondary"/>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={() => setOpen(false)}>
                            <ChevronLeftIcon color="secondary"/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        <NavItems/>
                        {isAuth &&
                        <ListItem button onClick={logoutHandler}>
                            <ListItemIcon>
                                <ExitToAppIcon color="secondary" />
                            </ListItemIcon>
                            <ListItemText primary={"Logout"}/>
                        </ListItem>
                        }
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Container maxWidth="lg" className={classes.container}>
                        {isAuth &&
                        <Switch>
                            <Route path="/create">
                                <CreateRecipe/>
                            </Route>
                            <Route path="/import">
                                <ImportRecipe/>
                            </Route>
                            <Route path="/weekplan">
                                <PlansOverview/>
                            </Route>
                            <Route path="/create-weekplan">
                                <CreatePlan/>
                            </Route>
                            <Route path="/recipe/:id">
                                <ShowRecipe/>
                            </Route>
                            <Route path="/">
                                <RecipesOverview/>
                            </Route>
                        </Switch>
                        }
                        {!isAuth &&
                        <Route path="/">
                            <Login/>
                        </Route>
                        }
                    </Container>
                </main>
            </div>
        </Router>
    );
};

export default withStyles(styles)(App);
