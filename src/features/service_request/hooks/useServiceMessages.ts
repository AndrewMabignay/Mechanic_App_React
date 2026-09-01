import { useMutation, useQuery } from "@tanstack/react-query";

import { getServiceMessages, sendServiceMessage } from "../api/serviceMessageApi";

export function useServiceMessages(serviceRequestUuid?: string) {
    return useQuery({
        queryKey: ["service-messages", serviceRequestUuid],
        queryFn: () => getServiceMessages(serviceRequestUuid!),
        enabled: !!serviceRequestUuid,
    });
}

export function useSendServiceMessage() {
    return useMutation({
        mutationFn: ({
            serviceRequestUuid,
            message,
        }: {
            serviceRequestUuid: string;
            message: string;
        }) => sendServiceMessage(serviceRequestUuid, message),
    });
}