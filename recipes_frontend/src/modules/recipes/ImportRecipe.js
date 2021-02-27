import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
  FormGroup,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { importRecipe } from "services/api";
import CreateRecipe from "modules/recipes/CreateRecipe";

const importRecipeStyles = {
  formRow: {
    marginBottom: 25,
  },
};

class ImportRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scraper: "chefkoch",
      url: "",
      importDone: false,
      recipe: {},
      ingredients: [],
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  async submitHandler(event) {
    event.preventDefault();
    const result = await importRecipe(this.state.scraper, this.state.url);
    if (result?.error) {
      alert(result.error);
      return;
    }
    this.setState({
      recipe: result.recipe,
      ingredients: result.ingredients.map((ingredient) => {
        return {
          num_portions: ingredient.num_portions,
          unit: ingredient.unit || "",
          amount: ingredient.amount || 0,
          name: ingredient.name,
        };
      }),
      importDone: true,
    });
  }

  render() {
    const classes = this.props.classes;

    return (
      <>
        {!this.state.importDone && (
          <form noValidate onSubmit={this.submitHandler}>
            <Typography gutterBottom variant="h5">
              Rezept Import
            </Typography>
            <TextField
              className={classes.formRow}
              id="url"
              label="URL"
              fullWidth
              value={this.state.url}
              onChange={(event) => this.setState({ url: event.target.value })}
            />
            <FormGroup>
              <FormControl component="fieldset" className={classes.formRow}>
                <FormLabel component="legend">Importieren von ...</FormLabel>
                <RadioGroup
                  aria-label="import from"
                  name="scraper"
                  value={this.state.scraper}
                  onChange={(event) => {
                    this.setState({ scraper: event.target.value });
                  }}
                >
                  <FormControlLabel
                    value="chefkoch"
                    control={<Radio />}
                    label="Chefkoch"
                  />
                </RadioGroup>
              </FormControl>
            </FormGroup>
            <Button variant="contained" color="primary" type="submit">
              Importieren
            </Button>
          </form>
        )}
        {this.state.importDone && (
          <CreateRecipe
            recipe={this.state.recipe}
            ingredients={this.state.ingredients}
          />
        )}
      </>
    );
  }
}

export default withStyles(importRecipeStyles)(withRouter(ImportRecipe));
