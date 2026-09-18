import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const token = localStorage.getItem("bike_mechanic_token");
    const role = localStorage.getItem("bike_mechanic_role");

    if (!token) {
        return <Outlet />;
    }

    switch (role) {
        case "cyclist":
            return <Navigate to="/cyclist" replace />;

        case "mechanic":
            return <Navigate to="/mechanic" replace />;

        case "admin":
            return <Navigate to="/admin" replace />;

        default:
            return <Navigate to="/login" replace />;
    }
};

export default PublicRoute;
