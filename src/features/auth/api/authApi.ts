import api from "../../../api/axios";
import type {
    LoginFormData,
    LoginResponse,
    MessageResponse,
    RegisterFormData,
    RegisterResponse,
    ResendOtpData,
    VerifyOtpData,
    VerifyOtpResponse,
} from "../types/types";

// Login
export const login = async (data: LoginFormData): Promise<LoginResponse> => {
    const response = await api.post("/login", data);

    return response.data;
};

// Register
export const register = async (
    data: RegisterFormData,
): Promise<RegisterResponse> => {
    const response = await api.post("/register", data);

    return response.data;
};

// Verify Register OTP
export const verifyRegisterOtp = async (
    data: VerifyOtpData,
): Promise<VerifyOtpResponse> => {
    const response = await api.post("/register/verify-otp", data);

    return response.data;
};

// Verify Login OTP
export const verifyLoginOtp = async (
    data: VerifyOtpData,
): Promise<VerifyOtpResponse> => {
    const response = await api.post("/login/verify-otp", data);

    return response.data;
};

// Resend OTP
export const resendOtp = async (
    data: ResendOtpData,
): Promise<MessageResponse> => {
    const response = await api.post("/resend-otp", data);

    return response.data;
};

export const logout = async (): Promise<MessageResponse> => {
    const response = await api.post("/logout");

    return response.data;
};
