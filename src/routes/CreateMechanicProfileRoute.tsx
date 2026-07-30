import { Navigate } from "react-router-dom";
import { useMechanicProfile } from "../features/mechanic/hooks/useMechanicProfile";

interface Props {
    children: React.ReactNode;
}

export default function CreateMechanicProfileRoute({ children }: Props) {
    const { data, isLoading } = useMechanicProfile();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (data?.data) {
        return <Navigate to="/mechanic/profile" replace />;
    }

    return <>{children}</>;
}