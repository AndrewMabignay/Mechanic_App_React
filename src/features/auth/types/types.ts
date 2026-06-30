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