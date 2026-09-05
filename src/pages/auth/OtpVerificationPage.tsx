import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    useResendOtp,
    useVerifyLoginOtp,
    useVerifyRegisterOtp,
} from "../../features/auth/hooks/useAuth";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { hasCyclistProfile } from "../../features/cyclist/api/cyclist-profile";
import { hasMechanicProfile } from "../../features/mechanic/utils/mechanicProfile";

export default function OtpVerificationPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const { email, purpose } = location.state || {};

    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

    const verifyLoginMutation = useVerifyLoginOtp();
    const verifyRegisterMutation = useVerifyRegisterOtp();
    const resendMutation = useResendOtp();

    // OTP input change
    const handleOtpChange = (value: string, index: number) => {
        // Remove non-numeric characters
        const numbers = value.replace(/\D/g, "");

        // If user pasted multiple digits
        if (numbers.length > 1) {
            const newOtp = [...otp];

            numbers
                .slice(0, 6 - index)
                .split("")
                .forEach((digit, i) => {
                    newOtp[index + i] = digit;
                });

            setOtp(newOtp);

            // Focus last filled input
            const lastIndex = Math.min(index + numbers.length - 1, 5);

            document.getElementById(`otp-${lastIndex}`)?.focus();

            return;
        }

        // Normal single digit input
        const newOtp = [...otp];
        newOtp[index] = numbers;
        setOtp(newOtp);

        // Move to next input
        if (numbers && index < 5) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handlePaste = (
        e: React.ClipboardEvent<HTMLInputElement>,
        index: number,
    ) => {
        e.preventDefault();

        const pasted = e.clipboardData.getData("text").replace(/\D/g, "");

        if (!pasted) return;

        const newOtp = [...otp];

        pasted
            .slice(0, 6 - index)
            .split("")
            .forEach((digit, i) => {
                newOtp[index + i] = digit;
            });

        setOtp(newOtp);

        const lastIndex = Math.min(index + pasted.length - 1, 5);

        document.getElementById(`otp-${lastIndex}`)?.focus();
    };

    // Backspace behavior
    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number,
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const previousInput = document.getElementById(`otp-${index - 1}`);

            previousInput?.focus();
        }
    };

    async function handleVerify() {
        try {
            const otpCode = otp.join("");

            let response;

            if (purpose === "login") {
                response = await verifyLoginMutation.mutateAsync({
                    email,
                    otp: otpCode,
                });
            } else {
                response = await verifyRegisterMutation.mutateAsync({
                    email,
                    otp: otpCode,
                });
            }

            // SAVE AUTH DATA
            localStorage.setItem("bike_mechanic_token", response.token);
            localStorage.setItem(
                "bike_mechanic_user",
                JSON.stringify(response.user),
            );
            localStorage.setItem("bike_mechanic_role", response.user.role);

            // REDIRECT
            switch (response.user.role) {
                case "cyclist": {
                    const hasProfile = await hasCyclistProfile();

                    if (hasProfile) {
                        navigate("/cyclist");
                    } else {
                        navigate("/cyclist/create-profile");
                    }

                    break;
                }
                case "mechanic": {
                    const hasProfile = await hasMechanicProfile();

                    if (hasProfile) {
                        navigate("/mechanic");
                    } else {
                        navigate("/mechanic/create-profile");
                    }

                    break;
                }
                case "cyclist_mechanic":
                    navigate("/cyclist");
                    break;
                case "bike_shop_owner":
                    navigate("/shop/dashboard");
                    break;
                case "admin":
                    navigate("/admin");
                    break;
                default:
                    navigate("/login");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function handleResend() {
        try {
            await resendMutation.mutateAsync({
                email,
                purpose,
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div
                className="
                    min-h-screen
                    bg-gray-300
                    flex
                    justify-center
                    items-center
                    px-4
                "
            >
                <div
                    className="
                        bg-gray-100
                        shadow-lg
                        rounded-xl
                        p-8
                        w-full
                        max-w-sm
                    "
                >
                    <h1
                        className="
                            text-2xl
                            font-bold
                            text-center
                            mb-3
                        "
                    >
                        Verify OTP
                    </h1>

                    <p
                        className="
                            text-center
                            text-sm
                            text-gray-600
                            mb-6
                        "
                    >
                        Enter the 6-digit code sent to
                        <br />
                        {email}
                    </p>

                    <div
                        className="
                            flex
                            justify-center
                            gap-2
                            mb-6
                        "
                    >
                        {otp.map((digit, index) => (
                            <Input
                                key={index}
                                id={`otp-${index}`}
                                value={digit}
                                maxLength={1}
                                inputMode="numeric"
                                className="
                                    w-11
                                    h-12
                                    text-center
                                    text-xl
                                    font-bold
                                "
                                onChange={(e) =>
                                    handleOtpChange(e.target.value, index)
                                }
                                onPaste={(e) => handlePaste(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>

                    <Button
                        className="w-full"
                        onClick={handleVerify}
                        disabled={
                            verifyLoginMutation.isPending ||
                            verifyRegisterMutation.isPending
                        }
                    >
                        {verifyLoginMutation.isPending ||
                        verifyRegisterMutation.isPending
                            ? "Verifying..."
                            : "Verify OTP"}
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full mt-3"
                        onClick={handleResend}
                        disabled={resendMutation.isPending}
                    >
                        {resendMutation.isPending ? "Sending..." : "Resend OTP"}
                    </Button>
                </div>
            </div>
        </>
    );
}
