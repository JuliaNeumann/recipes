from django.test import TestCase
import recipes_scrapers.tests.helpers as helpers # pylint: disable=import-error

from recipes_scrapers.scrapers import Chefkoch # pylint: disable=import-error
from recipes_scrapers.models import Recipe # pylint: disable=import-error

class TestChefkoch(TestCase):

    def test_is_correct_url(self):
        chefkoch = Chefkoch()
        self.assertTrue(chefkoch.is_correct_url("https://www.chefkoch.de/rezepte/966751202371651/Grillspiess-mit-Huhn-und-Brezenteig.html"))
        self.assertTrue(chefkoch.is_correct_url("https://www.chefkoch.de/rezepte/966751202371651/Grillspiess-mit-Huhn-und-Brezenteig.html?zufall=on"))
        self.assertFalse(chefkoch.is_correct_url("https://www.chefkoch.de/rezepte/foo/bar"))
        self.assertFalse(chefkoch.is_correct_url("https://www.chefkoch.de/rezepte/"))
        self.assertFalse(chefkoch.is_correct_url("https://www.chefoch.de/rezepte/966751202371651/Grillspiess-mit-Huhn-und-Brezenteig.html"))
        self.assertFalse(chefkoch.is_correct_url("https://www.chefkoch.de/966751202371651/Grillspiess-mit-Huhn-und-Brezenteig.html"))
        self.assertFalse(chefkoch.is_correct_url("http://www.chefkoch.de/rezepte/966751202371651/Grillspiess-mit-Huhn-und-Brezenteig.html"))

    def test_parse_html_to_recipe(self):
        with open(helpers.resource_file("chefkoch_recipe.html"), "r") as html_file:
            html = html_file.read()
            chefkoch = Chefkoch()
            recipe = chefkoch.parse_html_to_recipe(html)
            self.assertEqual("Mock Rezept", recipe.title)
            self.assertEqual("Zuerst muss man dies tun.\nUnd dann noch das tun.\nUnd am Ende hat man ein leckeres Essen!", recipe.description)
            self.assertEqual(3, len(recipe.ingredients))
            self.assertEqual("500.0 g Zutat 1 (mit extra Info) (für 2 Portionen)", str(recipe.ingredients[0]))
            self.assertEqual("1.0 Zutat 2 (für 2 Portionen)", str(recipe.ingredients[1]))
            self.assertEqual("etwas Zutat 3 und Zutat 4 (für 2 Portionen)", str(recipe.ingredients[2]))
