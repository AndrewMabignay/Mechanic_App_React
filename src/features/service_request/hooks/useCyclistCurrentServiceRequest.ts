import { useMutation, useQuery } from "@tanstack/react-query";

import {
    cancelServiceRequest,
    getCurrentCyclistServiceRequest,
} from "../api/serviceRequestApi";

export const cyclistCurrentServiceRequestQueryKey = [
    "cyclist-current-service-request",
] as const;

export function useCyclistCurrentServiceRequest() {
    return useQuery({
        queryKey: cyclistCurrentServiceRequestQueryKey,
        queryFn: getCurrentCyclistServiceRequest,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        retry: false,
    });
}

export function useCancelServiceRequest() {
    return useMutation({
        mutationFn: (uuid: string) => cancelServiceRequest(uuid),
    });
}
