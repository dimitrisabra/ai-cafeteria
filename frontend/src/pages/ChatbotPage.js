import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import useChatAssistant from "../hooks/useChatAssistant";

function ChatbotPage() {
  const [message, setMessage] = useState("");
  const { messages, loading, error, sendMessage } = useChatAssistant();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text || loading) {
      return;
    }
    setMessage("");
    await sendMessage(text);
  };

  return (
    <div>
      <h2 className="page-title mb-3">AI Chatbot</h2>
      <p className="text-muted mb-3">
        Ask naturally, for example: <code>healthy meals under 10</code> or <code>spicy  meals</code>.
      </p>
      <Card className="shadow-sm mb-3">
        <Card.Body className="chat-page-body">
          {messages.map((item, index) => (
            <div key={`${item.role}-${index}`} className={item.role === "user" ? "chat-msg user" : "chat-msg assistant"}>
              {item.text}
            </div>
          ))}
          {loading && <div className="chat-msg assistant">Typing...</div>}
          <div ref={messagesEndRef} />
        </Card.Body>
      </Card>
      {error && <div className="text-danger small mb-2">{error}</div>}
      <Form onSubmit={onSubmit} className="d-flex gap-2">
        <Form.Control
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={300}
        />
        <Button type="submit" disabled={!message.trim() || loading}>Send</Button>
      </Form>
    </div>
  );
}

export default ChatbotPage;
