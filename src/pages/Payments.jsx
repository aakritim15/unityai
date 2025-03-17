import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
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
import { cn } from "@/lib/utils";
import { getAuth } from "firebase/auth"; // Import Firebase Auth

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
  const [userUid, setUserUid] = useState(null); // State to store user UID
  const [errors, setErrors] = useState({}); // State to store validation errors
  const db = getFirestore();
  const auth = getAuth(); // Initialize Firebase Auth

  // Get the authenticated user's UID
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid); // Set the user's UID
      } else {
        setUserUid(null); // No user is signed in
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [auth]);

  // Validation functions
  const validateUpiId = (upiId) => {
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/;
    return upiRegex.test(upiId);
  };

  const validateAccountNumber = (accountNumber) => {
    const accountRegex = /^\d{9,18}$/; // Account number should be 9 to 18 digits
    return accountRegex.test(accountNumber);
  };

  const validateIfsc = (ifsc) => {
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/; // IFSC format: 4 letters, 0, 6 alphanumeric
    return ifscRegex.test(ifsc);
  };

  const validateAmount = (amount) => {
    return parseFloat(amount) > 0; // Amount must be positive
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userUid) {
      alert("You must be logged in to make a payment.");
      return;
    }

    // Validate form data
    const validationErrors = {};

    if (selectedMethod === "upi") {
      if (!validateUpiId(upiData.upiId)) {
        validationErrors.upiId = "Invalid UPI ID. Format: xyz@bankname";
      }
      if (!validateAmount(upiData.amount)) {
        validationErrors.amount = "Amount must be a positive number";
      }
    } else if (selectedMethod === "bank") {
      if (!validateAccountNumber(bankData.accountNumber)) {
        validationErrors.accountNumber = "Account number must be 9 to 18 digits";
      }
      if (!validateIfsc(bankData.ifsc)) {
        validationErrors.ifsc = "Invalid IFSC code. Format: ABCD0123456";
      }
      if (!validateAmount(bankData.amount)) {
        validationErrors.amount = "Amount must be a positive number";
      }
    }

    // If there are validation errors, set them and stop submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    try {
      if (selectedMethod === "upi") {
        await addDoc(collection(db, "payments"), {
          type: "upi",
          ...upiData,
          userId: userUid, // Include the user's UID
          timestamp: new Date(),
        });
      } else if (selectedMethod === "bank") {
        await addDoc(collection(db, "payments"), {
          type: "bank",
          ...bankData,
          userId: userUid, // Include the user's UID
          timestamp: new Date(),
        });
      }
      alert("Payment recorded successfully");
      // Reset form data after successful submission
      setUpiData({ upiId: "", amount: "", note: "" });
      setBankData({
        beneficiary: "",
        accountNumber: "",
        ifsc: "",
        amount: "",
        note: "",
      });
      setSelectedMethod(null); // Go back to the method selection screen
    } catch (error) {
      console.error(error);
      alert("Error recording payment");
    }
  };

  // Handle changes in UPI fields
  const handleUpiChange = (e) => {
    const { id, value } = e.target;
    setUpiData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle changes in Bank fields
  const handleBankChange = (e) => {
    const { id, value } = e.target;
    setBankData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="w-full max-w-md space-y-6">
        {selectedMethod === null ? (
          <div className="grid grid-cols-2 gap-6">
            <Card
              onClick={() => setSelectedMethod("upi")}
              className="cursor-pointer hover:shadow-lg transition"
            >
              <CardHeader>
                <CardTitle>Payment to a UPI ID</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Transfer money using your UPI ID</p>
              </CardContent>
            </Card>
            <Card
              onClick={() => setSelectedMethod("bank")}
              className="cursor-pointer hover:shadow-lg transition"
            >
              <CardHeader>
                <CardTitle>Bank Transfer</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Transfer money directly from your bank account</p>
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
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@upi"
                        value={upiData.upiId}
                        onChange={handleUpiChange}
                      />
                      {errors.upiId && (
                        <p className="text-red-500 text-sm">{errors.upiId}</p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="amount">Amount (₹)</Label>
                      <Input
                        id="amount"
                        placeholder="Enter amount"
                        type="number"
                        value={upiData.amount}
                        onChange={handleUpiChange}
                      />
                      {errors.amount && (
                        <p className="text-red-500 text-sm">{errors.amount}</p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="note">Note</Label>
                      <Input
                        id="note"
                        placeholder="Optional note"
                        value={upiData.note}
                        onChange={handleUpiChange}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedMethod(null)}
                  >
                    Back
                  </Button>
                  <Button type="submit">Pay</Button>
                </CardFooter>
              </Card>
            )}

            {selectedMethod === "bank" && (
              <Card className="w-[350px]">
                <CardHeader className="flex justify-center">
                  <CardTitle>Bank Transfer</CardTitle>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="beneficiary">Beneficiary Name</Label>
                        <Input
                          id="beneficiary"
                          placeholder="Enter beneficiary name"
                          value={bankData.beneficiary}
                          onChange={handleBankChange}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                          id="accountNumber"
                          placeholder="Enter account number"
                          value={bankData.accountNumber}
                          onChange={handleBankChange}
                        />
                        {errors.accountNumber && (
                          <p className="text-red-500 text-sm">
                            {errors.accountNumber}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="ifsc">IFSC Code</Label>
                        <Input
                          id="ifsc"
                          placeholder="Enter IFSC code"
                          value={bankData.ifsc}
                          onChange={handleBankChange}
                        />
                        {errors.ifsc && (
                          <p className="text-red-500 text-sm">{errors.ifsc}</p>
                        )}
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="amount">Amount (₹)</Label>
                        <Input
                          id="amount"
                          placeholder="Enter amount"
                          type="number"
                          value={bankData.amount}
                          onChange={handleBankChange}
                        />
                        {errors.amount && (
                          <p className="text-red-500 text-sm">{errors.amount}</p>
                        )}
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="note">Note</Label>
                        <Input
                          id="note"
                          placeholder="Optional note"
                          value={bankData.note}
                          onChange={handleBankChange}
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedMethod(null)}
                  >
                    Back
                  </Button>
                  <Button type="submit">Pay</Button>
                </CardFooter>
              </Card>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Payments;