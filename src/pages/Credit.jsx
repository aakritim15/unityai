import React, { useState } from "react";
import { FiMessageCircle, FiUser } from "react-icons/fi";
import CreditCardApplicationForm from "../components/CreditCardApplicationForm";

const creditCardOffers = [
  { name: "Platinum Card", limit: 500000, interestRate: 14, annualFee: 3000 },
  { name: "Gold Card", limit: 300000, interestRate: 12, annualFee: 2000 },
  { name: "Silver Card", limit: 150000, interestRate: 10, annualFee: 1000 },
  { name: "Titanium Card", limit: 700000, interestRate: 16, annualFee: 4000 },
  { name: "Business Card", limit: 1000000, interestRate: 18, annualFee: 5000 },
];

const CreditCardCard = ({ name, limit, interestRate, annualFee, onApply }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 w-64 text-center transition-transform transform hover:scale-105">
      <h3 className="text-lg font-semibold text-gray-700">{name}</h3>
      <p className="text-2xl font-bold text-blue-600 mt-2">Limit: ₹{limit.toLocaleString()}</p>
      <p className="text-gray-600 text-sm mt-1">Interest Rate: {interestRate}%</p>
      <p className="text-gray-600 text-sm">Annual Fee: ₹{annualFee}</p>
      <button
        className="bg-black text-white px-4 py-2 rounded-lg mt-3 hover:bg-gray-800"
        onClick={() => onApply(name)}
      >
        Apply Now
      </button>
    </div>
  );
};

const CreditCardOffers = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");

  const handleApplyCard = (cardName) => {
    setSelectedCard(cardName);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleSubmitApplication = (formData) => {
    console.log("Application submitted:", formData);
    alert(`Credit card ${formData.cardName} applied successfully!`);
    setShowForm(false);
  };

  const handleCancelApplication = () => {
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Credit Cards</h1>
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
            cardName={selectedCard}
            onSubmit={handleSubmitApplication}
            onCancel={handleCancelApplication}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {creditCardOffers.map((offer, index) => (
              <CreditCardCard key={index} {...offer} onApply={handleApplyCard} />
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



