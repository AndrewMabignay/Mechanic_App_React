import api from "../../../api/axios";
import type { LoginFormData, LoginResponse, RegisterFormData, RegisterResponse } from "../types/types";

// Login
export const login = async (
    data: LoginFormData
): Promise<LoginResponse> => {
    const response = await api.post("/login", data);

    return response.data;
};

// Register
export const register = async (
    data: RegisterFormData
): Promise<RegisterResponse> => {
    const response = await api.post("/register", data);

    return response.data;
};