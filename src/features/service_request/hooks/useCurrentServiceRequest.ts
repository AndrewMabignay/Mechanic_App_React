import { useQuery } from "@tanstack/react-query";
import {
    getCurrentCyclistServiceRequest,
    getCurrentMechanicServiceRequest,
} from "../api/serviceRequestApi";

export function useCurrentServiceRequest(enabled = true) {
    return useQuery({
        queryKey: ["current-service-request"],
        queryFn: getCurrentCyclistServiceRequest,
        enabled,
        refetchInterval: 3000,
    });
}

export function useMechanicCurrentServiceRequest() {
    return useQuery({
        queryKey: ["mechanic-current-service-request"],
        queryFn: getCurrentMechanicServiceRequest,
        refetchInterval: (query) => {
            const data = query.state.data?.data;

            if (!data) return false;

            if (data.status === "completed" || data.status === "cancelled")
                return false;

            return 3000;
        },

        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,

        retry: false,
    });
}
