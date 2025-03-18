import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreditCardApplicationForm = ({ transaction, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(transaction);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction Analysis</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Transaction Amount (₹)</Label>
          <Input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
        </div>
        <div>
          <Label>Transaction Type</Label>
          <select name="transactionType" value={formData.transactionType} onChange={handleChange} className="w-full p-2 border rounded-md">
            <option value="Online">Online</option>
            <option value="POS">POS</option>
            <option value="ATM">ATM</option>
          </select>
        </div>
        <div>
          <Label>Time</Label>
          <Input type="datetime-local" name="time" value={formData.time} onChange={handleChange} required />
        </div>
        <div>
          <Label>Location</Label>
          <Input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div>
          <Label>Previous Fraudulent History</Label>
          <input type="checkbox" name="fraudHistory" checked={formData.fraudHistory} onChange={handleChange} />
        </div>
        <div>
          <Label>Account Type</Label>
          <select name="accountType" value={formData.accountType} onChange={handleChange} className="w-full p-2 border rounded-md">
            <option value="Savings">Savings</option>
            <option value="Current">Current</option>
          </select>
        </div>
        <div>
          <Label>Account Age (Years)</Label>
          <Input type="number" name="accountAge" value={formData.accountAge} onChange={handleChange} required />
        </div>
        <div>
          <Label>Credit Utilization (%)</Label>
          <Input type="number" name="creditUtilisation" value={formData.creditUtilisation} onChange={handleChange} required />
        </div>
        <div className="flex justify-between">
          <Button type="submit" className="bg-black text-white hover:bg-gray-800">
            Submit
          </Button>
          <Button type="button" onClick={onCancel} className="bg-black text-white hover:bg-red-700">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreditCardApplicationForm;
