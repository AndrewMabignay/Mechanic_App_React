import { useQuery } from "@tanstack/react-query";
import { getCyclistServiceRequestHistory } from "../api/cyclistRequestServiceHistoryApi";

export function useCyclistServiceRequestHistory({
    page,
    per_page,
}: {
    page: number;
    per_page: number;
}) {
    return useQuery({
        queryKey: ["cyclist-service-request-history", page, per_page],
        queryFn: () =>
            getCyclistServiceRequestHistory({
                page,
                per_page,
            }),
    });
}
