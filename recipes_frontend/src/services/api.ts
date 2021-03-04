import { Ingredient } from './../helpers/interfaces';
import axios from "axios";
import { Scrapers, Recipe, Plan, Meal } from "helpers/interfaces";

const BASE_URL = "http://localhost:8000";

export async function createRecipe(recipe: Recipe): Promise<number> {
  const result = await axios.post(`${BASE_URL}/recipes/`, { ...recipe, ingredient_set: recipe.ingredients });
  // TODO: error handling
  return result.data.id;
}

export async function getAllRecipes(): Promise<Recipe[]> {
  const result = await axios.get(`${BASE_URL}/recipes/`);
  return result.data;
}

export async function getRecipe(id: number): Promise<Recipe> {
  const result = await axios.get(`${BASE_URL}/recipes/${id}/`);
  return {... result.data, ingredients: result.data.ingredient_set};
}

export async function importRecipe(scraper: Scrapers, url: string): Promise<{ recipe: Recipe, ingredients: Ingredient[], error?: string }> {
  const result = await axios.get(`${BASE_URL}/scrape/`, {
    params: { scraper, url },
  });
  // TODO: error handling
  return { ...result.data, url };
}

export async function getAllPlans(): Promise<Plan[]> {
  const result = await axios.get(`${BASE_URL}/plans/`);
  return result.data;
}

export async function updateMealDone(meal: Meal, done: boolean): Promise<Plan[]> {
  meal.done = done;
  await axios.put(`${BASE_URL}/meals/${meal.id}/`, meal)
  return getAllPlans();
}