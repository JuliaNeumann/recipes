import React from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import IngredientFormRow from "./IngredientFormRow";
import PortionSelection from "./PortionSelection";
import { createRecipe } from "../services/api";

const createRecipeStyles = {
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
};

class CreateRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
    this.updateIngredient = this.updateIngredient.bind(this);
    this.addIngredient = this.addIngredient.bind(this);

    let ingredientsComponents = [
      <IngredientFormRow index={0} updateIngredient={this.updateIngredient} />,
    ];
    let ingredients = [{ amount: 0, unit: "", name: "" }];

    if (this.props.ingredients) {
      ingredientsComponents = [];
      ingredients = [];
      this.props.ingredients.forEach((ingredient, index) => {
        ingredientsComponents.push(
          <IngredientFormRow
            index={index}
            updateIngredient={this.updateIngredient}
            ingredient={ingredient}
          />
        );
        ingredients.push(ingredient);
      });
    }

    this.state = {
      title: this.props.recipe?.title || "",
      url: this.props.recipe?.url || "",
      description: this.props.recipe?.description || "",
      portions: this.props.ingredients?.[0]?.num_portions || 4,
      ingredientsComponents,
      ingredients,
    };
  }

  async submitHandler(event) {
    event.preventDefault();
    const recipe = {
      title: this.state.title,
      url: this.state.url,
      description: this.state.description,
      ingredient_set: this.state.ingredients.map((ingredient) => {
        ingredient.num_portions = this.state.portions;
        return ingredient;
      }),
    };

    const result = await createRecipe(recipe);
    if (!isNaN(result)) {
      alert("Rezept gespeichert!");
      this.props.history.push(`recipe/${result}`);
    }
  }

  updateIngredient(index, ingredient) {
    const ingredients = this.state.ingredients.slice();
    ingredients[index] = ingredient;
    this.setState({ ingredients });
  }

  addIngredient() {
    this.setState({
      ingredientsComponents: [
        ...this.state.ingredientsComponents,
        <IngredientFormRow
          index={this.state.ingredients.length}
          updateIngredient={this.updateIngredient}
        />,
      ],
      ingredients: [
        ...this.state.ingredients,
        { amount: 0, unit: "", name: "" },
      ],
    });
  }

  render() {
    const classes = this.props.classes;
    return (
      <form noValidate onSubmit={this.submitHandler}>
        <TextField
          className={classes.formRow}
          id="title"
          label="Titel"
          fullWidth
          value={this.state.title}
          onChange={(event) => this.setState({ title: event.target.value })}
        />
        <TextField
          className={classes.formRow}
          id="url"
          label="URL (optional)"
          fullWidth
          value={this.state.url}
          onChange={(event) => this.setState({ url: event.target.value })}
        />
        <PortionSelection
          portions={this.state.portions}
          changeHandler={(event) =>
            this.setState({ portions: event.target.value })
          }
        />
        <div className={classes.ingredients}>
          <div className={classes.ingredientsList}>
            {this.state.ingredientsComponents.map((ingredient, index) => (
              <React.Fragment key={index}>{ingredient}</React.Fragment>
            ))}
          </div>
          <IconButton
            className={classes.addIngredient}
            color="secondary"
            onClick={this.addIngredient}
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
          value={this.state.description}
          onChange={(event) =>
            this.setState({ description: event.target.value })
          }
        />
        <Button variant="contained" color="primary" type="submit">
          Speichern
        </Button>
      </form>
    );
  }
}

export default withStyles(createRecipeStyles)(withRouter(CreateRecipe));
