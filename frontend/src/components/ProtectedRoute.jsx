import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { user } = null

    if (user === null) {
        return <p>Loading...</p>;
    }

    return user ? children : <Navigate to="/login" />;
}
