import { Navigate, Outlet } from "react-router-dom";
import { useCyclistProfile } from "@/features/cyclist/hooks/useCyclistProfile";

export default function RequireCyclistProfile() {
    const { data, isLoading, isError } = useCyclistProfile();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !data?.data) {
        return <Navigate to="/cyclist/create-profile" replace />;
    }

    return <Outlet />;
}
