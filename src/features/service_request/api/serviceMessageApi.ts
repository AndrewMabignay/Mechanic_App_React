import api from "../../../api/axios";

import type { ServiceMessageResponse, ServiceMessagesResponse } from "../types/serviceMessage";

export async function getServiceMessages(
    serviceRequestUuid: string,
): Promise<ServiceMessagesResponse> {
    const response = await api.get<ServiceMessagesResponse>(
        `/service-requests/${serviceRequestUuid}/messages`,
    );

    return response.data;
}

export async function sendServiceMessage(
    serviceRequestUuid: string,
    message: string,
): Promise<ServiceMessageResponse> {
    const response = await api.post<ServiceMessageResponse>(
        `/service-requests/${serviceRequestUuid}/messages`,
        {
            message,
        },
    );

    return response.data;
}