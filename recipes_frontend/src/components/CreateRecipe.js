import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { IconButton, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import IngredientFormRow from "./IngredientFormRow";

const createRecipeStyles = {
  formRow: {
    marginBottom: 25,
  },
  ingredientsTitle: {
    display: "flex",
    alignItems: "baseline",
  },
  numField: {
    maxWidth: 50,
    marginRight: 10,
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
    this.state = {
      title: "",
      description: "",
      portions: 4,
      ingredients: [<IngredientFormRow />],
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(event) {
    event.preventDefault();
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
        <Typography className={classes.ingredientsTitle} component="div">
          Zutaten für &nbsp;
          <TextField
            className={classes.numField}
            type="number"
            value={this.state.portions}
            onChange={(event) =>
              this.setState({ portions: event.target.value })
            }
          />
          Portionen:
        </Typography>
        <div className={classes.ingredients}>
          <div className={classes.ingredientsList}>
            {this.state.ingredients.map((ingredient, index) => (
              <React.Fragment key={index}>{ingredient}</React.Fragment>
            ))}
          </div>
          <IconButton
            className={classes.addIngredient}
            color="secondary"
            onClick={() => {
              this.setState({
                ingredients: [...this.state.ingredients, <IngredientFormRow />],
              });
            }}
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

export default withStyles(createRecipeStyles)(CreateRecipe);
