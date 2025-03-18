import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CreditCardForm = ({ cardName, limit, interestRate, annualFee, onApply }) => {
  return (
    <Card className="bg-gray-100 shadow-md rounded-lg p-4">
      <CardHeader>
        <CardTitle>{cardName} Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold">Credit Limit: ₹{limit.toLocaleString()}</p>
        <p className="text-lg font-semibold">Interest Rate: {interestRate}%</p>
        <p className="text-lg font-semibold">Annual Fee: ₹{annualFee}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => onApply(cardName)}>Apply</Button>
      </CardFooter>
    </Card>
  );
};

export default CreditCardForm;
