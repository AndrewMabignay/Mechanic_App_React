import { Navigate, Outlet } from "react-router-dom";
import { useMechanicProfile } from "../features/mechanic/hooks/useMechanicProfile";

export default function RequireMechanicProfile() {
    const { data, isLoading, isError } = useMechanicProfile();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !data?.data) {
        return <Navigate to="/mechanic/create-profile" replace />;
    }

    return <Outlet />;
}
