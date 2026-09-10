import { Navigate } from "react-router-dom";

import { useCyclistProfile } from "@/features/cyclist/hooks/useCyclistProfile";

interface Props {
    children: React.ReactNode;
}

export default function CreateCyclistProfileRoute({ children }: Props) {
    const { data, isLoading, isError } = useCyclistProfile();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isError && data?.data) {
        return <Navigate to="/cyclist/profile" replace />;
    }

    return <>{children}</>;
}
