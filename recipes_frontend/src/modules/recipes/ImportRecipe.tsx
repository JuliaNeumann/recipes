import React, { FormEvent, useState } from "react";
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
  Theme,
  createStyles,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import { importRecipe } from "services/api";
import CreateRecipe from "modules/recipes/CreateRecipe";
import { Ingredient, Recipe, Scrapers } from "helpers/interfaces";

const styles = (theme: Theme) => createStyles({
  formRow: {
    marginBottom: 25,
  },
});

interface ImportRecipeProps extends WithStyles<typeof styles> { };

const ImportRecipe = ({ classes }: ImportRecipeProps) => {
  const [scraper, setScraper] = useState("chefkoch" as Scrapers)
  const [url, setUrl] = useState("");
  const [importDone, setImportDone] = useState(false);
  const [recipe, setRecipe] = useState({} as Recipe);
  const [ingredients, setIngredients] = useState([] as Ingredient[]);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await importRecipe(scraper, url);
    if (result?.error) {
      alert(result.error);
      return;
    }
    setRecipe(result.recipe);
    setIngredients(result.ingredients.map((ingredient) => ({
      num_portions: ingredient.num_portions,
      unit: ingredient.unit || "",
      amount: ingredient.amount || 0,
      name: ingredient.name,
    })));
    setImportDone(true);
  }


  return (
    <>
      {!importDone && (
        <form noValidate onSubmit={submitHandler}>
          <Typography gutterBottom variant="h5">
            Rezept Import
            </Typography>
          <TextField
            className={classes.formRow}
            id="url"
            label="URL"
            fullWidth
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
          <FormGroup>
            <FormControl component="fieldset" className={classes.formRow}>
              <FormLabel component="legend">Importieren von ...</FormLabel>
              <RadioGroup
                aria-label="import from"
                name="scraper"
                value={scraper}
                onChange={(event) => setScraper(event.target.value as Scrapers)}
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
      {importDone && (
        <CreateRecipe
          recipe={recipe}
          ingredients={ingredients}
        />
      )}
    </>
  );
}

export default withStyles(styles)(ImportRecipe);
