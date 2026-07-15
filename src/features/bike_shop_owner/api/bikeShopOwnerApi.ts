import api from "../../../api/axios";
import type { BikeShopOwnerFormData } from "../schemas/bikeShopOwnerSchema";

// DISPLAY BIKE SHOPS LIST ON ITS SPECIFIC OWNER
export const getBikeShops = (params?: { page: number }) => {
    return api.get("/bike-shops/me", {
        params,
    });
};

// CREATE BIKE SHOP ON ITS SPECIFIC OWNER
export const createBikeShop = (data: BikeShopOwnerFormData) => {
    return api.post('/bike-shops', data);
};

// VIEW BIKE SHOP ON ITS SPECIFIC OWNER
export const getBikeShopByUuid = async (uuid: string) => {
    const response = await api.get(`/bike-shops/${uuid}`);
    return response.data;
};

// UPDATE BIKE SHOP ON ITS SPECIFIC OWNER
export const updateBikeShop = (
    bikeShop: string,
    data: Partial<BikeShopOwnerFormData>
) => {
    return api.put(`/bike-shops/${bikeShop}`, data);
};

// DESTROY BIKE SHOP ON ITS SPECIFIC OWNER
export const deleteBikeShop = (uuid: string) => {
    return api.delete(`/bike-shops/${uuid}`);
};