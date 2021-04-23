import React, { useEffect, useState } from "react";
import {
  createStyles,
  Theme,
  Link,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableBody,
  TableCell,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Link as RouterLink } from "react-router-dom";
import { Recipe } from "helpers/interfaces";
import { getAllRecipes } from "services/api";

const styles = (theme: Theme) => createStyles({
  unconfirmed_icon: {
    fontSize: "1.125rem",
    marginLeft: theme.spacing()
  }
});
interface RecipesOverviewProps extends WithStyles<typeof styles> { };

const RecipesOverview = ({ classes }: RecipesOverviewProps) => {
  const [recipes, setRecipes] = useState([] as Recipe[]);

  useEffect(() => {
    const getRecipes = async () => {
      const recipes = await getAllRecipes();
      setRecipes(recipes);
    }
    getRecipes();
  }, []);


  return (
    <>
      <Typography gutterBottom variant="h5">
        {recipes.length} Rezepte
        </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="recipes table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Titel</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.map((recipe) => (
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
                  {!recipe.confirmed && 
                    <span title="Noch nicht bestätigt!">
                      <ErrorOutlineIcon color="secondary" className={classes.unconfirmed_icon} />
                    </span>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default withStyles(styles)(RecipesOverview);
