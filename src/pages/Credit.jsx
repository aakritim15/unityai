import React, { useState } from 'react';
import { FiMessageCircle, FiUser } from "react-icons/fi"; // Chatbot & Account Icons

const CLoan = () => {
  const [showForm, setShowForm] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // Chatbot State

  // State to manage form inputs
  const [formData, setFormData] = useState({
    Transaction_Amount: '',
    Transaction_Type: '',
    Location: '',
    Time_of_Day: '',
    Card_Type: '',
    Previous_Fraud_History: '',
    Account_Age: '',
    Credit_Utilization: '',
    Fraudulent: '',
  });

  const [fraudResult, setFraudResult] = useState(null);

  const handleApplyLoan = () => {
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    console.log('Application submitted:', formData);

    // Simulating fraud detection logic
    const isFraud = checkForFraud(formData);
    setFraudResult(isFraud ? 'Fraud Detected!' : 'No Fraud Detected');
    setShowForm(false);
  };

  const handleCancelApplication = () => {
    setShowForm(false);
  };

  const checkForFraud = (data) => {
    // Sample fraud detection logic based on card location
    // For simplicity, let's assume that Fraud is detected if the same card is at two locations at the same time.
    if (data.Location && data.Time_of_Day && data.Fraudulent) {
      return true; // Fraud is detected
    }
    return false; // No fraud
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Credits</h1>
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
      <div className="p-6">
        <button 
          onClick={handleApplyLoan}
          className="bg-blue-500 text-white py-2 px-4 rounded-full"
        >
          Apply for Loan
        </button>

        {/* Loan Application Form */}
        {showForm && (
          <form onSubmit={handleSubmitApplication} className="mt-6 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Loan Application Form</h2>

            <div className="mb-4">
              <label htmlFor="Transaction_Amount" className="block text-sm font-medium text-gray-700">Transaction Amount</label>
              <input 
                type="number" 
                id="Transaction_Amount" 
                name="Transaction_Amount"
                value={formData.Transaction_Amount} 
                onChange={handleInputChange} 
                className="mt-1 p-2 border rounded w-full" 
                required 
              />
            </div>

            <div className="mb-4">
              <label htmlFor="Transaction_Type" className="block text-sm font-medium text-gray-700">Transaction Type</label>
              <input 
                type="text" 
                id="Transaction_Type" 
                name="Transaction_Type" 
                value={formData.Transaction_Type}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded w-full" 
                required 
              />
            </div>

            <div className="mb-4">
              <label htmlFor="Location" className="block text-sm font-medium text-gray-700">Location</label>
              <input 
                type="text" 
                id="Location" 
                name="Location" 
                value={formData.Location} 
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded w-full" 
                required 
              />
            </div>

            <div className="mb-4">
              <label htmlFor="Time_of_Day" className="block text-sm font-medium text-gray-700">Time of Day</label>
              <input 
                type="text" 
                id="Time_of_Day" 
                name="Time_of_Day" 
                value={formData.Time_of_Day}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded w-full" 
                required 
              />
            </div>

            <div className="mb-4">
              <label htmlFor="Card_Type" className="block text-sm font-medium text-gray-700">Card Type</label>
              <input 
                type="text" 
                id="Card_Type" 
                name="Card_Type" 
                value={formData.Card_Type}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded w-full" 
                required 
              />
            </div>

            <div className="mb-4">
              <label htmlFor="Previous_Fraud_History" className="block text-sm font-medium text-gray-700">Previous Fraud History</label>
              <input 
                type="text" 
                id="Previous_Fraud_History" 
                name="Previous_Fraud_History" 
                value={formData.Previous_Fraud_History}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded w-full" 
                required 
              />
            </div>

            <div className="mb-4">
              <label htmlFor="Account_Age" className="block text-sm font-medium text-gray-700">Account Age</label>
              <input 
                type="number" 
                id="Account_Age" 
                name="Account_Age" 
                value={formData.Account_Age}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded w-full" 
                required 
              />
            </div>

            <div className="mb-4">
              <label htmlFor="Credit_Utilization" className="block text-sm font-medium text-gray-700">Credit Utilization</label>
              <input 
                type="number" 
                id="Credit_Utilization" 
                name="Credit_Utilization" 
                value={formData.Credit_Utilization}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded w-full" 
                required 
              />
            </div>

            <div className="mb-4">
              <label htmlFor="Fraudulent" className="block text-sm font-medium text-gray-700">Fraudulent</label>
              <input 
                type="text" 
                id="Fraudulent" 
                name="Fraudulent" 
                value={formData.Fraudulent}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded w-full" 
                required 
              />
            </div>

            <div className="flex space-x-4">
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
              <button type="button" onClick={handleCancelApplication} className="bg-red-500 text-white py-2 px-4 rounded">Cancel</button>
            </div>
          </form>
        )}

        {fraudResult && (
          <div className="mt-6 text-center text-xl font-semibold text-red-600">
            {fraudResult}
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

export default CLoan;
