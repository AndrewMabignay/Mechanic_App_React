import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptServiceRequest } from "../api/acceptServiceRequestApi";

export function useAcceptServiceRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: acceptServiceRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["incoming-requests"],
            });

            queryClient.invalidateQueries({
                queryKey: ["current-service-request"],
            });
        },
    });
}