import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const createRecipeStyles = {
  formRow: {
    marginBottom: 25,
  },
};

class CreateRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "" };
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(event) {
    event.preventDefault();
  }

  render() {
    const classes = this.props.classes;
    return (
      <form noValidate>
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={this.submitHandler}
        >
          Speichern
        </Button>
      </form>
    );
  }
}

export default withStyles(createRecipeStyles)(CreateRecipe);
