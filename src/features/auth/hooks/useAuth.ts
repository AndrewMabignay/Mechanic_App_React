import { useMutation } from "@tanstack/react-query";
import {
    login,
    logout,
    register,
    resendOtp,
    verifyLoginOtp,
    verifyRegisterOtp,
} from "../api/authApi";

export const useLogin = () => {
    return useMutation({
        mutationFn: login,
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: register,
    });
};

// Verify Login OTP
export const useVerifyLoginOtp = () => {
    return useMutation({
        mutationFn: verifyLoginOtp,
    });
};

// Verify Register OTP
export const useVerifyRegisterOtp = () => {
    return useMutation({
        mutationFn: verifyRegisterOtp,
    });
};

// Resend OTP
export const useResendOtp = () => {
    return useMutation({
        mutationFn: resendOtp,
    });
};

// Logout
export const useLogout = () => {
    return useMutation({
        mutationFn: logout,
    });
};
