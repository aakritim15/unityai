// src/components/LoanCard.jsx
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LoanCard = ({ amount, interestRate, tenure, onApply }) => {
  return (
    <Card className="bg-gray-100 mb-4">
      <CardHeader>
        <CardTitle>Loan Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-xl font-semibold">Loan Amount: ₹{amount.toLocaleString()}</p>
          <p className="text-xl font-semibold">Interest Rate: {interestRate}% p.a.</p>
          <p className="text-xl font-semibold">Tenure: {tenure} Years</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => onApply(amount)}>Apply Loan</Button>
      </CardFooter>
    </Card>
  );
};

export default LoanCard;