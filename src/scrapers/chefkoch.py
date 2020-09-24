import re
import requests
from bs4 import BeautifulSoup, Tag

from .scraper_interface import ScraperInterface
from src.models import Recipe, Ingredient

class Chefkoch(ScraperInterface):
    """
    Chefkoch Scraper - for retrieving recipe data from chefkoch.de
    """

    def get_recipe(self, url: str) -> Recipe:
        """
        Main method: retrieve `Recipe` from the given chefkoch url
        """
        if self.is_correct_url(url):
            result = requests.get(url).text
            return self.parse_html_to_recipe(result)
        print("Keine valide Url gegeben.") # TODO: proper error handling
        return None

    def is_correct_url(self, url: str) -> bool:
        """
        Checks if given `url` is a valid chefkoch url
        """
        return re.search(r"^https://www.chefkoch.de/rezepte/\d+/[\w\-]+\.html(\?[\w&=]+)?$", url) is not None

    def parse_html_to_recipe(self, html: str) -> Recipe:
        """
        Parses the given html of a chefkoch website to a `Recipe` object
        """
        soup = BeautifulSoup(html, "html.parser")
        title = soup.h1.string
        description_lines = soup.find("h2", string="Zubereitung").parent.select_one("small ~ div.ds-box").stripped_strings
        description = "\n".join([line for line in description_lines])
        portions = int(soup.select_one("input[name='portionen']").attrs["value"])
        ingredient_tables = soup.select("table.ingredients")
        ingredients = []
        for table in ingredient_tables:
            self.add_ingredients_from_table(table, portions, ingredients)
        return Recipe(title, ingredients, description)

    def add_ingredients_from_table(self, table: Tag, portions: int, ingredients: list):
        """
        Retrieves ingredients from given `table` and adds them to `ingredients`
        """
        ingredient_rows = table.select("tr")
        for row in ingredient_rows:
            name_cell = row.select_one(".td-right span")
            if not name_cell:
                continue
            name = name_cell.string
            amount_str = row.select_one(".td-left").string
            ingredients.append(Ingredient(name, portions, amount_str=amount_str))
        