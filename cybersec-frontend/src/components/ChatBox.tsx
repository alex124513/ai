import { useState, useEffect, useRef } from "react";
import { fetchChatAnswer } from "../api/chat";
import { Box, TextInput, Button, ScrollArea, Text, Paper, Stack } from "@mantine/core";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const data = await fetchChatAnswer(input);
      const aiMessage: Message = { role: "ai", content: data.answer };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "⚠️ 系統錯誤，請稍後再試" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        maxHeight: "800px",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        gap: "16px",
        backgroundColor: "#f8f9fa",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <ScrollArea
        style={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "16px",
          border: "1px solid #e0e0e0",
        }}
      >
        <Stack gap="sm">
          {messages.map((msg, i) => (
            <Box
              key={i}
              style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                width: "100%",
              }}
            >
              <Paper
                shadow="xs"
                p="md"
                style={{
                  backgroundColor: msg.role === "user" ? "#228be6" : "#f1f3f5",
                  color: msg.role === "user" ? "white" : "inherit",
                  maxWidth: "80%",
                  borderRadius: msg.role === "user" 
                    ? "16px 16px 0 16px" 
                    : "16px 16px 16px 0",
                }}
              >
                <Text 
                  size="sm" 
                  style={{ 
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    lineHeight: 1.6,
                  }}
                >
                  {msg.content}
                </Text>
              </Paper>
            </Box>
          ))}
          {loading && (
            <Box style={{ display: "flex", justifyContent: "flex-start" }}>
              <Paper
                shadow="xs"
                p="md"
                style={{
                  backgroundColor: "#f1f3f5",
                  maxWidth: "80%",
                  borderRadius: "16px 16px 16px 0",
                }}
              >
                <Text size="sm" color="dimmed">
                  正在回覆...
                </Text>
              </Paper>
            </Box>
          )}
          <div ref={scrollRef} />
        </Stack>
      </ScrollArea>

      <Box style={{ display: "flex", gap: "12px" }}>
        <TextInput
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          placeholder="請輸入訊息..."
          style={{ flex: 1 }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          radius="md"
          disabled={loading}
        />
        <Button
          onClick={handleSend}
          radius="md"
          color="blue"
          disabled={loading || !input.trim()}
          style={{ width: "100px" }}
        >
          {loading ? "發送中..." : "發送"}
        </Button>
      </Box>
    </Box>
  );
}