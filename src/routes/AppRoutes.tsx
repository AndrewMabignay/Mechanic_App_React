import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import CyclistHome from "../pages/cylist/CyclistHome";
import AdminDashboard from "../pages/admin/AdminDashboard";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RequestMechanic from "../pages/cylist/RequestMechanic";
import CyclistLayout from "../layouts/CyclistLayout";
import OtpVerificationPage from "../pages/auth/OtpVerificationPage";
import CyclistProfileForm from "../features/cyclist/components/CyclistProfileForm";
import MechanicLayout from "../layouts/MechanicLayout";
import MechanicProfileForm from "../features/mechanic/components/MechanicProfileForm";
import CreateMechanicProfileRoute from "./CreateMechanicProfileRoute";
import MechanicHome from "../pages/mechanic/MechanicHome";
import CyclistMap from "../pages/cylist/CyclistMap";
import Profile from "../pages/Profile";
import HomeRedirect from "./HomeRedirect";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route
                        path="/verify-otp"
                        element={<OtpVerificationPage />}
                    />
                </Route>

                {/* Cyclist */}
                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={["cyclist", "cyclist_mechanic"]}
                        />
                    }
                >
                    <Route
                        path="/cyclist/create-profile"
                        element={<CyclistProfileForm />}
                    />

                    <Route element={<CyclistLayout />}>
                        <Route path="/cyclist/" element={<CyclistHome />} />
                        <Route
                            path="/cyclist/request-mechanic"
                            element={<CyclistMap />}
                        />
                        {/* <Route path="/cyclist/profile" element={<CyclistProfile />} /> */}
                        <Route path="/cyclist/profile" element={<Profile />} />

                        <Route
                            path="/cyclist/request-mechanic"
                            element={<RequestMechanic />}
                        />
                    </Route>
                </Route>

                {/* Mechanic */}
                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={["mechanic", "cyclist_mechanic"]}
                        />
                    }
                >
                    <Route
                        path="/mechanic/create-profile"
                        element={
                            <CreateMechanicProfileRoute>
                                <MechanicProfileForm />
                            </CreateMechanicProfileRoute>
                        }
                    />

                    <Route element={<MechanicLayout />}>
                        <Route path="/mechanic" element={<MechanicHome />} />
                        <Route path="/mechanic/profile" element={<Profile />} />
                    </Route>
                </Route>

                {/* Administrator */}
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                    <Route path="/admin/*" element={<AdminDashboard />} />
                </Route>

                <Route path="/" element={<HomeRedirect />} />

                <Route path="/unauthorized" element={<Unauthorized />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
