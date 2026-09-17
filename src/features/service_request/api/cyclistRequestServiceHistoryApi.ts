import api from "../../../api/axios";
import type { CyclistServiceRequestHistoryResponse } from "../types/cyclistHistory";

export const getCyclistServiceRequestHistory = async ({
    page,
    per_page,
}: {
    page: number;
    per_page: number;
}): Promise<CyclistServiceRequestHistoryResponse> => {
    const response = await api.get("/service-requests", {
        params: {
            page,
            per_page,
        },
    });

    return response.data;
};
