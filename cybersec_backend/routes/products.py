from fastapi import APIRouter, HTTPException
from models.product import Product
from utils.helpers import load_products
from typing import List
router = APIRouter()

@router.get("/", response_model=list[Product])
def list_products():
    return load_products()

@router.get("/{product_id}", response_model=Product)
def get_product(product_id: int):
    products = load_products()
    for p in products:
        if p.id == product_id:
            return p
    raise HTTPException(status_code=404, detail="Product not found")
