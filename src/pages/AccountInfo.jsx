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
    employmentType: "",
    accountType: "",
    phone: "",
    dob: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true); // Display account info after form submission
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
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
        <div className="p-6">
          <h2 className="text-2xl font-bold">Fill Your Account Information</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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

            <div>
              <label htmlFor="employmentType" className="block text-gray-600">
                Employment Type
              </label>
              <input
                type="text"
                id="employmentType"
                name="employmentType"
                value={userData.employmentType}
                onChange={handleInputChange}
                required
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="accountType" className="block text-gray-600">
                Account Type
              </label>
              <input
                type="text"
                id="accountType"
                name="accountType"
                value={userData.accountType}
                onChange={handleInputChange}
                required
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              />
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
          </form>
        </div>
      ) : (
        // Account Info Section (Displayed after form submission)
        <div className="p-6">
          <h2 className="text-2xl font-bold">Account Information</h2>
          <div className="mt-4 space-y-2">
            <div>
              <span className="font-semibold text-gray-600">Name: </span>
              {userData.name}
            </div>
            <div>
              <span className="font-semibold text-gray-600">Email: </span>
              {userData.email}
            </div>
            <div>
              <span className="font-semibold text-gray-600">Username: </span>
              {userData.username}
            </div>
            <div>
              <span className="font-semibold text-gray-600">Aadhar: </span>
              {userData.aadhar}
            </div>
            <div>
              <span className="font-semibold text-gray-600">Age: </span>
              {userData.age}
            </div>
            <div>
              <span className="font-semibold text-gray-600">Salary: </span>
              {userData.salary}
            </div>
            <div>
              <span className="font-semibold text-gray-600">Employment Type: </span>
              {userData.employmentType}
            </div>
            <div>
              <span className="font-semibold text-gray-600">Account Type: </span>
              {userData.accountType}
            </div>
            <div>
              <span className="font-semibold text-gray-600">Phone: </span>
              {userData.phone}
            </div>
            <div>
              <span className="font-semibold text-gray-600">Date of Birth: </span>
              {userData.dob}
            </div>
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
