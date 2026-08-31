import api from "../../../api/axios";

import type { RequestMechanicFormData } from "../schemas/requestMechanicSchema";
import type { ServiceRequestResponse } from "../types/serviceRequest";

export const createServiceRequest = async (
    data: RequestMechanicFormData,
): Promise<ServiceRequestResponse> => {
    const formData = new FormData();

    formData.append("bike_problem_id", String(data.bike_problem));
    formData.append("description", data.description);
    formData.append("location_lat", String(data.location_lat));
    formData.append("location_lng", String(data.location_lng));

    console.log("FormData:");

    for (const [key, value] of formData.entries()) {
        console.log(key, value);
    }

    const response = await api.post("/service-requests", formData);

    return response.data;
};