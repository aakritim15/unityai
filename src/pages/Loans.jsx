import React, { useState } from 'react';
import { FiMessageCircle, FiUser } from "react-icons/fi"; // Chatbot & Account Icons
import LoanCard from '../components/LoanCard';
import LoanApplicationForm from '../components/LoanApplicationForm';

const Loan = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedLoanAmount, setSelectedLoanAmount] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false); // Chatbot State

  const loanOptions = [
    { amount: 20000, interestRate: 10, tenure: 1 },
    { amount: 50000, interestRate: 15, tenure: 2 },
  ];

  const handleApplyLoan = (amount) => {
    setSelectedLoanAmount(amount);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleSubmitApplication = (formData) => {
    console.log('Application submitted:', formData);
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
        <h1 className="text-xl font-semibold text-gray-800">Loan</h1>
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
      <div className="container mx-auto px-4 py-8">
        {showForm ? (
          <LoanApplicationForm 
            loanAmount={selectedLoanAmount} 
            onSubmit={handleSubmitApplication}
            onCancel={handleCancelApplication}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loanOptions.map((loan, index) => (
              <LoanCard 
                key={index}
                amount={loan.amount}
                interestRate={loan.interestRate}
                tenure={loan.tenure}
                onApply={handleApplyLoan}
              />
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

export default Loan;
