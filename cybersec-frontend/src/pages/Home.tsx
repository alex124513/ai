import { Box, Flex } from "@mantine/core";
import ChatBox from "../components/ChatBox";
import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <Flex
      style={{
        minHeight: "100vh",
      }}
    >
      {/* 左側產品列表 */}
      <ProductList />
      
      {/* 右側聊天介面 */}
      <Box
        style={{
          flex: 1,
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          backgroundSize: "400% 400%",
          animation: "gradientAnimation 15s ease infinite",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "24px",
        }}
      >
        <ChatBox />
      </Box>
    </Flex>
  );
}
