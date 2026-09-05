import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dismissReviewPrompt } from "../api/dismissReviewPromptApi";

export function useDismissReviewPrompt() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (serviceRequestUuid: string) =>
            dismissReviewPrompt(serviceRequestUuid),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cyclist-current-service-request"],
            });
        },
    });

    return {
        dismissReviewPrompt: mutation.mutateAsync,
        isDismissing: mutation.isPending,
    };
}