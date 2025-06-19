from pydantic import BaseModel
from typing import List

class Product(BaseModel):
    id: int
    product_type: str
    name: str
    description: str
    category: str
    tags: List[str]
    price: float
    bundle_with: List[int]
