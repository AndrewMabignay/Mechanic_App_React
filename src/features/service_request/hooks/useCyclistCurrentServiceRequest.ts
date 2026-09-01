import { useMutation, useQuery } from "@tanstack/react-query";

import {
    cancelServiceRequest,
    getCurrentCyclistServiceRequest,
} from "../api/serviceRequestApi";

export function useCyclistCurrentServiceRequest() {
    return useQuery({
        queryKey: ["cyclist-current-service-request"],

        queryFn: getCurrentCyclistServiceRequest,

        refetchInterval: (query) => {
            const data = query.state.data?.data;

            // No current service request
            // Stop polling.
            if (!data) {
                return false;
            }

            // Service is already finished.
            // Stop polling.
            if (
                data.status === "completed" ||
                data.status === "cancelled"
            ) {
                return false;
            }

            // Active service request.
            return 3000;
        },

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