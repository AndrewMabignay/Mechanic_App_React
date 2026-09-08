import { Controller, useForm } from "react-hook-form";
import {
    registerSchema,
    type RegisterFormSchema,
} from "../../features/auth/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../../features/auth/hooks/useAuth";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { Bike, Check } from "lucide-react";

export default function Register() {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const form = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            middle_name: "",
            email: "",
            password: "",
            password_confirmation: "",
            phone: "",
            role: undefined,
        },
    });

    const registerMutation = useRegister();

    /**
     * Validate Step 1 fields before proceeding.
     */
    async function handleNext() {
        const isValid = await form.trigger([
            "first_name",
            "last_name",
            "middle_name",
            "email",
            "phone",
        ]);

        if (isValid) {
            setStep(2);
        }
    }

    /**
     * Return to Step 1.
     */
    function handleBack() {
        setStep(1);
    }

    /**
     * Submit registration.
     */
    async function onSubmit(data: RegisterFormSchema) {
        if (!captchaToken) {
            return;
        }

        try {
            await registerMutation.mutateAsync(data);

            navigate("/verify-otp", {
                state: {
                    email: data.email,
                    purpose: "register",
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

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
                <div className="w-full rounded-xl border border-gray-200 bg-white px-6 py-7 shadow-sm sm:px-8 sm:py-8">
                    {/* Header */}
                    <div className="mb-7">
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                            Create your account
                        </h1>

                        <p className="mt-2 text-sm text-gray-600">
                            Register to access Bike Mechanic services.
                        </p>
                    </div>

                    {/* Step Indicator */}
                    <div className="mb-8">
                        <div className="flex items-center">
                            {/* Step 1 */}
                            <div className="flex items-center gap-2">
                                <div
                                    className={`
                                        flex h-8 w-8 shrink-0 items-center justify-center
                                        rounded-full text-xs font-semibold
                                        transition-colors
                                        ${
                                            step === 1
                                                ? "bg-[#fc4c02] text-white"
                                                : "bg-[#fc4c02] text-white"
                                        }
                                    `}
                                >
                                    {step === 2 ? (
                                        <Check className="h-4 w-4" />
                                    ) : (
                                        "1"
                                    )}
                                </div>

                                <span
                                    className={`
                                        hidden text-sm font-medium sm:block
                                        ${
                                            step === 1
                                                ? "text-gray-900"
                                                : "text-gray-500"
                                        }
                                    `}
                                >
                                    Personal information
                                </span>
                            </div>

                            {/* Progress Line */}
                            <div
                                className={`
                                    mx-3 h-[2px] flex-1 transition-colors
                                    ${
                                        step === 2
                                            ? "bg-[#fc4c02]"
                                            : "bg-gray-200"
                                    }
                                `}
                            />

                            {/* Step 2 */}
                            <div className="flex items-center gap-2">
                                <div
                                    className={`
                                        flex h-8 w-8 shrink-0 items-center justify-center
                                        rounded-full text-xs font-semibold
                                        ${
                                            step === 2
                                                ? "bg-[#fc4c02] text-white"
                                                : "bg-gray-200 text-gray-500"
                                        }
                                    `}
                                >
                                    2
                                </div>

                                <span
                                    className={`
                                        hidden text-sm font-medium sm:block
                                        ${
                                            step === 2
                                                ? "text-gray-900"
                                                : "text-gray-500"
                                        }
                                    `}
                                >
                                    Account
                                </span>
                            </div>
                        </div>

                        <p className="mt-3 text-xs text-gray-500 sm:hidden">
                            Step {step} of 2
                        </p>
                    </div>

                    <form id="form-rhf" onSubmit={form.handleSubmit(onSubmit)}>
                        {/* =================================================
                            STEP 1
                        ================================================== */}
                        {step === 1 && (
                            <FieldGroup>
                                <div className="mb-1">
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Personal information
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Enter your basic information.
                                    </p>
                                </div>

                                {/* First Name + Last Name */}
                                <div className="grid gap-5 sm:grid-cols-2">
                                    {/* First Name */}
                                    <Controller
                                        name="first_name"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field
                                                data-invalid={
                                                    fieldState.invalid
                                                }
                                            >
                                                <FieldLabel htmlFor="first_name">
                                                    First name
                                                </FieldLabel>

                                                <Input
                                                    {...field}
                                                    id="first_name"
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                    placeholder="First name"
                                                    autoComplete="given-name"
                                                    className="
                                                        h-11
                                                        rounded-md
                                                        border-gray-300
                                                        focus-visible:border-[#fc4c02]
                                                        focus-visible:ring-[#fc4c02]
                                                    "
                                                />

                                                {fieldState.invalid && (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error,
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    />

                                    {/* Last Name */}
                                    <Controller
                                        name="last_name"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field
                                                data-invalid={
                                                    fieldState.invalid
                                                }
                                            >
                                                <FieldLabel htmlFor="last_name">
                                                    Last name
                                                </FieldLabel>

                                                <Input
                                                    {...field}
                                                    id="last_name"
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                    placeholder="Last name"
                                                    autoComplete="family-name"
                                                    className="
                                                        h-11
                                                        rounded-md
                                                        border-gray-300
                                                        focus-visible:border-[#fc4c02]
                                                        focus-visible:ring-[#fc4c02]
                                                    "
                                                />

                                                {fieldState.invalid && (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error,
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </div>

                                {/* Middle Name */}
                                <Controller
                                    name="middle_name"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor="middle_name">
                                                Middle name
                                                <span className="ml-1 text-gray-400">
                                                    (optional)
                                                </span>
                                            </FieldLabel>

                                            <Input
                                                {...field}
                                                id="middle_name"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                placeholder="Middle name"
                                                autoComplete="additional-name"
                                                className="
                                                    h-11
                                                    rounded-md
                                                    border-gray-300
                                                    focus-visible:border-[#fc4c02]
                                                    focus-visible:ring-[#fc4c02]
                                                "
                                            />

                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                {/* Email */}
                                <Controller
                                    name="email"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor="email">
                                                Email
                                            </FieldLabel>

                                            <Input
                                                {...field}
                                                id="email"
                                                type="email"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                placeholder="Email"
                                                autoComplete="email"
                                                className="
                                                    h-11
                                                    rounded-md
                                                    border-gray-300
                                                    focus-visible:border-[#fc4c02]
                                                    focus-visible:ring-[#fc4c02]
                                                "
                                            />

                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                {/* Phone */}
                                <Controller
                                    name="phone"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor="phone">
                                                Phone
                                            </FieldLabel>

                                            <Input
                                                {...field}
                                                id="phone"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                placeholder="09XXXXXXXXX"
                                                autoComplete="tel"
                                                className="
                                                    h-11
                                                    rounded-md
                                                    border-gray-300
                                                    focus-visible:border-[#fc4c02]
                                                    focus-visible:ring-[#fc4c02]
                                                "
                                            />

                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                {/* Next */}
                                <div className="mt-2 flex justify-end">
                                    <Button
                                        type="button"
                                        onClick={handleNext}
                                        className="
                                            h-11
                                            rounded-md
                                            bg-[#fc4c02]
                                            px-7
                                            font-medium
                                            text-white
                                            hover:bg-[#e64500]
                                        "
                                    >
                                        Next
                                    </Button>
                                </div>
                            </FieldGroup>
                        )}

                        {/* =================================================
                            STEP 2
                        ================================================== */}
                        {step === 2 && (
                            <FieldGroup>
                                <div className="mb-1">
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Account setup
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Create your password and choose your
                                        account type.
                                    </p>
                                </div>

                                {/* Password */}
                                <Controller
                                    name="password"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor="password">
                                                Password
                                            </FieldLabel>

                                            <Input
                                                {...field}
                                                id="password"
                                                type="password"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                placeholder="Password"
                                                autoComplete="new-password"
                                                className="
                                                    h-11
                                                    rounded-md
                                                    border-gray-300
                                                    focus-visible:border-[#fc4c02]
                                                    focus-visible:ring-[#fc4c02]
                                                "
                                            />

                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                {/* Confirm Password */}
                                <Controller
                                    name="password_confirmation"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor="password_confirmation">
                                                Confirm password
                                            </FieldLabel>

                                            <Input
                                                {...field}
                                                id="password_confirmation"
                                                type="password"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                placeholder="Confirm password"
                                                autoComplete="new-password"
                                                className="
                                                    h-11
                                                    rounded-md
                                                    border-gray-300
                                                    focus-visible:border-[#fc4c02]
                                                    focus-visible:ring-[#fc4c02]
                                                "
                                            />

                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                {/* Role */}
                                <Controller
                                    name="role"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor="role">
                                                Account type
                                            </FieldLabel>

                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger
                                                    id="role"
                                                    className="
                                                        h-11
                                                        rounded-md
                                                        border-gray-300
                                                        focus:ring-[#fc4c02]
                                                    "
                                                >
                                                    <SelectValue placeholder="Select account type" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="cyclist">
                                                        Cyclist
                                                    </SelectItem>

                                                    <SelectItem value="mechanic">
                                                        Mechanic
                                                    </SelectItem>

                                                    <SelectItem value="bike_shop_owner">
                                                        Bike Shop Owner
                                                    </SelectItem>

                                                    <SelectItem value="cyclist_mechanic">
                                                        Cyclist / Mechanic
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>

                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                {/* CAPTCHA */}
                                <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
                                    <div className="flex justify-center">
                                        <Turnstile
                                            siteKey={
                                                import.meta.env
                                                    .VITE_TURNSTILE_SITE_KEY
                                            }
                                            onSuccess={(token) => {
                                                setCaptchaToken(token);
                                            }}
                                            onExpire={() => {
                                                setCaptchaToken(null);
                                            }}
                                            onError={() => {
                                                setCaptchaToken(null);
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="mt-2 flex items-center justify-between">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={handleBack}
                                        disabled={registerMutation.isPending}
                                        className="font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    >
                                        Back
                                    </Button>

                                    <Button
                                        type="submit"
                                        disabled={
                                            registerMutation.isPending ||
                                            !captchaToken
                                        }
                                        className="
                                            h-11
                                            rounded-md
                                            bg-[#fc4c02]
                                            px-7
                                            font-medium
                                            text-white
                                            hover:bg-[#e64500]
                                        "
                                    >
                                        {registerMutation.isPending
                                            ? "Creating..."
                                            : "Create account"}
                                    </Button>
                                </div>
                            </FieldGroup>
                        )}
                    </form>
                </div>

                {/* Login */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-[#fc4c02] hover:underline"
                    >
                        Sign in
                    </Link>
                </p>

                <p className="mt-3 text-center text-xs text-gray-400">
                    By creating an account, you agree to our terms and
                    conditions.
                </p>
            </div>
        </div>
    );
}
