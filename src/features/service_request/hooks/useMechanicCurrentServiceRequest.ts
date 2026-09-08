import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMechanicCurrentServiceRequest } from "../api/mechanicCurrentServiceRequestApi";
import {
    acceptServiceRequest,
    enRouteServiceRequest,
} from "../api/statusServiceRequestApi";

export function useMechanicCurrentServiceRequest(enabled = true) {
    return useQuery({
        queryKey: ["mechanic-current-service-request"],
        queryFn: getMechanicCurrentServiceRequest,
        enabled,

        // Optional: para sa live tracking
        refetchInterval: 3000,
    });
}

export function useAcceptServiceRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: acceptServiceRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["incoming-requests"],
            });
            queryClient.invalidateQueries({
                queryKey: ["mechanic-current-service-request"],
            });
        },
    });
}

export function useEnRouteServiceRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: enRouteServiceRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["incoming-requests"],
            });
            queryClient.invalidateQueries({
                queryKey: ["mechanic-current-service-request"],
            });
        },
    });
}
