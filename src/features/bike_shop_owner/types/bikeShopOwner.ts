export interface BikeShop {
    uuid: string;
    name: string;
    description: string;
    address: string;
    latitude: number;
    longitude: number;
    phone: string;
    opening_time: string;
    closing_time: string;
    is_open: boolean;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

export interface PaginatedBikeShops {
    current_page: number;
    data: BikeShop[];
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

export interface CreateAndUpdateBikeShopFormData {
    name: string;
    description: string;
    address: string;
    latitude: number;
    longitude: number;
    phone: string;
    opening_time: string;
    closing_time: string;
    is_open: boolean;
}

export interface CreateBikeShopResponse {
    message: string;
    data: BikeShop;
}