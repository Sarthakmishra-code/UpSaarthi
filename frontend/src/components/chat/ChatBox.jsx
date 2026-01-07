import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SUGGESTIONS = [
  "Build a website",
  "Startup legal advice",
  "DSA interview prep",
  "AI/ML project guidance",
  "HR & hiring help",
];

export default function ChatBot() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I’m Saarthi. Tell me what you need help with.",
    },
  ]);

  const [input, setInput] = useState("");

  if (!isOpen) return null;

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const botReply = getBotReply(input);

    setMessages((prev) => [...prev, userMsg, botReply]);
    setInput("");
  };

  const handleSuggestionClick = (text) => {
    setInput(text);
  };

  const getBotReply = (text) => {
    const lower = text.toLowerCase();

    if (lower.includes("website") || lower.includes("app")) {
      return {
        sender: "bot",
        text: "Looks like a development request. Want to ask experts or post a question?",
        action: "experts",
      };
    }

    if (lower.includes("interview") || lower.includes("dsa")) {
      return {
        sender: "bot",
        text: "We have experienced mentors for interview prep. Shall I take you there?",
        action: "experts",
      };
    }

    if (lower.includes("startup") || lower.includes("business")) {
      return {
        sender: "bot",
        text: "Business & startup mentors are available. You can ask a detailed question.",
        action: "ask",
      };
    }

    return {
      sender: "bot",
      text: "You can ask this as a question or explore experts. What would you like?",
      action: "ask",
    };
  };

  const handleAction = (action) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (action === "ask") navigate("/ask");
    if (action === "experts") navigate("/experts");
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white border rounded shadow-lg">
      
      {/* Header */}
      <div className="bg-indigo-600 text-white px-4 py-2 rounded-t flex justify-between items-center">
        <span className="font-medium">Saarthi Assistant</span>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white text-lg leading-none hover:text-gray-200"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="p-3 h-64 overflow-y-auto space-y-2 text-sm">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded max-w-[90%] ${
              msg.sender === "user"
                ? "ml-auto bg-indigo-100"
                : "bg-gray-100"
            }`}
          >
            <p>{msg.text}</p>

            {msg.action && (
              <button
                onClick={() => handleAction(msg.action)}
                className="mt-1 text-indigo-600 text-xs underline"
              >
                Go →
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-1 px-2 py-1 border-t">
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            onClick={() => handleSuggestionClick(s)}
            className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here..."
          className="flex-1 p-2 text-sm outline-none"
        />
        <button
          onClick={handleSend}
          className="px-3 text-indigo-600 font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
}
