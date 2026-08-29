import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createServiceRequest } from "../api/serviceRequestApi";
import type { CreateServiceRequestFormData } from "../types/serviceRequest";

export function useCreateServiceRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateServiceRequestFormData) => createServiceRequest(data),
        
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["serviceRequests"],
            });
        },
    });
}