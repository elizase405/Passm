import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user from token
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(false); // not logged in
      return;
    }

    try {
      const res = await axios.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      setUser(false);
      console.log("Error fetching user: ", err);
    }
  };

  // Runs once on mount
  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);