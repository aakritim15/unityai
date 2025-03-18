import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiMessageCircle, FiUser } from "react-icons/fi";

export default function AccountInfo() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("add");

  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    dob: "",
    age: "",
    aadhaar: "",
    salary: "",
    balance: 50000, // Default balance
    bankaccount: "",
    accounttype: "",
    employmentType: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    setIsEditing(false);
  };

  const handleTransaction = () => {
    const amount = parseFloat(transactionAmount);
    if (!amount || amount <= 0) return;

    setUserData((prevState) => {
      let newBalance = prevState.balance;
      if (transactionType === "add") newBalance += amount;
      else if (transactionType === "subtract" && newBalance >= amount) newBalance -= amount;

      return { ...prevState, balance: newBalance };
    });

    setTransactionAmount("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Updated Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Account Info</h1>
        <div className="flex items-center space-x-6">
          <button onClick={() => setIsChatOpen(!isChatOpen)} className="text-gray-600 hover:text-blue-600 transition">
            <FiMessageCircle size={24} />
          </button>
          <button className="text-gray-600 hover:text-blue-600 transition">
            <FiUser size={24} />
          </button>
        </div>
      </header>

      {/* Form Section */}
      {!isFormSubmitted || isEditing ? (
        <div className="flex items-center justify-center mt-6">
          <Card className="w-full max-w-4xl shadow-xl bg-white p-6">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Enter Your Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {[
                  { label: "Full Name", name: "name" },
                  { label: "Username", name: "username" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Phone Number", name: "phone", type: "tel" },
                  { label: "Date of Birth", name: "dob", type: "date" },
                  { label: "Age", name: "age", type: "number" },
                  { label: "Aadhaar Number", name: "aadhaar" },
                  { label: "Salary", name: "salary", type: "number" },
                  { label: "Bank Account", name: "bankaccount", type: "number" },
                  { label: "Account Type", name: "accounttype" },
                  { label: "Employment Type", name: "employmentType" },
                ].map(({ label, name, type = "text" }) => (
                  <div key={name} className="w-full">
                    <label className="block text-sm font-medium mb-1">{label}</label>
                    <Input
                      type={type}
                      name={name}
                      value={userData[name]}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                ))}

                {/* Submit Button */}
                <div className="col-span-2 mt-4">
                  <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 text-lg">
                    Submit
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : (
        // Display Box with Submitted Data
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-800">Account Information</h2>
          <div className="mt-4 space-y-2 border p-4 rounded-md bg-gray-50">
            {Object.entries(userData).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <strong className="capitalize">{key.replace(/([A-Z])/g, " $1")}:</strong> <span>{value}</span>
              </div>
            ))}
          </div>

          {/* Edit Button */}
          <Button onClick={() => setIsEditing(true)} className="mt-6 w-full bg-black hover:bg-gray-800">
            Edit
          </Button>

          {/* Transaction Section */}
          <div className="mt-6">
            <h3 className="text-xl font-medium">Manage Transactions</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-gray-600">Transaction Type</label>
                <select
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="add">Add Funds</option>
                  <option value="subtract">Withdraw Funds</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600">Amount</label>
                <Input
                  type="number"
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  className="mt-2 w-full"
                />
              </div>
            </div>

            {/* Transaction Button */}
            <Button onClick={handleTransaction} className="mt-4 w-full bg-black hover:bg-gray-800">
              Process Transaction
            </Button>
          </div>
        </div>
      )}

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
}
