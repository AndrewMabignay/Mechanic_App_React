import api from "../../../api/axios";

interface UpdateMechanicLocationRequest {
    latitude: number;
    longitude: number;
}

export const updateMechanicLocation = async (
    data: UpdateMechanicLocationRequest
) => {
    const response = await api.patch(
        "/mechanic-profile/location",
        data
    );

    return response.data;
};