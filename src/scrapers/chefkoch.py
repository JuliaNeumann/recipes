"""
Chefkoch Scraper - methods for retrieving recipe data from chefkoch.de
"""

import re
import requests
from bs4 import BeautifulSoup

from models import Recipe, Ingredient

def get_recipe(url):
    """
    Main method: retrieve `Recipe` from the given chefkoch url
    """
    if is_correct_url(url):
        result = requests.get(url).text
        return parse_html_to_recipe(result)
    return None

def is_correct_url(url):
    """
    Checks if given `url` is a valid chefkoch url
    """
    return re.search(r"^https://www.chefkoch.de/rezepte/\d+/[\w\-]+\.html$", url) is not None

def parse_html_to_recipe(html):
    """
    Parses the given html of a chefkock website to a `Recipe` object
    """
    soup = BeautifulSoup(html, "html.parser")
    title = soup.h1.string
    description_lines = soup.select_one("article.recipe-ingredients ~ article").select_one("small ~ div.ds-box").stripped_strings
    description = "\n".join([line for line in description_lines])
    portions = soup.select_one("input[name='portionen']").attrs["value"]
    ingredient_tables = soup.select("table.ingredients")
    ingredients = []
    for table in ingredient_tables:
        add_ingredients_from_table(table, portions, ingredients)
    return Recipe(title, ingredients, description)

def add_ingredients_from_table(table, portions, ingredients):
    """
    Retrieves ingredients from given `table` and adds them to `ingredients`
    """
    ingredient_rows = table.select("tr")
    for row in ingredient_rows:
        name = row.select_one(".td-right span").string
        amount_str = row.select_one(".td-left").string
        ingredients.append(Ingredient(name, portions, amount_str=amount_str))
