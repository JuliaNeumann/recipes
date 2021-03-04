import React from "react";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Ingredient } from "helpers/interfaces";

const styles = (theme: Theme) => createStyles({
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
});

interface IngredientFormRowProps extends WithStyles<typeof styles> {
  ingredient: Ingredient;
  index: number;
  updateIngredient: (index: number, ingredient: Ingredient) => void;
};

const IngredientFormRow = ({ classes, ...props }: IngredientFormRowProps) => {
  return (
    <div className={classes.formRowFlex}>
      <TextField
        className={classes.ingredientAmount}
        label="Menge"
        type="number"
        value={props.ingredient.amount}
        onChange={(event) => props.updateIngredient(props.index, { ...props.ingredient, amount: parseInt(event.target.value) })}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        className={classes.ingredientUnit}
        label="Einheit"
        value={props.ingredient.unit}
        onChange={(event) => props.updateIngredient(props.index, { ...props.ingredient, unit: event.target.value })}
      />
      <TextField
        className={classes.ingredientMain}
        label="Zutat"
        value={props.ingredient.name}
        onChange={(event) => props.updateIngredient(props.index, { ...props.ingredient, name: event.target.value })}
      />
    </div>
  );
}

export default withStyles(styles)(IngredientFormRow);
