import { Loader2 } from "lucide-react";
import { useCurrentServiceRequest } from "../hooks/useCurrentServiceRequest";

export default function FindingMechanicDialog() {
    const { data, isLoading } = useCurrentServiceRequest();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center gap-4 py-8">
                <Loader2 className="h-10 w-10 animate-spin" />
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-4 py-8">
            <Loader2 className="h-10 w-10 animate-spin" />

            <h2 className="text-xl font-semibold">
                Finding Mechanic...
            </h2>

            <p>
                Status: {data?.data.status}
            </p>

            <p>
                Problem: {data?.data.bike_problem.name}
            </p>
        </div>
    );
}