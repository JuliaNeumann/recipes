import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableBody,
  TableCell,
  Typography,
} from "@material-ui/core";
import { getRecipe } from "../services/api";
import { withRouter } from "react-router-dom";

const showRecipeStyles = {
  block: {
    marginBottom: 15,
  },
};

class ShowRecipe extends React.Component {
  constructor(props) {
    super(props);

    const { id } = this.props.match.params;
    this.state = {
      recipe: undefined,
      id: id,
    };
  }

  async componentDidMount() {
    const recipe = await getRecipe(this.state.id);
    this.setState({ recipe });
  }

  render() {
    const classes = this.props.classes;

    return (
      <>
        {this.state.recipe && (
          <>
            <Typography className={classes.block} variant="h4">
              {this.state.recipe.title}
            </Typography>
            <TableContainer className={classes.block} component={Paper}>
              <Table className={classes.table} aria-label="recipes table">
                <TableHead>
                  <TableRow>
                    <TableCell>Menge</TableCell>
                    <TableCell>Zutat</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.recipe.ingredient_set.map((ingredient) => (
                    <TableRow key={ingredient.id}>
                      <TableCell>
                        {`${ingredient.amount} ${ingredient.unit}`}
                      </TableCell>
                      <TableCell>{ingredient.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography className={classes.block} variant="h5">
              Zubereitung
            </Typography>
            <Typography>{this.state.recipe.description}</Typography>
          </>
        )}
      </>
    );
  }
}

export default withStyles(showRecipeStyles)(withRouter(ShowRecipe));
