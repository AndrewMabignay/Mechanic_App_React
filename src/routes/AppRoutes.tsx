import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import CyclistHome from "../pages/cylist/CyclistHome";
import AdminDashboard from "../pages/admin/AdminDashboard";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import BikeShopOwnerLayout from "../layouts/BikeShopOwnerLayout";
import Dashboard from "../pages/bike_shop_owner/Dashboard";
import BikeShops from "../pages/bike_shop_owner/BikeShops";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public */}
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                {/* Cyclist */}
                <Route element={<ProtectedRoute allowedRoles={["cyclist", "cyclist_mechanic"]} />}>
                    <Route path="/cyclist/*" element={<CyclistHome />} />
                </Route>

                {/* Mechanic */}
                <Route element={<ProtectedRoute allowedRoles={["mechanic", "cyclist_mechanic"]} />}>
                    <Route path="/mechanic/*" element={<CyclistHome />} />
                </Route>

                {/* Bike Shop Owner */}
                <Route element={<ProtectedRoute allowedRoles={["bike_shop_owner"]} />}>

                    <Route element={<BikeShopOwnerLayout />}>
                        
                        <Route path="/shop/dashboard" element={<Dashboard />} />

                        <Route path="/shop/bike-shops" element={<BikeShops />} />

                        <Route path="/shop/bike-shops/:uuid" element={<BikeShops />} />

                        <Route path="/shop/service-requests" element={<BikeShops />} />

                        <Route path="/shop/notifications" element={<BikeShops />} />

                        <Route path="/shop/profile" element={<BikeShops />} />
                    </Route>
                    {/* <Route path="/shop/*" element={<CyclistHome />} /> */}
                </Route>

                {/* Administrator */}
                <Route
                    element={
                        <ProtectedRoute 
                            allowedRoles={["admin"]}
                        />
                    }
                >
                    <Route path="/admin/*" element={<AdminDashboard />} />
                </Route>

                <Route path="/unauthorized" element={<Unauthorized />} />
                    
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;