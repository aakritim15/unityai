"use client"

import { useEffect, useState } from "react"
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"
import { getAuth } from "firebase/auth" // Import Firebase Auth
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FiMessageCircle, FiUser } from "react-icons/fi" // Chatbot & Account Icons

const Transactions = () => {
  const [upiTransactions, setUpiTransactions] = useState([])
  const [bankTransactions, setBankTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [userUid, setUserUid] = useState(null) // State to store the authenticated user's UID

  useEffect(() => {
    const auth = getAuth() // Initialize Firebase Auth

    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid) // Set the authenticated user's UID
      } else {
        setUserUid(null) // No user is signed in
      }
    })

    return () => unsubscribe() // Cleanup on unmount
  }, [])

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!userUid) {
        setLoading(false)
        return // Exit if no user is logged in
      }

      const db = getFirestore()
      const paymentsCollection = collection(db, "payments")

      // Query Firestore for transactions where userId matches the authenticated user's UID
      const q = query(paymentsCollection, where("userId", "==", userUid))
      const paymentsSnapshot = await getDocs(q)
      const paymentsData = paymentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Separate UPI and Bank transactions
      const upi = paymentsData.filter((payment) => payment.type === "upi")
      const bank = paymentsData.filter((payment) => payment.type === "bank")

      setUpiTransactions(upi)
      setBankTransactions(bank)
      setLoading(false)
    }

    fetchTransactions()
  }, [userUid]) // Re-fetch transactions when userUid changes

  if (loading) {
    return <div className="flex justify-center p-6">Loading...</div>
  }

  if (!userUid) {
    return <div className="flex justify-center p-6">Please log in to view transactions.</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section (Copied from Dashboard) */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Transactions</h1>
        <div className="flex items-center space-x-6">
          {/* Chatbot Icon */}
          <button className="text-gray-600 hover:text-blue-600 transition">
            <FiMessageCircle size={24} />
          </button>

          {/* Account Icon */}
          <button className="text-gray-600 hover:text-blue-600 transition">
            <FiUser size={24} />
          </button>
        </div>
      </header>

      {/* Transactions Section */}
      <div className="space-y-10 p-6">
        <h1 className="text-2xl font-bold">Transactions</h1>

        {/* UPI Transactions Table */}
        <div>
          <h2 className="text-xl font-semibold mb-4">UPI Transactions</h2>
          <Table>
            <TableCaption>A list of your UPI transactions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>UPI ID</TableHead>
                <TableHead>Amount (₹)</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upiTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.upiId}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.note}</TableCell>
                  <TableCell>{transaction.timestamp?.toDate().toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Bank Transactions Table */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Bank Transactions</h2>
          <Table>
            <TableCaption>A list of your bank transactions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Beneficiary</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>IFSC Code</TableHead>
                <TableHead>Amount (₹)</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bankTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.beneficiary}</TableCell>
                  <TableCell>{transaction.accountNumber}</TableCell>
                  <TableCell>{transaction.ifsc}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.note}</TableCell>
                  <TableCell>{transaction.timestamp?.toDate().toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Transactions
