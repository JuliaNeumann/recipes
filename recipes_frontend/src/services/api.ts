import axios from "axios";
import {Ingredient, NewPlan, Scrapers, NewRecipe, Recipe, Plan, Meal} from "helpers/interfaces";

const BASE_URL_AUTH = "http://localhost:8000/users";
const BASE_URL = "http://localhost:8000/api";

const _getAuthHeaders = () => {
    return {"Authorization": `Token ${localStorage.getItem("token")}`};
};

export async function createRecipe(recipe: NewRecipe): Promise<number> {
    const result = await axios.post(`${BASE_URL}/recipes/`, {
        ...recipe,
        ingredient_set: recipe.ingredients,
    }, {headers: _getAuthHeaders()});
    // TODO: error handling
    return result.data.id;
}

export async function updateRecipe(recipe: Recipe): Promise<Recipe> {
    const result = await axios.put(`${BASE_URL}/recipes/${recipe.id}/`, recipe, {headers: _getAuthHeaders()});
    // TODO: error handling
    return {...result.data, ingredients: result.data.ingredient_set};
}

export async function getAllRecipes(): Promise<Recipe[]> {
    const result = await axios.get(`${BASE_URL}/recipes/`, {headers: _getAuthHeaders()});
    return result.data;
}

export async function getRecipe(id: number): Promise<Recipe> {
    const result = await axios.get(`${BASE_URL}/recipes/${id}/`, {headers: _getAuthHeaders()});
    return {...result.data, ingredients: result.data.ingredient_set};
}

export async function importRecipe(scraper: Scrapers, url: string): Promise<{ recipe: Recipe, ingredients: Ingredient[], error?: string }> {
    const result = await axios.get(`${BASE_URL}/scrape/`, {
        params: {scraper, url},
        headers: _getAuthHeaders(),
    });
    // TODO: error handling
    return {...result.data, url};
}

export async function deleteRecipe(id: number) {
    if (window.confirm("Rezept löschen?")) {
        await axios.delete(`${BASE_URL}/recipes/${id}/`, {headers: _getAuthHeaders()});
    }
}

export async function getAllPlans(): Promise<Plan[]> {
    const result = await axios.get(`${BASE_URL}/plans/`, {headers: _getAuthHeaders()});
    return result.data;
}

export async function updateMealDone(meal: Meal, done: boolean) {
    meal.done = done;
    await axios.put(`${BASE_URL}/meals/${meal.id}/`, meal, {headers: _getAuthHeaders()});
}

export async function createPlan(plan: NewPlan): Promise<number> {
    const result = await axios.post(`${BASE_URL}/plans/`, {...plan, meal_set: []}, {headers: _getAuthHeaders()});
    // TODO: error handling
    return result.data.id;
}

export async function deletePlan(id: number) {
    if (window.confirm("Plan löschen?")) {
        await axios.delete(`${BASE_URL}/plans/${id}/`, {headers: _getAuthHeaders()});
    }
}

export async function login(email: string, password: string): Promise<string | undefined> {
    try {
        const result = await axios.post(`${BASE_URL_AUTH}/auth/login/`, {email, password});
        return result.data.key || undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export async function logout(): Promise<boolean> {
    try {
        await axios.post(`${BASE_URL_AUTH}/auth/logout/`, {}, {headers: _getAuthHeaders()});
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}