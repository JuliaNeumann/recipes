import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Ingredient, Recipe } from "helpers/interfaces";
import { getRecipe } from "services/api";
import PortionSelection from "modules/recipes/PortionSelection";

const styles = (theme: Theme) => createStyles({
  block: {
    marginBottom: 15,
  },
  textBlock: {
    whiteSpace: "pre-line",
  },
});
interface MatchParams { id: string; }
interface ShowRecipeProps extends WithStyles<typeof styles>, RouteComponentProps<MatchParams> { };

const ShowRecipe = ({ classes, match }: ShowRecipeProps) => {
  const [id] = useState(parseInt(match.params.id));
  const [recipe, setRecipe] = useState({ id: 0, title: "", description: "", ingredients: [] as Ingredient[], confirmed: true } as Recipe);
  const [portions, setPortions] = useState(2);

  useEffect(() => {
    const getRecipeById = async () => {
      const recipe = await getRecipe(id);
      setRecipe(recipe);
    }
    getRecipeById();
  }, []);


  const getAmountForPortions = (ingredient: Ingredient) => {
    return (ingredient.amount / ingredient.num_portions) * portions;
  }


  return (
    <>
      {recipe && (
        <>
          <Typography className={classes.block} variant="h4">
            {recipe.title}
          </Typography>
          {recipe.url && (
            <Typography className={classes.block}>
              <Link href={recipe.url} target="_blank">
                {recipe.url}
              </Link>
            </Typography>
          )}
          <PortionSelection
            portions={portions}
            changeHandler={(event) => setPortions(parseInt(event.target.value))}
          />
          <TableContainer className={classes.block} component={Paper}>
            <Table
              size="small"
              aria-label="recipes table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Menge</TableCell>
                  <TableCell>Zutat</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recipe.ingredients
                  .sort((a, b) => (a.id && b.id ? (a.id > b.id ? 1 : -1) : 1))
                  .map((ingredient) => (
                    <TableRow key={ingredient.id}>
                      <TableCell>
                        {`${getAmountForPortions(ingredient) || ""} ${ingredient.unit}`}
                      </TableCell>
                      <TableCell>{ingredient.name}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography className={classes.block} variant="h5">
            Zubereitung
            </Typography>
          <Typography className={classes.textBlock}>
            {recipe.description}
          </Typography>
        </>
      )}
    </>
  );
}

export default withStyles(styles)(withRouter(ShowRecipe));
