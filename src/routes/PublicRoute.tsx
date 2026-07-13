import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Outlet />
    }

    switch (role) {
        case "Cyclist":
        case "Cyclist/Mechanic":
            return <Navigate to="/cyclist" replace />;

        case "Mechanic":
            return <Navigate to="/mechanic" replace />;

        case "Bike Shop Owner":
            return <Navigate to="/shop" replace />;

        case "Administrator":
            return <Navigate to="/admin" replace />;

        default:
            return <Navigate to="/login" replace />;
    }
};

export default PublicRoute;