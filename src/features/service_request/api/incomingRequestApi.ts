import api from "../../../api/axios";
import type { IncomingRequestResponse } from "../types/incomingRequest";

export const getIncomingRequests =
    async (): Promise<IncomingRequestResponse> => {
        const response = await api.get(
            "/service-requests/mechanics"
        );

        return response.data;
    };