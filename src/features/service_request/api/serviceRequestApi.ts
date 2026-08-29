import api from "../../../api/axios";
import type { ServiceRequestResponse } from "../schemas/serviceRequestResponseSchema";
import type { ServiceRequestFormData } from "../schemas/serviceRequestSchema";

export const createServiceRequest = async (data: ServiceRequestFormData): Promise<ServiceRequestResponse> => {
    const response = await api.post("/service-requests", data);

    return response.data;
};