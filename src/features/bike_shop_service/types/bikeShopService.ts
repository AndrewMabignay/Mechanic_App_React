export interface BikeShopService {
    uuid: string;
    bike_shop_id: number;
    name: string;
    description: string;
    price: number;
    estimated_duration: number;
    is_available: boolean;
}

export interface CreateAndUpdateBikeShopServiceFormData {
    bike_shop_id: number;
    name: string;
    description: string;
    price: number;
    estimated_duration: number;
    is_available: boolean;
}