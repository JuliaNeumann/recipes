import axios from "axios";
import { Scrapers, Recipe } from "../helpers/interfaces";

const BASE_URL = "http://localhost:8000";

export async function createRecipe(recipe: Recipe): Promise<number> {
  const result = await axios.post(`${BASE_URL}/recipes/`, recipe);
  // TODO: error handling
  return result.data.id;
}

export async function getAllRecipes(): Promise<Recipe[]> {
  const result = await axios.get(`${BASE_URL}/recipes/`);
  return result.data;
}

export async function getRecipe(id: number): Promise<Recipe> {
  const result = await axios.get(`${BASE_URL}/recipes/${id}/`);
  return result.data;
}

export async function importRecipe(scraper: Scrapers, url: string): Promise<Recipe> {
  const result = await axios.get(`${BASE_URL}/scrape/`, {
    params: { scraper, url },
  });
  return {...result.data, url};
}