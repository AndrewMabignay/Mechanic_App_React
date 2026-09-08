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
import { Bike } from "lucide-react";

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

        // Handle pasted/multiple digits
        if (numbers.length > 1) {
            const newOtp = [...otp];

            numbers
                .slice(0, 6 - index)
                .split("")
                .forEach((digit, i) => {
                    newOtp[index + i] = digit;
                });

            setOtp(newOtp);

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

    // OTP paste
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
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    async function handleVerify() {
        const otpCode = otp.join("");

        if (otpCode.length !== 6) {
            return;
        }

        try {
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

            // Save authentication data
            localStorage.setItem("bike_mechanic_token", response.token);

            localStorage.setItem(
                "bike_mechanic_user",
                JSON.stringify(response.user),
            );

            localStorage.setItem("bike_mechanic_role", response.user.role);

            // Redirect based on role
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

            // Clear current OTP after successful resend
            setOtp(["", "", "", "", "", ""]);

            document.getElementById("otp-0")?.focus();
        } catch (error) {
            console.error(error);
        }
    }

    const isVerifying =
        verifyLoginMutation.isPending || verifyRegisterMutation.isPending;

    const isComplete = otp.every((digit) => digit !== "");

    return (
        <div className="min-h-screen bg-[#f8f9fa] px-4 py-8 sm:py-12">
            <div className="mx-auto flex w-full max-w-lg flex-col items-center">
                {/* Logo / Brand */}
                <div className="mb-6 flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fc4c02]">
                        <Bike className="h-5 w-5 text-white" />
                    </div>

                    <span className="text-lg font-semibold tracking-tight text-gray-900">
                        Bike Mechanic
                    </span>
                </div>

                {/* Card */}
                <div
                    className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    px-6
                    py-8
                    shadow-sm
                    sm:px-9
                "
                >
                    {/* Header */}
                    <div className="text-center">
                        <h1
                            className="
                            text-2xl
                            font-semibold
                            tracking-tight
                            text-gray-900
                        "
                        >
                            Verify your email
                        </h1>

                        <p
                            className="
                            mt-2
                            text-sm
                            leading-6
                            text-gray-600
                        "
                        >
                            Enter the 6-digit verification code
                            <br className="hidden sm:block" /> sent to
                        </p>

                        <p
                            className="
                            mt-1
                            break-all
                            text-sm
                            font-medium
                            text-gray-900
                        "
                        >
                            {email}
                        </p>
                    </div>

                    {/* OTP Inputs */}
                    <div className="mt-8 flex justify-center gap-2 sm:gap-3">
                        {otp.map((digit, index) => (
                            <Input
                                key={index}
                                id={`otp-${index}`}
                                value={digit}
                                maxLength={1}
                                inputMode="numeric"
                                autoComplete={
                                    index === 0 ? "one-time-code" : "off"
                                }
                                aria-label={`OTP digit ${index + 1}`}
                                className="
                                    h-12
                                    w-10
                                    rounded-md
                                    border-gray-300
                                    bg-white
                                    text-center
                                    text-xl
                                    font-semibold
                                    text-gray-900
                                    focus-visible:border-[#fc4c02]
                                    focus-visible:ring-[#fc4c02]
                                    sm:h-13
                                    sm:w-12
                                "
                                onChange={(e) =>
                                    handleOtpChange(e.target.value, index)
                                }
                                onPaste={(e) => handlePaste(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>

                    {/* Verify Button */}
                    <Button
                        type="button"
                        onClick={handleVerify}
                        disabled={isVerifying || !isComplete}
                        className="
                            mt-7
                            h-11
                            w-full
                            rounded-md
                            bg-[#fc4c02]
                            font-medium
                            text-white
                            hover:bg-[#e64500]
                            disabled:opacity-50
                        "
                    >
                        {isVerifying ? "Verifying..." : "Verify code"}
                    </Button>

                    {/* Resend */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Didn't receive the code?
                        </p>

                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleResend}
                            disabled={resendMutation.isPending}
                            className="
                                mt-1
                                h-auto
                                px-2
                                py-1
                                font-medium
                                text-[#fc4c02]
                                hover:bg-orange-50
                                hover:text-[#e64500]
                            "
                        >
                            {resendMutation.isPending
                                ? "Sending..."
                                : "Resend code"}
                        </Button>
                    </div>
                </div>

                {/* Footer */}
                <p
                    className="
                    mt-6
                    text-center
                    text-xs
                    text-gray-400
                "
                >
                    Your verification code will expire for security purposes.
                </p>
            </div>
        </div>
    );
}
