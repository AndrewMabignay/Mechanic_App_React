import api from "../../../api/axios";
import type { bikeShopServiceFormData } from "../schemas/bikeShopServiceSchema";

// DISPLAY BIKE SHOP SERVICES LIST ON ITS SPECIFIC OWNER
export const getBikeShopServices = (params = {}) => {
    return api.get('/bike-shop-services', { params });
};

// DISPLAY BIKE SHOP OPTIONS ON ITS SPECIFIC OWNER
export const getBikeShopOptions = () => {
    return api.get('/bike-shops/options');
};

// CREATE BIKE SHOP SERVICES ON ITS SPECIFIC OWNER
export const createBikeShopServices = (data: bikeShopServiceFormData) => {
    return api.post('/bike-shop-services', data);
};

// VIEW BIKE SHOP ON ITS SPECIFIC OWNER
// export const getBikeShopByUuid = async (uuid: string) => {
//     const response = await api.get(`/bike-shops/${uuid}`);
//     return response.data;
// };

// // UPDATE BIKE SHOP ON ITS SPECIFIC OWNER
// export const updateBikeShop = (
//     bikeShop: string,
//     data: Partial<BikeShopOwnerFormData>
// ) => {
//     return api.put(`/bike-shops/${bikeShop}`, data);
// };

// DELETE BIKE SHOP SERVICES ON ITS SPECIFIC OWNER
export const deleteBikeShopServices = (uuid: string) => {
    return api.delete(`/bike-shops/${uuid}`);
};