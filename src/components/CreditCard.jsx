// src/components/CreditCardCard.jsx
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CreditCardCard = ({ name, limit, interestRate, annualFee, onApply }) => {
  return (
    <Card className="bg-gray-100 mb-4">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-xl font-semibold">Limit: ₹{limit.toLocaleString()}</p>
          <p className="text-xl font-semibold">Interest Rate: {interestRate}% p.a.</p>
          <p className="text-xl font-semibold">Annual Fee: ₹{annualFee}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => onApply(name)}>Apply Now</Button>
      </CardFooter>
    </Card>
  );
};

export default CreditCardCard;