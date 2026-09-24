import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMechanicCurrentServiceRequest } from "../api/mechanicCurrentServiceRequestApi";
import {
    acceptServiceRequest,
    completeServiceRequest,
    declineServiceRequest,
    enRouteServiceRequest,
    inProgressServiceRequest,
} from "../api/statusServiceRequestApi";

export function useMechanicCurrentServiceRequest(enabled = true) {
    return useQuery({
        queryKey: ["mechanic-current-service-request"],
        queryFn: getMechanicCurrentServiceRequest,
        enabled,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        retry: false,
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

export function useDeclineServiceRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: declineServiceRequest,
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

export function useInProgressServiceRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: inProgressServiceRequest,
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

export function useCompleteServiceRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: completeServiceRequest,
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
