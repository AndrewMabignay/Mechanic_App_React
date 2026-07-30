import api from "../../../api/axios";
import type { MechanicProfileFormData } from "../schemas/mechanicProfileSchema";

// DISPLAY MECHANIC PROFILE API
export const getMechanicProfile = async () => {
    const response = await api.get('/mechanic-profile/me');
    return response.data;
};

// CREATE MECHANIC PROFILE API
export const createMechanicProfile = async (data: MechanicProfileFormData) => {
    return await api.post('/mechanic-profile', data);
};

// UPDATE MECHANIC PROFILE API
export const updateMechanicProfile = async (
    uuid: string,
    data: Partial<MechanicProfileFormData>,
) => {
    return await api.put(`/mechanic-profile/${uuid}`, data);
};