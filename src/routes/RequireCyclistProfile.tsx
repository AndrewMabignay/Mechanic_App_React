import { Navigate, Outlet } from "react-router-dom";
import { useCyclistProfile } from "@/features/cyclist/hooks/useCyclistProfile";
import { useEffect, useState } from "react";
import LoadingComponent from "@/components/LoadingComponent";

export default function RequireCyclistProfile() {
    const { data, isLoading, isError } = useCyclistProfile();

    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => {
                setShowLoading(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (isLoading || showLoading) {
        return <LoadingComponent />;
    }

    if (isError || !data?.data) {
        return <Navigate to="/cyclist/create-profile" replace />;
    }

    return <Outlet />;
}
