import api from "../../../api/axios";
import type { RegisterFormData } from "../schemas/registerSchema";
import type {
    LoginFormData,
    LoginResponse,
    MessageResponse,
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
    const formData = new FormData();

    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("middle_name", data.middle_name ?? "");
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    formData.append("phone", data.phone);
    formData.append("role", data.role);

    if (data.profile_picture) {
        formData.append("profile_picture", data.profile_picture);
    }
    const response = await api.post("/register", formData);

    return response.data;
};

// Verify Register OTP
export const verifyRegisterOtp = async (
    data: VerifyOtpData,
): Promise<VerifyOtpResponse> => {
    console.log("📤 Sending OTP verification request:", {
        email: data.email,
        otp: data.otp,
    });

    const response = await api.post("/register/verify-otp", data);

    console.log("✅ OTP verification response:", response.data);

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
