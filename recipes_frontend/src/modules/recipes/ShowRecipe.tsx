import React, { useEffect, useState } from "react";
import {
  createStyles,
  IconButton,
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
  WithStyles,
  Snackbar
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Ingredient, Recipe } from "helpers/interfaces";
import { deleteRecipe, getRecipe, updateRecipe } from "services/api";
import PortionSelection from "modules/recipes/PortionSelection";
import CreateRecipe from "modules/recipes/CreateRecipe";

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

const ShowRecipe = ({ classes, match, history }: ShowRecipeProps) => {
  const [id] = useState(parseInt(match.params.id));
  const [recipe, setRecipe] = useState({ id: 0, title: "", description: "", ingredients: [] as Ingredient[], confirmed: true } as Recipe);
  const [ingredients, setIngredients] = useState([] as Ingredient[]);
  const [portions, setPortions] = useState(2);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const getRecipeById = async () => {
      const recipe = await getRecipe(id);
      setRecipe(recipe);
      setIngredients(recipe.ingredients);
    }
    getRecipeById();
  }, [id]);


  const getAmountForPortions = (ingredient: Ingredient) => {
    return (ingredient.amount / ingredient.num_portions) * portions;
  }

  const handleDelete = async () => {
    await deleteRecipe(id);
    history.push(`/`);
  }

  const handleConfirm = async () => {
    const recipeId = await updateRecipe({ ...recipe, confirmed: true });
    setRecipe(await getRecipe(recipeId));
    setShowSnackbar(true);
  }

  return (
    <>
      {recipe && !editMode && (
        <>
          <Typography className={classes.block} variant="h4">
            {recipe.title}
            {!recipe.confirmed &&
              <>
                <IconButton title="Bestätigen" onClick={handleConfirm}>
                  <CheckIcon color="secondary" />
                </IconButton>
              </>
            }
            <IconButton aria-label="delete" title="Löschen" onClick={handleDelete}>
              <DeleteIcon color="secondary" />
            </IconButton>
            <IconButton aria-label="edit" title="Bearbeiten" onClick={() => setEditMode(true)}>
              <EditIcon color="secondary" />
            </IconButton>
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
          <Snackbar open={showSnackbar} autoHideDuration={1000} onClose={() => setShowSnackbar(false)} message="Rezept bestätigt!" />
        </>
      )}
      {recipe && editMode && (
        <CreateRecipe
          recipe={recipe}
          ingredients={ingredients}
          editExisting={true}
        />
      )}
    </>
  );
}

export default withStyles(styles)(withRouter(ShowRecipe));
