import api from "../../../api/axios";

import type {
    SubmitRatingPayload,
    SubmitRatingResponse,
} from "../types/serviceRequestRating";

export async function submitServiceRequestRating(
    serviceRequestUuid: string,
    payload: SubmitRatingPayload,
): Promise<SubmitRatingResponse> {
    const response = await api.post<SubmitRatingResponse>(
        `/service-requests/${serviceRequestUuid}/rating`,
        payload,
    );

    return response.data;
}