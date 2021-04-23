import React, {useEffect, useState} from "react";
import {
    Button,
    createStyles,
    FormControl,
    FormGroup,
    IconButton, Input, InputAdornment,
    InputLabel,
    Theme,
    withStyles,
    WithStyles,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {login} from "services/api";
import {Visibility, VisibilityOff} from "@material-ui/icons";

const styles = (theme: Theme) => createStyles({
    form: {
        maxWidth: theme.spacing(50),
        margin: "0 auto",
    },
    section: {
        marginBottom: theme.spacing(3),
    },
});

interface LoginProps extends WithStyles<typeof styles>, RouteComponentProps {}

const Login = ({classes, history}: LoginProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            setLoading(false);
        }
    }, [history, setLoading]);

    const submitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        setErrors(false);
        const token = await login(email, password);
        if (token) {
            localStorage.clear();
            localStorage.setItem("token", token);
            window.location.reload();
            return;
        }
        localStorage.clear();
        setErrors(true);
    };


    return loading ? null : (
        <form onSubmit={submitHandler} className={classes.form}>
            {errors &&
            <MuiAlert elevation={6} variant="filled" severity={"warning"} className={classes.section}>
                Login failed!
            </MuiAlert>
            }
            <FormGroup className={classes.section}>
                <FormControl error={errors}>
                    <InputLabel htmlFor="email">E-Mail</InputLabel>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </FormControl>
            </FormGroup>
            <FormGroup className={classes.section}>
                <FormControl error={errors}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(curr => !curr)}
                                    onMouseDown={(event => event.preventDefault())}
                                >
                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </FormGroup>
            <FormGroup className={classes.section}>
                <Button variant="contained" color="primary" type={"submit"}>
                    Submit
                </Button>
            </FormGroup>
        </form>
    );
};

export default withStyles(styles)(withRouter(Login));