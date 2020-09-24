import unicodedata
import re

class Ingredient:
    """
    Main Ingredient Data Class
    """

    def __init__(self, name: str,  num_portions: int, amount: float = None, unit: str = None, amount_str : str =None):
        self.name = name
        self.num_portions = num_portions
        self.amount = amount
        self.unit = unit
        if amount_str:
            self.get_amount_from_str(amount_str)

    def get_amount_from_str(self, amount_str: str):
        amount_arr = amount_str.split()
        if (len(amount_arr) > 0 and self.is_number_str(amount_arr[0])):
            self.amount = self.parse_str_to_number(amount_arr.pop(0))

        if (len(amount_arr) > 0):
            self.unit = " ".join(amount_arr)

    def is_number_str(self, str: str) -> bool:
        return str.isnumeric() or (re.search(r"^\d+[\.,]\d+", str) is not None)

    def parse_str_to_number(self, str: str) -> float:
        str = str.replace(",", ".")
        return unicodedata.numeric(str) if len(str) == 1 else float(str)

    def __str__(self):
        amount = ""
        if self.amount:
            amount = str(self.amount) + " "
        return f'{amount}{self.unit + " " if self.unit else ""}{self.name} (für {self.num_portions} Portionen)'