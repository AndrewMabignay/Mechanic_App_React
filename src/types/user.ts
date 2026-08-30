export type UserRole = "cyclist" | "mechanic" | "cyclist_mechanic" | "admin";

export interface User {
    id: number;
    uuid: string;
    first_name: string;
    last_name: string;
    middle_name: string | null;
    email: string
    email_verified_at: string | null;
    phone: string;
    role: UserRole;
    profile_picture: string | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}