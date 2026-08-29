import api from "../../../api/axios";
import type { MechanicCurrentServiceRequestResponse } from "../types/mechanicCurrentServiceRequest";

export const getMechanicCurrentServiceRequest =
    async (): Promise<MechanicCurrentServiceRequestResponse> => {
        const response = await api.get(
            "/service-requests/mechanics/current-service-request"
        );

        return response.data;
    };