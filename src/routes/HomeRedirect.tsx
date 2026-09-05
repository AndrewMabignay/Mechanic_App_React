import { Navigate } from "react-router-dom";

const HomeRedirect = () => {
    const token = localStorage.getItem("bike_mechanic_token");
    const role = localStorage.getItem("bike_mechanic_role");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    switch (role) {
        case "cyclist":
        case "cyclist_mechanic":
            return <Navigate to="/cyclist/" replace />;

        case "mechanic":
            return <Navigate to="/mechanic" replace />;

        case "bike_shop_owner":
            return <Navigate to="/shop/dashboard" replace />;

        case "admin":
            return <Navigate to="/admin/dashboard" replace />;

        default:
            return <Navigate to="/login" replace />;
    }
};

export default HomeRedirect;
