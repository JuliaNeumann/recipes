import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Link,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableBody,
  TableCell,
  Typography,
} from "@material-ui/core";
import { getAllRecipes } from "../services/api";
import { Link as RouterLink } from "react-router-dom";

const recipesOverviewStyles = {
  headline: {
    marginBottom: 15,
  },
};

class RecipesOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
    };
  }

  async componentDidMount() {
    const recipes = await getAllRecipes();
    this.setState({ recipes });
  }

  render() {
    const classes = this.props.classes;

    return (
      <>
        <Typography className={classes.headline} variant="h4">
          {this.state.recipes.length} Rezepte
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="recipes table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Titel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.recipes.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell component="th" scope="row">
                    {recipe.id}
                  </TableCell>
                  <TableCell>
                    <Link
                      component={RouterLink}
                      to={`/recipe/${recipe.id}`}
                      color="secondary"
                    >
                      {recipe.title}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default withStyles(recipesOverviewStyles)(RecipesOverview);
