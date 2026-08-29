import api from "../../../api/axios";
import type { CurrentServiceRequestResponse } from "../types/currentServiceRequest";

export const acceptServiceRequest = async (
    uuid: string
): Promise<CurrentServiceRequestResponse> => {
    const response = await api.patch(
        `/service-requests/${uuid}/accepted`
    );

    return response.data;
};