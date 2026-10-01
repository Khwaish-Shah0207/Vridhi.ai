"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRoleState] = useState("MSME Borrower");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("vridhi_user");
      const savedRole = localStorage.getItem("vridhi_role");

      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);

        if (parsedUser.role) {
          setRoleState(parsedUser.role);
        }
      }

      if (savedRole) {
        setRoleState(savedRole);
      }
    } catch (e) {
      console.error("Failed to restore session from localStorage", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    const selectedRole =
      userData.role || role || "MSME Borrower";

    const userObj = {
      name:
        userData.name ||
        (selectedRole === "MSME Borrower"
          ? "Rajesh Sharma"
          : "Priya Mehta"),

      email:
        userData.email || "user@vridhi.ai",

      role: selectedRole,

      organization:
        userData.organization ||
        (selectedRole === "MSME Borrower"
          ? "Sharma Enterprises"
          : "HDFC Bank MSME Desk"),
    };

    setUser(userObj);
    setRoleState(selectedRole);
    setIsAuthenticated(true);

    try {
      localStorage.setItem(
        "vridhi_user",
        JSON.stringify(userObj)
      );

      localStorage.setItem(
        "vridhi_role",
        selectedRole
      );
    } catch (e) {
      console.error("Failed to save session", e);
    }

    return userObj;
  };

  const signup = (userData) => {
    return login(userData);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);

    try {
      localStorage.removeItem("vridhi_user");
      localStorage.removeItem("vridhi_role");
    } catch (e) {
      console.error("Failed to clear session", e);
    }

    router.push("/");
  };

  const setRole = (newRole) => {
    setRoleState(newRole);

    try {
      localStorage.setItem("vridhi_role", newRole);
    } catch (e) {
      console.error("Failed to save role", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return ctx;
}