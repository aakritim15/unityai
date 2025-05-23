import { createBrowserRouter, Navigate } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Layout from "../pages/Layout";
import Dashboard from "../pages/Dashboard";
import Payments from "@/pages/Payments";
import Transactions from "@/pages/Transactions";
import Loans from "@/pages/Loans";
import Credit from "@/pages/Credit";
import AccountInfo from "@/pages/AccountInfo";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

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
        path:"credit",
        element:<Credit/>,
      },
      {
        path: "accountinfo",
        element: <AccountInfo />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "notfound",
        element: <NotFound />,
      }
    ],
  },
  {
    path: "*",
    element: <h1>404 Page not found</h1>,
  },
]);

export default router;
