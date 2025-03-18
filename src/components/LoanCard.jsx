import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LoanCard = ({ loanType, amount, interestRate, tenure, onApply }) => {
  return (
    <Card className="bg-gray-100 mb-4">
      <CardHeader>
        <CardTitle>Loan Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 flex flex-row gap-8 items-center">
          <p className="text-xl font-semibold">{loanType} Loan</p> {/* Display dynamic loan type */}
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card h-8 w-8"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
          {/* <p className="text-xl font-semibold">Interest Rate: {interestRate}% p.a.</p>
          <p className="text-xl font-semibold">Tenure: {tenure} Years</p> */}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => onApply(amount)}>Apply Loan</Button>
      </CardFooter>
    </Card>
  );
};

export default LoanCard;