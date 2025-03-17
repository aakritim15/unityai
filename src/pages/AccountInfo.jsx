import React from "react";
import { FiMessageCircle, FiUser } from "react-icons/fi"; // Chatbot & Account Icons
import { useState } from "react";

const AccountInfo = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-6">
          {/* Chatbot Icon */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="text-gray-600 hover:text-blue-600 transition"
          >
            <FiMessageCircle size={24} />
          </button>

          {/* Account Icon */}
          <button className="text-gray-600 hover:text-blue-600 transition">
            <FiUser size={24} />
          </button>
        </div>
      </header>

      {/* Account Info Section */}
      <div className="p-6">
        <h2 className="text-2xl font-bold">Account Information</h2>
        <p className="text-gray-600 mt-2">Details about your account will be displayed here.</p>
      </div>

      {/* Chatbot Modal */}
      {isChatOpen && (
        <div className="fixed bottom-5 right-5 bg-white shadow-lg border rounded-lg p-4 w-80">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Chatbot</h3>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-gray-500 hover:text-red-500"
            >
              ✖
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">How can I assist you today?</p>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
