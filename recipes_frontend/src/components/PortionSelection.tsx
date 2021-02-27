import React, { ChangeEvent, FunctionComponent } from "react";
import {withStyles,  WithStyles, createStyles, Theme } from '@material-ui/core';
import { TextField, Typography } from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
  wrapper: {
    display: "flex",
    alignItems: "baseline",
    paddingBottom: theme.spacing(),
  },
  numField: {
    maxWidth: 50,
    marginRight: theme.spacing(),
  }
});

interface PortionSelectionProps extends WithStyles<typeof styles> {
  portions: number,
  changeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

const PortionSelection = ({classes, ...props}: PortionSelectionProps) => {
  return (
    <Typography className={classes.wrapper} component="div">
      Zutaten für &nbsp;
      <TextField
        className={classes.numField}
        type="number"
        InputProps={{ inputProps: { min: 1 } }}
        value={props.portions}
        onChange={props.changeHandler}
      />
      Portionen:
    </Typography>
  );
}

export default withStyles(styles)(PortionSelection);
