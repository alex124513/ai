import json
from typing import List
from models.product import Product

def load_products() -> List[Product]:
    with open("data/products_10.json", "r", encoding="utf-8") as f:
        products = json.load(f)
    return [Product(**p) for p in products]
