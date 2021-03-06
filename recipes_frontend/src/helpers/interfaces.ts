export interface NewRecipe {
    title: string;
    description: string;
    url?: string;
    confirmed: boolean;
    ingredients: NewIngredient[];
}

export interface Recipe extends  Omit<NewRecipe, 'ingredients'> {
    id: number;
    ingredients: Ingredient[];
}

export interface NewIngredient {
    name: string;
    num_portions: number;
    amount: number;
    unit: string;
}

export interface Ingredient extends NewIngredient {
    id: number;
}

export interface Meal {
    id: number,
    recipe_id: number,
    title: string,
    done: boolean
}

export interface NewPlan {
    comment: string;
    recipes: number[];
}
export interface Plan extends Omit<NewPlan, 'recipes'> {
    id: number;
    created: Date;
    recipes: Recipe[];
    meal_set: Meal[];
}

export type Scrapers = "chefkoch"