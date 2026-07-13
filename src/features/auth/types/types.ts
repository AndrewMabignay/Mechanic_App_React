export interface LoginFormData {
    email: string;
    password: string;
};

export interface LoginResponse {
    user: {
        uuid: string;
        first_name: string;
        last_name: string;
        middle_name?: string;
        email: string;
        phone: string;
        role: string;
    };
    token: string;
};

export interface RegisterFormData {
    first_name: string;
    last_name: string;
    middle_name?: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
    role: "cyclist" | "mechanic" | "cyclist_mechanic" | "bike_shop_owner";
};

export interface RegisterResponse {
    user: {
        uuid: string;
        first_name: string;
        last_name: string;
        middle_name?: string;
        email: string;
        phone: string;
        role: string;
    };
    token: string;
};