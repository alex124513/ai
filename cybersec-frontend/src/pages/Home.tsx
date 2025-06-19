import { Box } from "@mantine/core";
import ChatBox from "../components/ChatBox";

export default function Home() {
  return (
    <Box
      style={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        backgroundSize: "400% 400%",
        animation: "gradientAnimation 15s ease infinite",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <ChatBox />
    </Box>
  );
}
