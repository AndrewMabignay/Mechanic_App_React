import { useMutation, useQuery } from "@tanstack/react-query";
import { cancelServiceRequest, getCurrentCyclistServiceRequest } from "../api/serviceRequestApi";

export function useCyclistCurrentServiceRequest() {
    return useQuery({
        queryKey: ["cyclist-current-service-request"],
        queryFn: getCurrentCyclistServiceRequest,
        refetchInterval: 3000,
        retry: false,
    });
}

export function useCancelServiceRequest() {
    return useMutation({
        mutationFn: (uuid: string) => cancelServiceRequest(uuid),
    });
}