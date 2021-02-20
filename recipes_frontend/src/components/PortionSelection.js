import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";

const portionSelectionStyles = {
  wrapper: {
    display: "flex",
    alignItems: "baseline",
    paddingBottom: "5px"
  },
  numField: {
    maxWidth: 50,
    marginRight: 10,
  },
};

function PortionSelection(props) {
  const classes = props.classes;

  return (
    <Typography className={classes.wrapper} component="div">
      Zutaten für &nbsp;
      <TextField
        className={classes.numField}
        type="number"
        value={props.portions}
        onChange={props.changeHandler}
      />
      Portionen:
    </Typography>
  );
}

export default withStyles(portionSelectionStyles)(PortionSelection);
