export interface Recipe {
    id?: number,
    title: string;
    description: string;
    url?: string;
    confirmed: boolean;
    ingredients: Ingredient[];
}

export interface Ingredient {
    id?: number;
    name: string;
    num_portions: number;
    amount: number;
    unit: string;
}

export interface Meal {
    id: number,
    recipe_id: number,
    title: string,
    done: boolean
}

export interface Plan {
    id: number;
    created: Date;
    comment: string;
    recipes: Recipe[];
    meal_set: Meal[];
}

export type Scrapers = "chefkoch"