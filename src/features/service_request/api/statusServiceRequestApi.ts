import api from "../../../api/axios";
import type { ServiceRequestResponse } from "../schemas/serviceRequestResponseSchema";

export const acceptServiceRequest = async (
    uuid: string,
): Promise<ServiceRequestResponse> => {
    const response = await api.patch(`/service-requests/${uuid}/accepted`);

    return response.data;
};
