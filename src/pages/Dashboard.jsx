import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { FiMessageCircle, FiUser } from "react-icons/fi"; // Chatbot & Account Icons
import { useState } from "react";

const data = [
  { name: "Food", value: 400 },
  { name: "Education", value: 300 },
  { name: "Travel", value: 200 },
  { name: "Saving", value: 500 },
  { name: "Miscellaneous", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

function Dashboard() {
  const [isChatOpen, setIsChatOpen] = useState(false);

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

      {/* Spacing after Header */}
      <div className="mt-6 px-4 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Balance Box */}
        <Card className="p-4 h-28 flex items-center justify-center shadow-sm">
          <CardContent className="text-center">
            <h2 className="text-md font-medium">Balance</h2>
            <p className="text-xl font-semibold text-blue-600">₹50,000</p>
          </CardContent>
        </Card>

        {/* CIBIL Score Box */}
        <Card className="p-4 h-28 flex items-center justify-center shadow-sm">
          <CardContent className="text-center">
            <h2 className="text-md font-medium">CIBIL Score</h2>
            <p className="text-xl font-semibold text-green-600">750</p>
          </CardContent>
        </Card>

        {/* Cashback */}
        <Card className="p-4 h-28 flex items-center justify-center shadow-sm">
          <CardContent className="text-center">
            <h2 className="text-md font-medium">Cashback Earned</h2>
            <p className="text-xl font-semibold text-green-600">₹500</p>
          </CardContent>
        </Card>

        {/* Monthly Spending (Pie Chart) */}
        <Card className="p-4 shadow-sm flex justify-center items-center">
          <CardContent className="w-full text-center">
            <h2 className="text-md font-medium mb-2">Monthly Spending</h2>
            <div className="flex justify-center">
              <PieChart width={220} height={220}>
                <Pie data={data} cx="50%" cy="50%" outerRadius={70} fill="#8884d8" dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions List - Adjusted Size */}
        <Card className="p-4 shadow-sm lg:col-span-2">
          <CardContent>
            <h2 className="text-md font-medium mb-3">Recent Transactions</h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex justify-between py-2 border-b">
                <span className="text-gray-700">Amazon Purchase</span> 
                <span className="text-red-600">-₹2,000</span>
              </li>
              <li className="flex justify-between py-2 border-b">
                <span className="text-gray-700">Salary Credit</span> 
                <span className="text-green-600">+₹30,000</span>
              </li>
              <li className="flex justify-between py-2">
                <span className="text-gray-700">Restaurant</span> 
                <span className="text-red-600">-₹1,500</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Loan Section */}
        <Card className="p-4 shadow-sm lg:col-span-2">
          <CardContent className="flex justify-between items-center">
            <div>
              <h2 className="text-md font-medium">Loan</h2>
              <p className="text-sm text-gray-600">Check your loan eligibility</p>
            </div>
            <Button size="sm">Apply Now</Button>
          </CardContent>
        </Card>
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
}

export default Dashboard;
