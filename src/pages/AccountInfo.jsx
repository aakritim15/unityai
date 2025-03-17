import React, { useState } from "react";
import { FiMessageCircle, FiUser } from "react-icons/fi"; // Chatbot & Account Icons

const AccountInfo = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    username: "",
    aadhar: "",
    age: "",
    salary: "",
    balance: 1000, // Initial balance
    bankAccount: "",
    employmentType: "",
    accountType: "",
    phone: "",
    dob: "",
  });

  const [transactionAmount, setTransactionAmount] = useState(0); // Amount for transaction
  const [transactionType, setTransactionType] = useState("add"); // 'add' or 'subtract'

  const [isEditing, setIsEditing] = useState(false); // Flag for toggling edit mode

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle transaction input change
  const handleTransactionChange = (e) => {
    const { name, value } = e.target;
    if (name === "transactionAmount") {
      setTransactionAmount(value);
    } else if (name === "transactionType") {
      setTransactionType(value);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true); // Display account info after form submission
    setIsEditing(false); // Disable edit mode after submission
  };

  // Handle balance update
  const handleTransaction = () => {
    const amount = parseFloat(transactionAmount);
    if (!amount || amount <= 0) return;

    setUserData((prevState) => {
      let newBalance = prevState.balance;

      if (transactionType === "add") {
        newBalance += amount;
      } else if (transactionType === "subtract") {
        newBalance -= amount;
      }

      return {
        ...prevState,
        balance: newBalance,
      };
    });

    setTransactionAmount(0); // Reset transaction input after applying the transaction
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center px-4 sm:px-6 md:px-8">
        <h1 className="text-xl font-semibold text-gray-800">Account Info</h1>
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

      {/* Form Section */}
      {!isFormSubmitted ? (
        <div className="p-6 sm:px-8 md:px-12">
          <h2 className="text-2xl font-bold">Fill Your Account Information</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-gray-600">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="aadhar" className="block text-gray-600">
                  Aadhar Card
                </label>
                <input
                  type="text"
                  id="aadhar"
                  name="aadhar"
                  value={userData.aadhar}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-gray-600">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={userData.age}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="salary" className="block text-gray-600">
                  Salary
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={userData.salary}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Bank Account and Balance */}
              <div>
                <label htmlFor="balance" className="block text-gray-600">
                  Balance
                </label>
                <input
                  type="number"
                  id="balance"
                  name="balance"
                  value={userData.balance}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled
                />
              </div>

              <div>
                <label htmlFor="bankAccount" className="block text-gray-600">
                  Bank Account Number
                </label>
                <input
                  type="text"
                  id="bankAccount"
                  name="bankAccount"
                  value={userData.bankAccount}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Employment Type Dropdown */}
              <div>
                <label htmlFor="employmentType" className="block text-gray-600">
                  Employment Type
                </label>
                <select
                  id="employmentType"
                  name="employmentType"
                  value={userData.employmentType}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Employment Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Freelancer">Freelancer</option>
                </select>
              </div>

              {/* Account Type Dropdown */}
              <div>
                <label htmlFor="accountType" className="block text-gray-600">
                  Account Type
                </label>
                <select
                  id="accountType"
                  name="accountType"
                  value={userData.accountType}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Account Type</option>
                  <option value="Saving">Saving</option>
                  <option value="Current">Current</option>
                </select>
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-600">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="dob" className="block text-gray-600">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={userData.dob}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        // Account Info Section (Displayed after form submission)
        <div className="p-6 sm:px-8 md:px-12">
          <h2 className="text-2xl font-bold">Account Information</h2>
          <div className="mt-4 space-y-2">
            <div><strong>Name:</strong> {userData.name}</div>
            <div><strong>Email:</strong> {userData.email}</div>
            <div><strong>Username:</strong> {userData.username}</div>
            <div><strong>Aadhar:</strong> {userData.aadhar}</div>
            <div><strong>Age:</strong> {userData.age}</div>
            <div><strong>Salary:</strong> {userData.salary}</div>
            <div><strong>Balance:</strong> {userData.balance}</div>
            <div><strong>Bank Account:</strong> {userData.bankAccount}</div>
            <div><strong>Employment Type:</strong> {userData.employmentType}</div>
            <div><strong>Account Type:</strong> {userData.accountType}</div>
            <div><strong>Phone:</strong> {userData.phone}</div>
            <div><strong>Date of Birth:</strong> {userData.dob}</div>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Edit
          </button>

          {/* Transaction Section */}
          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-medium">Transaction</h3>
            <div>
              <label className="block text-gray-600">Transaction Type</label>
              <select
                name="transactionType"
                value={transactionType}
                onChange={handleTransactionChange}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="add">Add Funds</option>
                <option value="subtract">Withdraw Funds</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600">Amount</label>
              <input
                type="number"
                name="transactionAmount"
                value={transactionAmount}
                onChange={handleTransactionChange}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <button
              onClick={handleTransaction}
              className="mt-4 w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition"
            >
              Process Transaction
            </button>
          </div>
        </div>
      )}

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
