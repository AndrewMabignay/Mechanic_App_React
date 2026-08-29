import { useQuery } from "@tanstack/react-query";
import { getMechanicCurrentServiceRequest } from "../api/mechanicCurrentServiceRequestApi";

export function useMechanicCurrentServiceRequest(enabled = true) {
    return useQuery({
        queryKey: ["mechanic-current-service-request"],
        queryFn: getMechanicCurrentServiceRequest,
        enabled,

        // Optional: para sa live tracking
        refetchInterval: 3000,
    });
}