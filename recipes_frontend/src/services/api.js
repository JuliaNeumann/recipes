import axios from "axios";

const BASE_URL = "http://localhost:8000/recipes/";

export async function createRecipe(recipe) {
  await axios.post(BASE_URL, recipe);
  // TODO: error handling
  return true;
}
