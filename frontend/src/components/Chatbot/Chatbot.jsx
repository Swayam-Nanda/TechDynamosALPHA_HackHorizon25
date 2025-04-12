import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./Chatbot.css"; // Import your CSS file for styling

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👮 Welcome to Police AI Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    processMessage(text);
    setInput("");
  };

  const processMessage = (msg) => {
    let reply = "";
    const lower = msg.toLowerCase();

    if (lower.includes("report")) {
      reply = "📝 Please provide crime details. Our system will guide you.";
      setTimeout(() => {
        // Navigate to the crime reporting page
        navigate("/file-fir");
      }, 500);
    } else if (lower.includes("fir")) {
      reply = "📄 Please provide your FIR number for status check.";
      setTimeout(() => {
        // Navigate to the FIR status page
        navigate("/track-fir");
      }, 500);
    } else if (lower.includes("emergency")) {
      reply =
        "🚨 Connecting to emergency services. Please share your location.";
      setTimeout(() => {
        // Navigate to the emergency services page
        navigate("/emergency");
      }, 500);
    } else {
      reply = `🤖 I'm Police Assistant AI. I can help with:\n- Crime reporting\n- FIR status\n- Emergency service`;
    }

    // Send the bot's response after a delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 500);
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-card ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header" onClick={() => setIsOpen(!isOpen)}>
          🤖 Police AI Assistant
          <span className="live-indicator">● Live</span>
        </div>

        {isOpen && (
          <>
            <div className="chatbot-body">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chatbot-message ${msg.sender}-message`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="chatbot-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              />
              <button onClick={() => sendMessage(input)}>📤</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
