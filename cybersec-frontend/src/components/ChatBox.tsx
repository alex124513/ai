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
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const data = await fetchChatAnswer(input);
      const aiMessage: Message = { role: "ai", content: data.answer };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "⚠️ 系統錯誤，請稍後再試" },
      ]);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      style={{
        backgroundColor: "#f4f6f8",
        borderRadius: "20px",
        padding: "32px",
        maxWidth: "800px",
        width: "100%",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <ScrollArea
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "16px",
          height: "500px",
          overflowY: "auto",
          border: "1px solid #e0e0e0",
        }}
      >
        <Stack gap={12}>
          {messages.map((msg, i) => (
            <Paper
              key={i}
              shadow="xs"
              p="md"
              radius="md"
              withBorder
              style={{
                backgroundColor: msg.role === "user" ? "#dbeafe" : "#f1f3f4",
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "70%",
              }}
            >
              <Text size="sm">

                {msg.content}
              </Text>
            </Paper>
          ))}
          <div ref={scrollRef} />
        </Stack>
      </ScrollArea>

      <Box style={{ display: "flex", gap: "10px" }}>
        <TextInput
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          placeholder="請輸入訊息"
          style={{ flex: 1 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          size="md"
        />
        <Button onClick={handleSend} size="md" color="blue">
          發送
        </Button>
      </Box>
    </Box>
  );
}
