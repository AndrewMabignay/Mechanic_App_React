import api from "../../../api/axios";
import type { CurrentServiceRequestResponse } from "../types/currentServiceRequest";

export const getCurrentServiceRequest = async (): Promise<CurrentServiceRequestResponse> => {
    const response = await api.get("/service-requests/cyclists/current-service-request");

    return response.data;
};