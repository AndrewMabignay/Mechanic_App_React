import { useQuery } from "@tanstack/react-query";
import { getIncomingRequests } from "../api/incomingRequestApi";

export function useIncomingRequests() {
    return useQuery({
        queryKey: ["incoming-requests"],
        queryFn: getIncomingRequests,
        refetchInterval: (query) => {
            const requests = query.state.data?.data ?? [];

            return requests.length > 0 ? false : 3000;
        },
    });
}
