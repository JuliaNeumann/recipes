import unittest

from scrapers import chefkoch


class TestChefkoch(unittest.TestCase):

    def test_is_correct_url(self):
        """
        Test that it recognizes correct chefkoch urls
        """
        self.assertTrue(chefkoch.is_correct_url("https://www.chefkoch.de/rezepte/966751202371651/Grillspiess-mit-Huhn-und-Brezenteig.html"))
        self.assertFalse(chefkoch.is_correct_url("https://www.chefkoch.de/rezepte/foo/bar"))
        self.assertFalse(chefkoch.is_correct_url("https://www.chefkoch.de/rezepte/"))
        self.assertFalse(chefkoch.is_correct_url("https://www.chefoch.de/rezepte/966751202371651/Grillspiess-mit-Huhn-und-Brezenteig.html"))
        self.assertFalse(chefkoch.is_correct_url("https://www.chefkoch.de/966751202371651/Grillspiess-mit-Huhn-und-Brezenteig.html"))
        self.assertFalse(chefkoch.is_correct_url("http://www.chefkoch.de/rezepte/966751202371651/Grillspiess-mit-Huhn-und-Brezenteig.html"))

if __name__ == '__main__':
    unittest.main()
