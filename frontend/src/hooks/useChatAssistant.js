import { useEffect, useState } from "react";
import axios from "axios";

const DEFAULT_WELCOME = {
  role: "assistant",
  text: "Hi! How can I help you today?"
};

function getChatUrl() {
  const baseUrl = process.env.REACT_APP_API_BASE_URL?.trim();
  return baseUrl ? `${baseUrl.replace(/\/+$/, "")}/chat` : "/chat";
}

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isGreetingMessage(text) {
  return [
    "hi",
    "hello",
    "hey",
    "hey there",
    "greetings",
    "good morning",
    "good afternoon",
    "good evening",
    "greet",
    "greet me"
  ].includes(normalizeText(text));
}

function isDailyOnlyRequest(text) {
  const normalized = normalizeText(text);
  if (!normalized) {
    return false;
  }

  const wantsDaily = /\b(daily|today|special)\b/.test(normalized);
  const wantsOtherCategory = /\b(menu|main|meals|beverage|drink|snack|dessert|food|lunch|dinner)\b/.test(normalized)
    && !/\bdaily meal\b/.test(normalized);
  return wantsDaily && !wantsOtherCategory;
}

function formatAssistantMessage(payload, userText) {
  if (isGreetingMessage(userText)) {
    return "Hi! How can I help you today?";
  }

  let replyText = payload?.reply || payload?.response || "I can help with menu questions and meal suggestions.";
  let items = Array.isArray(payload?.items) ? payload.items : [];

  if (isDailyOnlyRequest(userText) && items.length) {
    const dailyItems = items.filter((item) => item?.category === "daily_meal");
    items = dailyItems.length ? dailyItems.slice(0, 1) : items.slice(0, 1);
    replyText = "Found 1 item(s) from daily meal.";
  }

  if (!items.length) {
    return replyText;
  }

  const lines = items.map((item) => {
    const safePrice = Number(item?.price);
    const priceText = Number.isFinite(safePrice) ? ` ($${safePrice.toFixed(2)})` : "";
    return `- ${item?.name || "Item"}${priceText}`;
  });

  return `${replyText}\n${lines.join("\n")}`;
}

export default function useChatAssistant() {
  const [messages, setMessages] = useState(() => [DEFAULT_WELCOME]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateMessages = (nextMessages) => {
    setMessages(nextMessages);
    window.dispatchEvent(new CustomEvent("chat-messages-updated", { detail: { messages: nextMessages } }));
  };

  useEffect(() => {
    const syncMessages = (event) => {
      if (event?.detail?.messages) {
        setMessages(event.detail.messages);
      }
    };
    window.addEventListener("chat-messages-updated", syncMessages);
    return () => window.removeEventListener("chat-messages-updated", syncMessages);
  }, []);

  const sendMessage = async (rawText) => {
    const text = String(rawText || "").trim();
    if (!text || loading) {
      return;
    }

    setError("");
    const userMessage = { role: "user", text };
    const nextMessages = [...messages, userMessage];
    updateMessages(nextMessages);
    setLoading(true);

    try {
      const response = await axios.post(
        getChatUrl(),
        { message: text, clientDay: new Date().getDate() },
        { timeout: 15000 }
      );
      const assistantMessage = { role: "assistant", text: formatAssistantMessage(response.data, text) };
      updateMessages([...nextMessages, assistantMessage]);
    } catch (err) {
      const status = err?.response?.status;
      const serverReply = err?.response?.data?.reply;
      const fallback =
        status === 400
          ? serverReply || "Please try a shorter or clearer request."
          : "I could not reach the server. Please try again.";
      setError(fallback);
      updateMessages([...nextMessages, { role: "assistant", text: fallback }]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    error,
    sendMessage
  };
}
