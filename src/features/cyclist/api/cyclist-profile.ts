import api from "../../../api/axios";
import type { CyclistProfileFormData } from "../schemas/cyclistProfileSchema";

// DISPLAY CYCLIST PROFILE API
export const getCyclistProfile = async () => {
    const response = await api.get("/cyclist-profile/me");
    return response.data;
};

// CREATE CYCLIST PROFILE API
export const createCyclistProfile = async (data: CyclistProfileFormData) => {
    return await api.post('/cyclist-profile', data);
};

// UPDATE CYCLIST PROFILE API
export const updateCyclistProfile = async (
    uuid: string,
    data: Partial<CyclistProfileFormData>,
) => {
    return await api.put(`/cyclist-profile/${uuid}`, data);
};

export async function hasCyclistProfile() {
    try {
        const response = await getCyclistProfile();

        return response !== null;

    } catch (error) {
        console.log(error);

        return false;
    }
}