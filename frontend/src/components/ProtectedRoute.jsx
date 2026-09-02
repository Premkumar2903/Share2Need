import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRole }) {

    const { isLoggedIn, user, loading } = useAuth();

    // Wait until we know whether the user is logged in
    if (loading) {
        return <p>Loading...</p>;
    }

    // Not logged in
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // Logged in but wrong role
    if (allowedRole && user?.role !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    // Everything is okay
    return children;
}

export default ProtectedRoute;