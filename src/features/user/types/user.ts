export interface User {
    uuid: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    email: string;
    phone: string;
    role: "admin" | "cyclist" | "mechanic" | "bike_shop_owner" | "cyclist_mechanic";
}

export interface UserFormData {
    first_name: string;
    last_name: string;
    middle_name?: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
    role: "admin" | "cyclist" | "mechanic" | "bike_shop_owner" | "cyclist_mechanic";
}

export interface CreateUserFormData {
    first_name: string;
    last_name: string;
    middle_name?: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
    role: "admin" | "cyclist" | "mechanic" | "bike_shop_owner" | "cyclist_mechanic";
}

export interface UpdateUserFormData {
    first_name: string;
    last_name: string;
    middle_name?: string;
    email: string;
    password?: string;
    password_confirmation?: string;
    phone: string;
    role: "admin" | "cyclist" | "mechanic" | "bike_shop_owner" | "cyclist_mechanic";
}