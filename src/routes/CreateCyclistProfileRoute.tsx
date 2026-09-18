import { Navigate } from "react-router-dom";

import { useCyclistProfile } from "@/features/cyclist/hooks/useCyclistProfile";
import { useEffect, useState } from "react";
import LoadingComponent from "@/components/LoadingComponent";

interface Props {
    children: React.ReactNode;
}

export default function CreateCyclistProfileRoute({ children }: Props) {
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

    if (!isError && data?.data) {
        return <Navigate to="/cyclist/profile" replace />;
    }

    return <>{children}</>;
}
