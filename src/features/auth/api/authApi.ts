import api from "../../../api/axios";
import type { LoginFormData, LoginResponse } from "../types/types";

export const login = async (
    data: LoginFormData
): Promise<LoginResponse> => {
    const response = await api.post("/login", data);

    return response.data;
};