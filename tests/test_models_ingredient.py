import unittest

from models import Ingredient # pylint: disable=import-error

class TestIngredient(unittest.TestCase):

    def test_create_ingredient(self):
        """
        Test that ingredient class can be initialized
        """
        my_ingredient = Ingredient("meine Geheimzutat", 4, 100)
        self.assertEqual("100 meine Geheimzutat (für 4 Portionen)", str(my_ingredient))

        my_ingredient = Ingredient("Zutat", 6, 2.5, "kg")
        self.assertEqual("2.5 kg Zutat (für 6 Portionen)", str(my_ingredient))
        
if __name__ == '__main__':
    unittest.main()