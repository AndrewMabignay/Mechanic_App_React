import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import { useMechanicProfile } from "../features/mechanic/hooks/useMechanicProfile";
import LoadingComponent from "@/components/LoadingComponent";

export default function RequireMechanicProfile() {
    const { data, isLoading, isError } = useMechanicProfile();

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
        return <Navigate to="/mechanic/create-profile" replace />;
    }

    return <Outlet />;
}
