import unittest

from models import Recipe # pylint: disable=import-error

class TestRecipe(unittest.TestCase):

    def test_create_recipe(self):
        """
        Test that recipe class can be initialized
        """
        my_recipe = Recipe("my cool recipe", ["sugar", "milk", "honey"], "my cool recipe description")
        self.assertEqual("my cool recipe", my_recipe.title)
        self.assertEqual([], my_recipe.categories)
        
if __name__ == '__main__':
    unittest.main()