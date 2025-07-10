import { useState } from "react";
import { Box, TextInput, Button, Paper, Title, Text, Stack } from "@mantine/core";
import { Shield } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.trim()) {
      onLogin();
    }
  };

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
      <Paper
        shadow="xl"
        p="xl"
        radius="lg"
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Stack gap="lg" align="center">
          <Box style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Shield size={32} color="#1c7ed6" />
            <Title order={2} style={{ color: "#1c7ed6" }}>
              資安顧問系統
            </Title>
          </Box>
          
          <Text size="sm" c="dimmed" ta="center">
            歡迎使用 AI 資安產品推薦助理
          </Text>

          <TextInput
            label="用戶名稱"
            placeholder="請輸入用戶名稱"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            style={{ width: "100%" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
            size="md"
          />

          <Button
            onClick={handleLogin}
            size="md"
            style={{ width: "100%" }}
            color="blue"
            disabled={!username.trim()}
          >
            登入系統
          </Button>

          <Text size="xs" c="dimmed" ta="center">
            測試用途：輸入任何用戶名稱即可登入
          </Text>
        </Stack>
      </Paper>
    </Box>
  );
}