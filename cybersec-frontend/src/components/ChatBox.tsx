import { useState, useEffect, useRef } from "react";
import { fetchChatAnswer } from "../api/chat";
import { Box, TextInput, Button, ScrollArea, Text, Paper, Stack } from "@mantine/core";
import "./ChatBox.scss";


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
        { role: "ai", content: "⚠️ 未收到return" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box className="ChatBoxContainer">
      <Box className="HeaderSection">
        <div className="TitleLabel">
          <Text fw={600} size="lg">LLM Sales</Text>
        </div>
      </Box>

      <ScrollArea className="ChatHistorySection">
        <Stack className="MessageStack">
          {messages.map((msg, i) => (
            <Box
              key={i}
              className={`MessageRow ${msg.role === "user" ? "right" : "left"}`}
            >
              <Paper className={`Bubble ${msg.role}`}>
                <Text size="sm">{msg.content}</Text>
              </Paper>
            </Box>
          ))}
          {loading && (
            <Box className="MessageRow left">
              <Paper className="Bubble ai">
                <Text size="sm" color="dimmed">正在回覆...</Text>
              </Paper>
            </Box>
          )}
          <div ref={scrollRef} />
        </Stack>
      </ScrollArea>

      <Box className="InputSection">
        <TextInput
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          placeholder="請輸入訊息..."
          className="InputField"
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
          className="SendButton"
          disabled={loading || !input.trim()}
        >
          {loading ? "發送中..." : "發送"}
        </Button>
      </Box>
    </Box>
  );
}
