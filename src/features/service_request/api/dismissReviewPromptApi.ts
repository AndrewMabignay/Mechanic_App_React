import api from "../../../api/axios";

export const dismissReviewPrompt = async (serviceRequestUuid: string) => {
    const response = await api.patch(
        `/service-requests/${serviceRequestUuid}/dismiss-review`,
    );

    return response.data;
};