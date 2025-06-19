export async function fetchChatAnswer(message: string): Promise<{ answer: string }> {
  try {
    const response = await fetch("http://localhost:8000/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error("伺服器回應錯誤");
    }

    const data = await response.json();
    return { answer: data.response };
  } catch (error) {
    console.error("❌ 發送訊息失敗:", error);
    return { answer: "⚠️ 發送訊息失敗，請稍後再試。" };
  }
}
