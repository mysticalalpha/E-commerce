import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(undefined);

const AUTH_STORAGE_KEY = "app_auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  const login = ({ name, email, gender, age }) => {
    // Demo: store basic user info and a fake token
    const stored = {
      name,
      email,
      gender: gender || null,
      age: age || null,
      token: btoa(email + ":demo-token"),
      loggedAt: Date.now(),
    };
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(stored));
    } catch (e) {
      console.error("Failed to persist auth", e);
    }
    setUser(stored);
    return stored;
  };

  const logout = () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error("Failed to remove auth", e);
    }
    setUser(null);
  };

  const updateUser = (updates) => {
    setUser((prev) => {
      const next = { ...(prev || {}), ...updates };
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error("Failed to persist auth", e);
      }
      return next;
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthProvider;
