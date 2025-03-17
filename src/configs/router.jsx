import { createBrowserRouter, Navigate } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Layout from "../pages/Layout";
import Dashboard from "../pages/Dashboard";
import Payments from "@/pages/Payments";
import Transactions from "@/pages/Transactions";
import Loans from "@/pages/Loans";
import AccountInfo from "@/pages/AccountInfo";
import Settings from "@/pages/Settings";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "payment",
        element: <Payments />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "loans",
        element: <Loans />,
      },
      {
        path: "accountinfo",
        element: <AccountInfo />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>404 Page not found</h1>,
  },
]);

export default router;
