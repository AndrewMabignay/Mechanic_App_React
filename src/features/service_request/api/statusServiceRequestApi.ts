import api from "../../../api/axios";
import type { ServiceRequestResponse } from "../schemas/serviceRequestResponseSchema";

// Service request actions
export const acceptServiceRequest = async (
    uuid: string,
): Promise<ServiceRequestResponse> => {
    const response = await api.patch(`/service-requests/${uuid}/accepted`);

    return response.data;
};

export const enRouteServiceRequest = async (
    uuid: string,
): Promise<ServiceRequestResponse> => {
    const response = await api.patch(`/service-requests/${uuid}/en-route`);

    return response.data;
};

export const inProgressServiceRequest = async (
    uuid: string,
): Promise<ServiceRequestResponse> => {
    const response = await api.patch(`/service-requests/${uuid}/in-progress`);

    return response.data;
};

export const completeServiceRequest = async (
    uuid: string,
): Promise<ServiceRequestResponse> => {
    const response = await api.patch(`/service-requests/${uuid}/completed`);

    return response.data;
};
