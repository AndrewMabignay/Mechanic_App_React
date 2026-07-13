import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const token = localStorage.getItem("bike_mechanic_token");
    const role = localStorage.getItem("bike_mechanic_role");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!role || !allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />
};

export default ProtectedRoute;