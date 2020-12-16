import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const IngredientFormRowStyles = {
  formRowFlex: {
    marginBottom: 25,
    display: "flex",
  },
  ingredientAmount: {
    maxWidth: 60,
    marginRight: 10,
  },
  ingredientMain: {
    flexGrow: 1,
    marginRight: 10,
  },
  ingredientUnit: {
    maxWidth: 150,
    marginRight: 10,
  },
};

class IngredientFormRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { amount: 0, unit: "", name: "" };
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.formRowFlex}>
        <TextField
          className={classes.ingredientAmount}
          label="Menge"
          type="number"
          value={this.state.amount}
          onChange={(event) => this.setState({ amount: event.target.value })}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          className={classes.ingredientUnit}
          label="Einheit"
          value={this.state.unit}
          onChange={(event) => this.setState({ unit: event.target.value })}
        />
        <TextField
          className={classes.ingredientMain}
          label="Zutat"
          value={this.state.name}
          onChange={(event) => this.setState({ name: event.target.value })}
        />
      </div>
    );
  }
}

export default withStyles(IngredientFormRowStyles)(IngredientFormRow);
