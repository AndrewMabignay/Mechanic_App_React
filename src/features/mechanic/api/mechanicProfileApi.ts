import api from "../../../api/axios";
import type { MechanicProfileFormData } from "../schemas/mechanicProfileSchema";
import type {
    MechanicProfileResponse,
    UpdateMechanicLocationRequest,
} from "../types/mechanicProfile";

// DISPLAY MECHANIC PROFILE API
export const getMechanicProfile = async () => {
    const response = await api.get("/mechanic-profile/me");
    return response.data;
};

// CREATE MECHANIC PROFILE API
export const createMechanicProfile = async (data: MechanicProfileFormData) => {
    return await api.post("/mechanic-profile", data);
};

// UPDATE MECHANIC PROFILE API
export const updateMechanicProfile = async (
    uuid: string,
    data: Partial<MechanicProfileFormData>,
) => {
    return await api.put(`/mechanic-profile/${uuid}`, data);
};

// Toggles the mechanic's availability status by UUID.
export const updateMechanicAvailability = async (
    uuid: string,
): Promise<MechanicProfileResponse> => {
    const response = await api.patch(`/mechanic-profile/${uuid}/availability`);

    return response.data;
};

export const updateMechanicLocation = async (
    data: UpdateMechanicLocationRequest,
) => {
    const response = await api.patch("/mechanic-profile/location", data);

    return response.data;
};
