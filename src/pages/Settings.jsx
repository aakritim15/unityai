import React from 'react';
import { FiMessageCircle, FiUser } from "react-icons/fi"; // Chatbot & Account Icons

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section (Copied from Dashboard) */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Settings</h1>
        <div className="flex items-center space-x-6">
          {/* Chatbot Icon */}
          <button className="text-gray-600 hover:text-blue-600 transition">
            <FiMessageCircle size={24} />
          </button>

          {/* Account Icon */}
          <button className="text-gray-600 hover:text-blue-600 transition">
            <FiUser size={24} />
          </button>
        </div>
      </header>

      {/* Settings Content */}
      <div className="p-6">
        <h2 className="text-lg font-medium">Settings</h2>
        <p className="text-gray-600 mt-2">Manage your account preferences here.</p>
      </div>
    </div>
  );
};

export default Settings;
