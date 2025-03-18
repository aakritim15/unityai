import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  ArrowRightLeft,
  DollarSign,
  CreditCard,
  User,
  Info,
  Settings,
  LogOut,
} from "lucide-react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { cn } from "../lib/utils";

export default function Drawer() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  const routes = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
    { href: "/payment", label: "Payment Gateway", icon: DollarSign, id: "payment" },
    { href: "/transactions", label: "Transactions", icon: ArrowRightLeft, id: "transactions" },
    { href: "/loans", label: "Loans", icon: CreditCard, id: "loans" },
    { href: "/credit", label: "Credit", icon: CreditCard, id: "credit" },
    { href: "/accountinfo", label: "Account Info", icon: User, id: "accountinfo" },
  ];

  return (
    <div className="w-64 min-w-64 border-r bg-background h-screen flex flex-col">
      <div className="px-6 py-3 border-b">
        <NavLink to="/dashboard" className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">
            U<sub>AI</sub>
          </span>
        </div>
          <span className="font-bold text-xl">UnityAI</span>
        </NavLink>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <div className="px-3 mb-2">
          <h3 className="text-xs font-medium text-muted-foreground mb-2 px-3">Menu</h3>
          <nav className="space-y-1">
            {routes.map((route) => (
              <NavLink
                key={route.id}
                to={route.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )
                }
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="px-3 mt-6">
          <h3 className="text-xs font-medium text-muted-foreground mb-2 px-3">Settings</h3>
          <nav className="space-y-1">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              <Settings className="h-4 w-4" />
              Settings
            </NavLink>
            <a
              onClick={handleLogout}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </a>
          </nav>
        </div>
      </div>
      {user && (
        <div className="p-2 border-t flex items-center justify-center gap-3">
          <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full" />
          <div>
            <p className="text-sm font-medium">{user.displayName}</p> 
          </div>
          <a
              onClick={handleLogout}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-[#ff0000] hover:duration-300 duration-300 cursor-pointer"
            >
              <LogOut className="h-5 w-5" />

            </a>
        </div>
      )}
    </div>
  );
}