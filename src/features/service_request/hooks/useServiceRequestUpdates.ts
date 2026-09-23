import echo from "@/lib/echo";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface ServiceRequestUpdatedEvent {
    service_request: {
        id: number;
        uuid: string;
        status: string;
        cyclist_id: number;
        mechanic_id: number | null;
    };
}

interface UseServiceRequestUpdatesOptions {
    serviceRequestUuid?: string;
    queryKey: readonly unknown[];
}

export function useServiceRequestUpdates({
    serviceRequestUuid,
    queryKey,
}: UseServiceRequestUpdatesOptions) {
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!serviceRequestUuid) {
            return;
        }

        const channelName = `service-request.${serviceRequestUuid}`;

        console.log("[Reverb] Connecting:", channelName);

        const channel = echo.private(channelName);

        channel.subscribed(() => {
            console.log("[Reverb] Subscribed:", channelName);
        });

        channel.error((error: unknown) => {
            console.error("[Reverb] Channel error:", error);
        });

        channel.listen(
            ".service-request.updated",
            async (event: ServiceRequestUpdatedEvent) => {
                console.log("[Reverb] Received event:", event);

                console.log(
                    "[Reverb] Updated status:",
                    event.service_request.status,
                );

                await queryClient.refetchQueries({
                    queryKey,
                    type: "active",
                });

                console.log("[React Query] Refetch completed");
            },
        );

        return () => {
            console.log("[Reverb] Leaving:", channelName);

            echo.leave(channelName);
        };
    }, [serviceRequestUuid, queryClient, queryKey]);
}
