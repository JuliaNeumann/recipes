import unittest

from models import Ingredient # pylint: disable=import-error

class TestIngredient(unittest.TestCase):

    def test_create_ingredient(self):
        my_ingredient = Ingredient("meine Geheimzutat", 4, 100)
        self.assertEqual("100 meine Geheimzutat (für 4 Portionen)", str(my_ingredient))

        my_ingredient = Ingredient("Zutat", 6, 2.5, "kg")
        self.assertEqual("2.5 kg Zutat (für 6 Portionen)", str(my_ingredient))

    def test_get_amount_from_str(self):
        self.assert_amount(425, "ml", "425 ml")
        self.assert_amount(3.75, "kg", "3.75 kg")
        self.assert_amount(1.2, "Liter", "1,2 Liter")
        self.assert_amount(0.5, "Becher", "½ Becher")
        self.assert_amount(1, "kl. Dose/n", "1 kl. Dose/n")
        self.assert_amount(2, None, "2")
        self.assert_amount(None, "etwas", "etwas")
        self.assert_amount(None, "n. B.", "n. B.")
        self.assert_amount(None, None, "")


    # HELPERS ---------------------------------------
    
    def assert_amount(self, expected_amount, expected_unit, amount_str):
        my_ingredient = Ingredient("meine Geheimzutat", 4, amount_str=amount_str)
        self.assertEqual(expected_amount, my_ingredient.amount)
        self.assertEqual(expected_unit, my_ingredient.unit)

        
if __name__ == '__main__':
    unittest.main()