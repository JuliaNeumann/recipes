import axios from "axios";

const BASE_URL = "http://localhost:8000/recipes/";

export async function createRecipe(recipe) {
  await axios.post(BASE_URL, recipe);
  // TODO: error handling
  return true;
}


export async function getAllRecipes() {
  const result = await axios.get(BASE_URL);
  return result.data;
}

export async function getRecipe(id) {
  const result = await axios.get(`${BASE_URL}${id}/`);
  return result.data;
}