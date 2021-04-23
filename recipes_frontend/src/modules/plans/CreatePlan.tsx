import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Checkbox,
  withStyles,
  WithStyles,
  createStyles,
  Theme,
  Typography,
  Link,
  TextField,
  Button,
} from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Link as RouterLink, RouteComponentProps, withRouter } from "react-router-dom";
import { NewPlan, Recipe } from "helpers/interfaces";
import { getAllRecipes, createPlan } from "services/api";

const styles = (theme: Theme) => createStyles({
  formRow: {
    marginBottom: 25,
  },
  unconfirmed_icon: {
    fontSize: "1.125rem",
    marginLeft: theme.spacing()
  }
});

interface CreatePlanProps extends WithStyles<typeof styles>, RouteComponentProps { }

const CreatePlan = ({ classes, history }: CreatePlanProps) => {
  const [recipes, setRecipes] = useState([] as Recipe[]);
  const [comment, setComment] = useState('');
  const [recipesChecked, setRecipesChecked] = useState([] as number[]);

  useEffect(() => {
    const getRecipes = async () => {
      const recipes = await getAllRecipes();
      setRecipes(recipes);
    }
    getRecipes();
  }, []);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const plan: NewPlan = {
      comment,
      recipes: recipesChecked
    };

    const result = await createPlan(plan);
    if (!isNaN(result)) {
      alert("Plan gespeichert!");
      history.push(`weekplan`);
    }
  };

  const handleCheckboxChange = (recipe: Recipe) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setRecipesChecked([...recipesChecked, recipe.id]);
    } else {
      setRecipesChecked(recipesChecked.filter((recipeId) => recipeId !== recipe.id))
    }
  };

  return (
    <form noValidate onSubmit={submitHandler}>
      <Typography gutterBottom variant="h5">
        Neuer Wochenplan
      </Typography>
      <TextField
        className={classes.formRow}
        id="comment"
        label="Kommentar (optional)"
        fullWidth
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <div className={classes.formRow}>
        {recipes.map(recipe => (
          <div key={recipe.id}>
            <Checkbox
              checked={recipesChecked.includes(recipe.id)}
              onChange={handleCheckboxChange(recipe)}
            />
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
          </div>
        ))}
      </div>
      <Button variant="contained" color="primary" type="submit">
        Speichern
      </Button>
    </form>
  );
};

export default withStyles(styles)(withRouter(CreatePlan));
