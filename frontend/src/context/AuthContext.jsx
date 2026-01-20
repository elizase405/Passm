import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        try {
            const res = await axios.get("/auth/me");
            setUser(res.data);
        } catch (err) {
            setUser(false);
            console.log("Error fetching user: ", err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const logout = async () => {
        try {
            await axios.post("/auth/logout");
            setUser(false);
        } catch (err) {
            console.log("Error logging out: ", err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, fetchUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);