import { useState, useEffect } from "react";
import { Box, ScrollArea, Stack, Paper, Text, Badge, Modal, Button, Group, Divider } from "@mantine/core";
import { fetchProducts, Product } from "../api/products";
import { ShoppingCart, Tag, DollarSign } from "lucide-react";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };

    loadProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpened(true);
  };

  const formatPrice = (price: number) => {
    return `HK$${price.toLocaleString()}`;
  };

  return (
    <>
      <Box
        style={{
          width: "350px",
          height: "100vh",
          backgroundColor: "#f8f9fa",
          borderRight: "1px solid #e9ecef",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 登入狀態顯示 */}
        <Paper
          p="md"
          style={{
            backgroundColor: "#1c7ed6",
            color: "white",
            borderRadius: 0,
            textAlign: "center",
          }}
        >
          <Text size="sm" fw={500}>
            登入身份: test test
          </Text>
        </Paper>

        {/* 產品列表標題 */}
        <Box p="md" style={{ borderBottom: "1px solid #e9ecef" }}>
          <Text size="lg" fw={600} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShoppingCart size={20} />
            資安產品列表
          </Text>
        </Box>

        {/* 產品列表 */}
        <ScrollArea style={{ flex: 1 }} p="md">
          {loading ? (
            <Text ta="center" c="dimmed">
              載入中...
            </Text>
          ) : (
            <Stack gap="sm">
              {products.map((product) => (
                <Paper
                  key={product.id}
                  p="md"
                  shadow="xs"
                  radius="md"
                  style={{
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: "1px solid #e9ecef",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
                  }}
                  onClick={() => handleProductClick(product)}
                >
                  <Stack gap="xs">
                    <Text fw={600} size="sm" lineClamp={2}>
                      {product.name}
                    </Text>
                    <Badge size="xs" color="blue" variant="light">
                      {product.category}
                    </Badge>
                    <Text size="lg" fw={700} c="green">
                      {formatPrice(product.price)}
                    </Text>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          )}
        </ScrollArea>
      </Box>

      {/* 產品詳情 Modal */}
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={
          <Text size="lg" fw={600}>
            產品詳情
          </Text>
        }
        size="lg"
        centered
      >
        {selectedProduct && (
          <Stack gap="md">
            <Box>
              <Text size="xl" fw={700} mb="xs">
                {selectedProduct.name}
              </Text>
              <Group gap="xs">
                <Badge color="blue" variant="filled">
                  {selectedProduct.category}
                </Badge>
                <Badge color="gray" variant="light">
                  {selectedProduct.product_type}
                </Badge>
              </Group>
            </Box>

            <Divider />

            <Box>
              <Text size="sm" fw={600} mb="xs" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <DollarSign size={16} />
                價格
              </Text>
              <Text size="xl" fw={700} c="green">
                {formatPrice(selectedProduct.price)}
              </Text>
            </Box>

            <Box>
              <Text size="sm" fw={600} mb="xs">
                產品描述
              </Text>
              <Text size="sm" style={{ lineHeight: 1.6 }}>
                {selectedProduct.description}
              </Text>
            </Box>

            {selectedProduct.tags.length > 0 && (
              <Box>
                <Text size="sm" fw={600} mb="xs" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Tag size={16} />
                  標籤
                </Text>
                <Group gap="xs">
                  {selectedProduct.tags.map((tag, index) => (
                    <Badge key={index} size="sm" variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </Group>
              </Box>
            )}

            <Divider />

            <Group justify="flex-end">
              <Button variant="outline" onClick={() => setModalOpened(false)}>
                關閉
              </Button>
              <Button color="blue">
                了解更多
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </>
  );
}