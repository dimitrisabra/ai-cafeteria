import React, { useEffect, useRef, useState } from "react";
import chatIcon from "../chat.svg";
import useChatAssistant from "../hooks/useChatAssistant";

function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, loading, sendMessage } = useChatAssistant();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, loading]);

  const onSend = async () => {
    const text = input.trim();
    if (!text || loading) {
      return;
    }
    setInput("");
    await sendMessage(text);
  };

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-popup shadow-lg">
          <div className="chat-popup-header">
            <span>AI Chat Assistant</span>
          </div>
          <div className="chat-popup-body">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={message.role === "user" ? "chat-msg user" : "chat-msg assistant"}>
                {message.text}
              </div>
            ))}
            {loading && <div className="chat-msg assistant">Typing...</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-popup-footer">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSend();
                }
              }}
              maxLength={300}
            />
            <button type="button" className="btn btn-primary" onClick={onSend} disabled={!input.trim() || loading}>Send</button>
          </div>
        </div>
      )}
      <button type="button" className="chat-float-btn btn btn-primary shadow" onClick={() => setIsOpen((prev) => !prev)}>
        <img src={chatIcon} alt="Chat" className="chat-float-icon" />
      </button>
    </div>
  );
}

export default FloatingChatButton;
