export interface Recipe {
    title: string;
    description: string;
    url: string;
    confirmed: boolean;
    ingredients: Ingredient[]
}

export interface Ingredient {
    name: string;
    num_portions: number;
    amount: number;
    unit: string;
}

export interface Plan {
    created: Date;
    comment: string;
    recipes: Recipe[];
}

export type Scrapers = "chefkoch"