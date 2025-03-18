import React, { useState } from "react";
import { FiMessageCircle, FiUser } from "react-icons/fi";
import LoanApplicationForm from "../components/LoanApplicationForm";
import LoanCard from "../components/LoanCard";

const loanOffers = [
  { loanType: "Home", amount: 200000, interestRate: 10, tenure: 1 },
  { loanType: "Car", amount: 500000, interestRate: 15, tenure: 2 },
  { loanType: "Personal", amount: 750000, interestRate: 12, tenure: 3 },
  { loanType: "Education", amount: 100000, interestRate: 10.5, tenure: 4 },
  { loanType: "Business", amount: 150000, interestRate: 9, tenure: 5 },
];

/* const LoanCard = ({ amount, interestRate, tenure, onApply }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 w-64 text-center transition-transform transform hover:scale-105">
      <h3 className="text-lg font-semibold text-gray-700">Loan Offer</h3>
      <p className="text-2xl font-bold text-blue-600 mt-2">₹{amount.toLocaleString()}</p>
      <p className="text-gray-600 text-sm mt-1">Interest Rate: {interestRate}%</p>
      <p className="text-gray-600 text-sm">Tenure: {tenure} years</p>
      <button
        className="bg-black text-white px-4 py-2 rounded-lg mt-3 hover:bg-gray-800"
        onClick={() => onApply(amount)}
      >
        Apply Now
      </button>
    </div>
  );
}; */

const LoanOffers = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedLoanAmount, setSelectedLoanAmount] = useState(0);

  const handleApplyLoan = (amount) => {
    setSelectedLoanAmount(amount);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleSubmitApplication = (formData) => {
    console.log("Application submitted:", formData);
    alert(`Loan of ₹${formData.loanAmount} applied successfully!`);
    setShowForm(false);
  };

  const handleCancelApplication = () => {
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Payments</h1>
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
          <LoanApplicationForm
            loanAmount={selectedLoanAmount}
            onSubmit={handleSubmitApplication}
            onCancel={handleCancelApplication}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loanOffers.map((offer, index) => (
              <LoanCard key={index} {...offer} onApply={handleApplyLoan} />
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

export default LoanOffers;
