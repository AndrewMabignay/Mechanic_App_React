import api from "../../../api/axios";

import type { NotificationResponse } from "../types/notification";

export const notifications = async (): Promise<NotificationResponse> => {
    const response = await api.get("/notifications");

    return response.data;
};

export const markAsRead = async (
    uuid: string,
): Promise<NotificationResponse> => {
    const response = await api.patch(`/notifications/${uuid}/mark-as-read`);

    return response.data;
};

export const markAsAllRead = async (): Promise<NotificationResponse> => {
    const response = await api.patch(`/notifications/mark-all-as-read`);

    return response.data;
};
