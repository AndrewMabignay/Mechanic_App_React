import api from "../../../api/axios";
import type { RequestMechanicFormData } from "../schemas/requestMechanicSchema";

// CREATE MECHANIC SERVICE REQUEST
export const createCyclistRequestService = (data: RequestMechanicFormData) => {
    return api.post('/cyclists/request-service', data);
};