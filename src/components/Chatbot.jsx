import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSend } from "react-icons/fi";

// Allowed banking-related keywords
const ALLOWED_KEYWORDS = [
  "loan", "credit card", "debit card", "transaction", "balance", "interest rate", 
  "bank", "account", "deposit", "withdrawal", "cibil", "fraud", "investment", 
  "savings", "emi", "finance", "billing", "payment"
];

function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you with banking today?" }
  ]);
  const [userInput, setUserInput] = useState("");

  // Get API Key from Environment Variables
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // Function to check if a question is banking-related
  const isBankingRelated = (question) => {
    return ALLOWED_KEYWORDS.some(keyword => question.toLowerCase().includes(keyword));
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages([...messages, userMessage]);

    // Check if the query is related to banking
    if (!isBankingRelated(userInput)) {
      setMessages(prev => [...prev, { sender: "bot", text: "I can only assist with banking-related queries. Please ask me about loans, credit cards, transactions, or related topics." }]);
      setUserInput("");
      return;
    }

    // Prepare request
    const formattedMessages = messages.map(msg => ({
      role: msg.sender === "user" ? "user" : "assistant",
      parts: [{ text: msg.text }]
    }));

    formattedMessages.push({ role: "user", parts: [{ text: userInput }] });

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: formattedMessages }),
        }
      );

      const data = await response.json();
      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't find an answer to your question.";

      setMessages(prev => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: "bot", text: "There was an error fetching the response. Please try again later." }]);
    }

    setUserInput("");
  };

  return (
    <div className="flex flex-col w-full h-64 p-3 border rounded-lg bg-gray-50">
      <div className="flex-1 overflow-y-auto mb-2 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded-md ${msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-gray-900 self-start"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <Input 
          value={userInput} 
          onChange={(e) => setUserInput(e.target.value)} 
          placeholder="Ask a banking question..."
        />
        <Button onClick={sendMessage}>
          <FiSend />
        </Button>
      </div>
    </div>
  );
}

export default Chatbot;
