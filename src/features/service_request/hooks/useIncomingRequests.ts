import { useQuery } from "@tanstack/react-query";
import { getIncomingRequests } from "../api/incomingRequestApi";

export function useIncomingRequests() {
    return useQuery({
        queryKey: ["incoming-requests"],
        queryFn: getIncomingRequests,
    });
}