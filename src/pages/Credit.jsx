import React, { useState } from "react";
import { FiMessageCircle, FiUser } from "react-icons/fi";
import CreditCardApplicationForm from "../components/CreditCardApplicationForm";

const transactions = [
  { amount: 10000, transactionType: "Online", time: "2025-03-15T10:30", location: "Mumbai", fraudHistory: false, accountType: "Savings", accountAge: 5, creditUtilisation: 45 },
  { amount: 25000, transactionType: "POS", time: "2025-03-14T15:00", location: "Delhi", fraudHistory: true, accountType: "Current", accountAge: 3, creditUtilisation: 70 },
  { amount: 5000, transactionType: "ATM", time: "2025-03-13T09:20", location: "Bangalore", fraudHistory: false, accountType: "Savings", accountAge: 7, creditUtilisation: 30 },
];

const CreditCardTransactionCard = ({ amount, transactionType, time, location, onApply }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 w-64 text-center transition-transform transform hover:scale-105">
      <h3 className="text-lg font-semibold text-gray-700">Transaction</h3>
      <p className="text-2xl font-bold text-blue-600 mt-2">₹{amount.toLocaleString()}</p>
      <p className="text-gray-600 text-sm">Type: {transactionType}</p>
      <p className="text-gray-600 text-sm">Time: {new Date(time).toLocaleString()}</p>
      <p className="text-gray-600 text-sm">Location: {location}</p>
      <button
        className="bg-black text-white px-4 py-2 rounded-lg mt-3 hover:bg-gray-800"
        onClick={() => onApply(amount)}
      >
        Apply Now
      </button>
    </div>
  );
};

const CreditCardOffers = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleApplyTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleSubmitApplication = (formData) => {
    console.log("Application submitted:", formData);
    alert(`Transaction of ₹${formData.amount} analyzed successfully!`);
    setShowForm(false);
  };

  const handleCancelApplication = () => {
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Credit Card Transactions</h1>
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

      {/* Main Content */}
      <div className="mt-8 p-4">
        {showForm ? (
          <CreditCardApplicationForm
            transaction={selectedTransaction}
            onSubmit={handleSubmitApplication}
            onCancel={handleCancelApplication}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {transactions.map((transaction, index) => (
              <CreditCardTransactionCard key={index} {...transaction} onApply={() => handleApplyTransaction(transaction)} />
            ))}
          </div>
        )}
      </div>

      {/* Chatbot Modal */}
      {isChatOpen && (
        <div className="fixed bottom-5 right-5 bg-white shadow-lg border rounded-lg p-4 w-80">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Chatbot</h3>
            <button onClick={() => setIsChatOpen(false)} className="text-gray-500 hover:text-red-500">
              ✖
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">How can I assist you today?</p>
        </div>
      )}
    </div>
  );
};

export default CreditCardOffers;
