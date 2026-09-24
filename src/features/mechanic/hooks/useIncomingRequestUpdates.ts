import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import echo from "@/lib/echo";

interface IncomingServiceRequestEvent {
    service_request_id: number;
    mechanic_id: number;
}

interface UseIncomingRequestUpdatesOptions {
    mechanicId?: number;
}

export function useIncomingRequestUpdates({
    mechanicId,
}: UseIncomingRequestUpdatesOptions) {
    const queryClient = useQueryClient();

    useEffect(() => {
        console.log("[Reverb] Mechanic ID:", mechanicId);

        if (!mechanicId) {
            console.log("[Reverb] No mechanic ID. Subscription skipped.");
            return;
        }

        const channelName = `mechanic.${mechanicId}`;

        console.log("[Reverb] Connecting:", channelName);

        const channel = echo.private(channelName);

        channel.subscribed(() => {
            console.log("[Reverb] Subscribed:", channelName);
        });

        channel.error((error: unknown) => {
            console.error("[Reverb] Incoming request channel error:", error);
        });

        channel.listen(
            ".incoming-service-request.created",
            async (event: IncomingServiceRequestEvent) => {
                console.log("[Reverb] New incoming service request:", event);

                await queryClient.refetchQueries({
                    queryKey: ["incoming-requests"],
                    type: "active",
                });

                console.log("[React Query] Incoming requests refetched");
            },
        );

        return () => {
            console.log("[Reverb] Leaving:", channelName);
            echo.leave(channelName);
        };
    }, [mechanicId, queryClient]);
}
