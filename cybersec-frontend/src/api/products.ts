export type Product = {
  id: number;
  product_type: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  price: number;
  bundle_with: number[];
};

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch("http://localhost:8000/products/");
    
    if (!response.ok) {
      throw new Error("無法獲取產品列表");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ 獲取產品列表失敗:", error);
    return [];
  }
}

export async function fetchProductById(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`http://localhost:8000/products/${id}`);
    
    if (!response.ok) {
      throw new Error("無法獲取產品詳情");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ 獲取產品詳情失敗:", error);
    return null;
  }
}