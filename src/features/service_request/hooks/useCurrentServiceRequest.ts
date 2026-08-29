import { useQuery } from "@tanstack/react-query";
import { getCurrentServiceRequest } from "../api/currentServiceRequestApi";

export function useCurrentServiceRequest(enabled = true) {
    return useQuery({
        queryKey: ["current-service-request"],
        queryFn: getCurrentServiceRequest,
        enabled,
        refetchInterval: 3000,
    });
}