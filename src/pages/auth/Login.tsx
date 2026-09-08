import { Controller, useForm } from "react-hook-form";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "../../components/ui/field";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../features/auth/hooks/useAuth";
import {
    loginSchema,
    type LoginFormSchema,
} from "../../features/auth/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Bike } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();

    const form = useForm<LoginFormSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const loginMutation = useLogin();

    async function onSubmit(data: LoginFormSchema) {
        try {
            await loginMutation.mutateAsync(data);

            navigate("/verify-otp", {
                state: {
                    email: data.email,
                    purpose: "login",
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
                <div className="w-full rounded-xl border border-gray-200 bg-white px-6 py-8 shadow-sm sm:px-9">
                    {/* Header */}
                    <div className="mb-7">
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                            Sign in
                        </h1>

                        <p className="mt-2 text-sm text-gray-600">
                            Sign in to your Bike Mechanic account.
                        </p>
                    </div>

                    {/* Form */}
                    <form id="form-rhf" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            {/* Email */}
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-email">
                                            Email
                                        </FieldLabel>

                                        <Input
                                            {...field}
                                            id="form-rhf-email"
                                            type="email"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter your email"
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

                            {/* Password */}
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <div className="flex items-center justify-between">
                                            <FieldLabel htmlFor="form-rhf-password">
                                                Password
                                            </FieldLabel>

                                            {/* Uncomment when forgot password
                                            is implemented */}
                                            {/*
                                            <Link
                                                to="/forgot-password"
                                                className="text-xs font-medium text-[#fc4c02] hover:underline"
                                            >
                                                Forgot password?
                                            </Link>
                                            */}
                                        </div>

                                        <Input
                                            {...field}
                                            type="password"
                                            id="form-rhf-password"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter your password"
                                            autoComplete="current-password"
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

                            {/* Login Button */}
                            <Button
                                type="submit"
                                disabled={loginMutation.isPending}
                                className="
                                    mt-2
                                    h-11
                                    w-full
                                    rounded-md
                                    bg-[#fc4c02]
                                    font-medium
                                    text-white
                                    hover:bg-[#e64500]
                                "
                            >
                                {loginMutation.isPending
                                    ? "Signing in..."
                                    : "Sign in"}
                            </Button>
                        </FieldGroup>
                    </form>

                    {/* Divider */}
                    <div className="my-7 flex items-center gap-4">
                        <div className="h-px flex-1 bg-gray-200" />

                        <span className="text-xs text-gray-400">OR</span>

                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    {/* Register */}
                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-medium text-[#fc4c02] hover:underline"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-gray-400">
                    Secure access to your Bike Mechanic account.
                </p>
            </div>
        </div>
    );
}
