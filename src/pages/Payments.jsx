import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiMessageCircle, FiUser } from "react-icons/fi"; // Chatbot & Account Icons

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
  const [isChatOpen, setIsChatOpen] = useState(false); // Chatbot State
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUserUid(user.uid);
      else setUserUid(null);
    });
    return () => unsubscribe();
  }, [auth]);

  const validateUpiId = (upiId) => /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/.test(upiId);
  const validateAccountNumber = (accountNumber) => /^\d{9,18}$/.test(accountNumber);
  const validateIfsc = (ifsc) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
  const validateAmount = (amount) => parseFloat(amount) > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userUid) {
      alert("You must be logged in to make a payment.");
      return;
    }

    const validationErrors = {};
    if (selectedMethod === "upi") {
      if (!validateUpiId(upiData.upiId)) validationErrors.upiId = "Invalid UPI ID.";
      if (!validateAmount(upiData.amount)) validationErrors.amount = "Amount must be positive.";
    } else if (selectedMethod === "bank") {
      if (!validateAccountNumber(bankData.accountNumber))
        validationErrors.accountNumber = "Account number must be 9 to 18 digits.";
      if (!validateIfsc(bankData.ifsc)) validationErrors.ifsc = "Invalid IFSC code.";
      if (!validateAmount(bankData.amount)) validationErrors.amount = "Amount must be positive.";
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
      console.error(error);
      alert("Error recording payment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Payments</h1>
        <div className="flex items-center space-x-6">
          {/* Chatbot Icon */}
          <button onClick={() => setIsChatOpen(!isChatOpen)} className="text-gray-600 hover:text-blue-600 transition">
            <FiMessageCircle size={24} />
          </button>
          {/* Account Icon */}
          <button className="text-gray-600 hover:text-blue-600 transition">
            <FiUser size={24} />
          </button>
        </div>
      </header>

      {/* Payment Options */}
      <div className="flex flex-col items-center w-full max-w-md space-y-6 mt-6 mx-auto">
        {selectedMethod === null ? (
          <div className="grid grid-cols-2 gap-6">
            <Card onClick={() => setSelectedMethod("upi")} className="cursor-pointer hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>UPI Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Transfer money using your UPI ID</p>
              </CardContent>
            </Card>
            <Card onClick={() => setSelectedMethod("bank")} className="cursor-pointer hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>Bank Transfer</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Transfer money directly to a bank account</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {selectedMethod === "upi" && (
              <Card className="w-[350px]">
                <CardHeader className="flex justify-center">
                  <CardTitle>UPI Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input id="upiId" placeholder="yourname@upi" value={upiData.upiId} onChange={(e) => setUpiData({ ...upiData, upiId: e.target.value })} />
                      {errors.upiId && <p className="text-red-500 text-sm">{errors.upiId}</p>}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="amount">Amount (₹)</Label>
                      <Input id="amount" type="number" placeholder="Enter amount" value={upiData.amount} onChange={(e) => setUpiData({ ...upiData, amount: e.target.value })} />
                      {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setSelectedMethod(null)}>Back</Button>
                  <Button type="submit">Pay</Button>
                </CardFooter>
              </Card>
            )}
          </form>
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

export default Payments;
