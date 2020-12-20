import axios from "axios";

const BASE_URL = "http://localhost:8000";

export async function createRecipe(recipe) {
  const result = await axios.post(`${BASE_URL}/recipes/`, recipe);
  // TODO: error handling
  return result.data.id;
}

export async function getAllRecipes() {
  const result = await axios.get(`${BASE_URL}/recipes/`);
  return result.data;
}

export async function getRecipe(id) {
  const result = await axios.get(`${BASE_URL}/recipes/${id}/`);
  return result.data;
}

export async function importRecipe(scraper, url) {
  const result = await axios.get(`${BASE_URL}/scrape/`, {
    params: { scraper, url },
  });
  return result.data;
}
