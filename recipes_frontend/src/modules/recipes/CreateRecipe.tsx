import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  createStyles,
  Theme,
  Button,
  IconButton,
  TextField,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import IngredientFormRow from "modules/recipes/IngredientFormRow";
import PortionSelection from "modules/recipes/PortionSelection";
import { createRecipe } from "services/api";
import { NewIngredient, NewRecipe } from "helpers/interfaces";
import { FormEvent } from "react";

const styles = (theme: Theme) => createStyles({
  formRow: {
    marginBottom: 25,
  },
  ingredients: {
    display: "flex",
    marginBottom: 10,
  },
  ingredientsList: {
    flexGrow: 1,
  },
  addIngredient: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
});

interface CreateRecipeProps extends WithStyles<typeof styles>, RouteComponentProps {
  recipe?: NewRecipe;
  ingredients?: NewIngredient[];
}

const CreateRecipe = ({ classes, history, ...props }: CreateRecipeProps) => {
  const [title, setTitle] = useState(props.recipe?.title || "");
  const [url, setUrl] = useState(props.recipe?.url || "");
  const [description, setDescription] = useState(props.recipe?.description || "");
  const [portions, setPortions] = useState(props.ingredients?.[0]?.num_portions || 2);
  const [ingredients, setIngredients] = useState([{ amount: 0, unit: "", name: "", num_portions: 2 }] as NewIngredient[]);

  useEffect(() => {
    if (props.ingredients) {
      setIngredients(props.ingredients.map(ingredient => ({ ...ingredient })));
    }
  }, [props.ingredients]);

  const updateIngredient = (index: number, ingredient: NewIngredient) => {
    const newIngredients: NewIngredient[] = ingredients.slice();
    newIngredients[index] = { ...ingredient };
    setIngredients(newIngredients);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const recipe: NewRecipe = {
      title: title,
      url: url,
      description: description,
      ingredients: ingredients.map((ingredient) => {
        ingredient.num_portions = portions;
        return ingredient;
      }),
      confirmed: false,
    };

    const result = await createRecipe(recipe);
    if (!isNaN(result)) {
      alert("Rezept gespeichert!");
      history.push(`recipe/${result}`);
    }
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { amount: 0, unit: "", name: "", num_portions: 2 },
    ]);
  };

  return (
    <form noValidate onSubmit={submitHandler}>
      <Typography gutterBottom variant="h5">
        Neues Rezept
      </Typography>
      <TextField
        className={classes.formRow}
        id="title"
        label="Titel"
        fullWidth
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <TextField
        className={classes.formRow}
        id="url"
        label="URL (optional)"
        fullWidth
        value={url}
        onChange={(event) => setUrl(event.target.value)}
      />
      <PortionSelection
        portions={portions}
        changeHandler={(event) => setPortions(parseInt(event.target.value))}
      />
      <div className={classes.ingredients}>
        <div className={classes.ingredientsList}>
          {ingredients.map((ingredient, index) => (
            <IngredientFormRow key={index} index={index} ingredient={ingredient} updateIngredient={updateIngredient} />
          ))}
        </div>
        <IconButton
          className={classes.addIngredient}
          color="secondary"
          onClick={addIngredient}
        >
          <AddIcon />
        </IconButton>
      </div>
      <TextField
        className={classes.formRow}
        id="description"
        label="Beschreibung"
        rows={20}
        variant="outlined"
        multiline
        fullWidth
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <Button variant="contained" color="primary" type="submit">
        Speichern
      </Button>
    </form>
  );
};

export default withStyles(styles)(withRouter(CreateRecipe));
