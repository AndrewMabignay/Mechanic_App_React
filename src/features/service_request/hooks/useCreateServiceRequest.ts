import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RequestMechanicFormData } from "../schemas/requestMechanicSchema";
import { createServiceRequest } from "../api/serviceRequestApi";

export function useCreateServiceRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: RequestMechanicFormData) =>
            createServiceRequest(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notifications"],
            });
        },
    });
}
