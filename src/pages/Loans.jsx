// src/components/Loan.jsx (continued)
import React, { useState } from 'react';
import LoanCard from '../components/LoanCard';
import LoanApplicationForm from '../components/LoanApplicationForm';

const Loan = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedLoanAmount, setSelectedLoanAmount] = useState(0);

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
    // Here you would typically send the data to your backend
    console.log('Application submitted:', formData);
    alert(`Loan of ₹${formData.loanAmount} applied successfully!`);
    setShowForm(false);
  };

  const handleCancelApplication = () => {
    setShowForm(false);
  };

  return (
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
  );
};

export default Loan;
