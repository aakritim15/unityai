import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiMessageCircle, FiUser } from "react-icons/fi"; // Imported icons

export default function SettingsPage() {
  const [settingsData, setSettingsData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    email: "",
    phone: "",
    enable2FA: false,
    securityQuestion: "",
    securityAnswer: "",
  });

  const [isChatOpen, setIsChatOpen] = useState(false); // Chatbot state

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettingsData({
      ...settingsData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (settingsData.newPassword !== settingsData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Settings Updated:", settingsData);
    alert("Settings updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Account Settings</h1>
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

      {/* Settings Form Section */}
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-lg shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-lg">Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="grid gap-3">
              <Input type="password" name="currentPassword" placeholder="Current Password" value={settingsData.currentPassword} onChange={handleChange} required />
              <Input type="password" name="newPassword" placeholder="New Password" value={settingsData.newPassword} onChange={handleChange} required />
              <Input type="password" name="confirmPassword" placeholder="Confirm Password" value={settingsData.confirmPassword} onChange={handleChange} required />
              <Input type="email" name="email" placeholder="Update Email" value={settingsData.email} onChange={handleChange} required />
              <Input type="tel" name="phone" placeholder="Update Phone Number" value={settingsData.phone} onChange={handleChange} required />

              <div className="flex items-center">
                <input type="checkbox" name="enable2FA" checked={settingsData.enable2FA} onChange={handleChange} className="mr-2" />
                <label className="text-sm">Enable Two-Factor Authentication</label>
              </div>

              <select name="securityQuestion" value={settingsData.securityQuestion} onChange={handleChange} required className="w-full border p-2 rounded text-sm">
                <option value="">Select Security Question</option>
                <option value="pet">First pet’s name?</option>
                <option value="mother">Mother’s maiden name?</option>
                <option value="city">City of birth?</option>
              </select>
              <Input type="text" name="securityAnswer" placeholder="Security Answer" value={settingsData.securityAnswer} onChange={handleChange} required />

              <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 text-sm py-2 mt-2">
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
