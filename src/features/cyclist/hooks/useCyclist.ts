import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateCyclistRequestServiceData } from "../types/cyclist";
import { createCyclistRequestService } from "../api/cyclistApi";

export const useCreateCyclistRequestService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateCyclistRequestServiceData) => createCyclistRequestService(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cyclist-request-services"],
            });
        },
    });
};