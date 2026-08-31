import { useMutation } from "@tanstack/react-query";
import type { RequestMechanicFormData } from "../schemas/requestMechanicSchema";
import { createServiceRequest } from "../api/serviceRequestApi";

export function useCreateServiceRequest() {
    return useMutation({
        mutationFn: (data: RequestMechanicFormData) =>
            createServiceRequest(data),
    });
}