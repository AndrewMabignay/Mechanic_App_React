import { Navigate } from "react-router-dom";
import { useMechanicProfile } from "../features/mechanic/hooks/useMechanicProfile";
import LoadingComponent from "@/components/LoadingComponent";
import { useEffect, useState } from "react";

interface Props {
    children: React.ReactNode;
}

export default function CreateMechanicProfileRoute({ children }: Props) {
    const { data, isLoading } = useMechanicProfile();

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

    if (data?.data) {
        return <Navigate to="/mechanic/profile" replace />;
    }

    return <>{children}</>;
}
