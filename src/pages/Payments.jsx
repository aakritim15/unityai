import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiMessageCircle, FiUser } from "react-icons/fi";

const Payments = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [upiData, setUpiData] = useState({ upiId: "", amount: "", note: "" });
  const [bankData, setBankData] = useState({
    beneficiary: "",
    accountNumber: "",
    ifsc: "",
    amount: "",
    note: "",
  });
  const [userUid, setUserUid] = useState(null);
  const [errors, setErrors] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false); // Added missing state

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserUid(user ? user.uid : null);
    });

    return () => unsubscribe();
  }, [auth]);

  const validateAmount = (amount) => parseFloat(amount) > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userUid) {
      alert("You must be logged in to make a payment.");
      return;
    }

    const validationErrors = {};
    if (selectedMethod === "upi" && !validateAmount(upiData.amount)) {
      validationErrors.amount = "Amount must be a positive number";
    } else if (selectedMethod === "bank" && !validateAmount(bankData.amount)) {
      validationErrors.amount = "Amount must be a positive number";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    try {
      await addDoc(collection(db, "payments"), {
        type: selectedMethod,
        ...(selectedMethod === "upi" ? upiData : bankData),
        userId: userUid,
        timestamp: new Date(),
      });
      alert("Payment recorded successfully");
      setUpiData({ upiId: "", amount: "", note: "" });
      setBankData({ beneficiary: "", accountNumber: "", ifsc: "", amount: "", note: "" });
      setSelectedMethod(null);
    } catch (error) {
      alert("Error recording payment");
    }
  };

  const handleChange = (e, setData) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
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

      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-lg space-y-8">
          {!selectedMethod ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card
                className="cursor-pointer hover:shadow-md transition p-6 flex flex-col items-center justify-center"
                onClick={() => setSelectedMethod("upi")}
              >
                <CardTitle className="text-lg">UPI Payment</CardTitle>
                <CardContent className="text-center text-gray-600">Transfer money using UPI ID</CardContent>
              </Card>
              <Card
                className="cursor-pointer hover:shadow-md transition p-6 flex flex-col items-center justify-center"
                onClick={() => setSelectedMethod("bank")}
              >
                <CardTitle className="text-lg">Bank Transfer</CardTitle>
                <CardContent className="text-center text-gray-600">Transfer directly to a bank account</CardContent>
              </Card>
            </div>
          ) : (
            <Card className="w-full shadow-lg p-6">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-semibold">
                  {selectedMethod === "upi" ? "UPI Payment" : "Bank Transfer"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {selectedMethod === "upi" ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input
                          id="upiId"
                          placeholder="xyz@bankname"
                          value={upiData.upiId}
                          onChange={(e) => handleChange(e, setUpiData)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount (₹)</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount"
                          value={upiData.amount}
                          onChange={(e) => handleChange(e, setUpiData)}
                        />
                        {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="note">Note</Label>
                        <Input id="note" placeholder="Optional note" value={upiData.note} onChange={(e) => handleChange(e, setUpiData)} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="beneficiary">Beneficiary Name</Label>
                        <Input
                          id="beneficiary"
                          placeholder="Enter beneficiary name"
                          value={bankData.beneficiary}
                          onChange={(e) => handleChange(e, setBankData)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                          id="accountNumber"
                          placeholder="Enter account number"
                          value={bankData.accountNumber}
                          onChange={(e) => handleChange(e, setBankData)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ifsc">IFSC Code</Label>
                        <Input
                          id="ifsc"
                          placeholder="Enter IFSC code"
                          value={bankData.ifsc}
                          onChange={(e) => handleChange(e, setBankData)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount (₹)</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount"
                          value={bankData.amount}
                          onChange={(e) => handleChange(e, setBankData)}
                        />
                        {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
                      </div>
                    </>
                  )}
                  <CardFooter className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setSelectedMethod(null)}>
                      Back
                    </Button>
                    <Button type="submit">Pay</Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;
