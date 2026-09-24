import { useQuery } from "@tanstack/react-query";
import { getCurrentMechanicServiceRequest } from "../api/serviceRequestApi";

export function useMechanicCurrentServiceRequest() {
    return useQuery({
        queryKey: ["mechanic-current-service-request"],
        queryFn: getCurrentMechanicServiceRequest,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        retry: false,
    });
}
