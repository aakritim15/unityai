// src/components/LoanApplicationForm.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAuth } from "firebase/auth";

const LoanApplicationForm = ({ loanAmount, onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    age: '',
    gender: '',
    maritalStatus: '',
    employmentType: '',
    industry: '',
    yearsWithEmployer: '',
    educationLevel: '',
    cibilScore: '',
    loanType: '',
    loanPurpose: '',
    loanAmount: loanAmount,
    loanTenure: '',
    existingLoans: '',
    repaymentHistory: '',
    dtiRatio: '',
    creditUtilization: '',
    creditCardPaymentBehavior: '',
    monthlyIncome: '',
    incomeStability: '',
    totalSavings: '',
    bankAccountActivity: '',
    largeTransactions: '',
    numberOfCreditCards: '',
    totalCreditLimit: '',
    utilityPaymentHistory: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Loan Application Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" type="number" value={formData.age} onChange={handleChange} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select name="gender" onValueChange={(value) => handleSelectChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select name="maritalStatus" onValueChange={(value) => handleSelectChange('maritalStatus', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Employment Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Employment Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type</Label>
                <Select name="employmentType" onValueChange={(value) => handleSelectChange('employmentType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salaried">Salaried</SelectItem>
                    <SelectItem value="self-employed">Self-Employed</SelectItem>
                    
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select name="industry" onValueChange={(value) => handleSelectChange('industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                  </SelectContent>
                </Select>
                
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yearsWithEmployer">Years with Current Employer</Label>
                <Input 
                  id="yearsWithEmployer" 
                  name="yearsWithEmployer" 
                  type="number" 
                  value={formData.yearsWithEmployer} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="educationLevel">Education Level</Label>
                <Select name="educationLevel" onValueChange={(value) => handleSelectChange('educationLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Credit Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Credit Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="cibilScore">CIBIL Score</Label>
                <Input 
                  id="cibilScore" 
                  name="cibilScore" 
                  type="number" 
                  min="300" 
                  max="900" 
                  value={formData.cibilScore} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="numberOfCreditCards">Number of Credit Cards</Label>
                <Input 
                  id="numberOfCreditCards" 
                  name="numberOfCreditCards" 
                  type="number" 
                  value={formData.numberOfCreditCards} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="totalCreditLimit">Total Credit Limit</Label>
                <Input 
                  id="totalCreditLimit" 
                  name="totalCreditLimit" 
                  type="number" 
                  value={formData.totalCreditLimit} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="creditUtilization">Credit Utilization Ratio (%)</Label>
                <Input 
                  id="creditUtilization" 
                  name="creditUtilization" 
                  type="number" 
                  min="0" 
                  max="100" 
                  value={formData.creditUtilization} 
                  onChange={handleChange} 
                />
              </div>
            </div>
          </div>
          
          {/* Loan Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Loan Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="loanType">Loan Type</Label>
                <Select name="loanType" onValueChange={(value) => handleSelectChange('loanType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal Loan</SelectItem>
                    <SelectItem value="home">Home Loan</SelectItem>
                    <SelectItem value="education">Education Loan</SelectItem>
                    <SelectItem value="car">Car Loan</SelectItem>
                    <SelectItem value="business">Business Loan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="loanPurpose">Loan Purpose</Label>
                <Input id="loanPurpose" name="loanPurpose" value={formData.loanPurpose} onChange={handleChange} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                <Input 
                  id="loanAmount" 
                  name="loanAmount" 
                  type="number" 
                  value={formData.loanAmount} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
              
                <Label htmlFor="loanTenure">Loan Tenure (Months)</Label>
                <input
                  type="number"
                  name="loanTenure"
                  min="6"
                  step="6"
                  placeholder="Enter loan tenure in months (multiple of 6)"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value % 6 === 0) {
                      handleSelectChange('loanTenure', value);
                    } else {
                      // Optionally show an error message or reset invalid value
                      console.log("Please enter a multiple of 6.");
                    }
                  }}
                />
              </div>

              </div>
            </div>
          
          
          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Financial Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                <Input 
                  id="monthlyIncome" 
                  name="monthlyIncome" 
                  type="number" 
                  value={formData.monthlyIncome} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="totalSavings">Total Savings & Deposits (₹)</Label>
                <Input 
                  id="totalSavings" 
                  name="totalSavings" 
                  type="number" 
                  value={formData.totalSavings} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="existingLoans">Existing Loans (Number)</Label>
                <Input 
                  id="existingLoans" 
                  name="existingLoans" 
                  type="number" 
                  value={formData.existingLoans} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dtiRatio">DTI Ratio (%)</Label>
                <Input 
                  id="dtiRatio" 
                  name="dtiRatio" 
                  type="number" 
                  min="0" 
                  max="1" 
                  value={formData.dtiRatio} 
                  onChange={handleChange} 
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-6">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Submit Application
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoanApplicationForm;
