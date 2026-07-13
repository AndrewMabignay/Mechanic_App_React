import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../components/ui/field";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../features/auth/hooks/useAuth";
import { loginSchema, type LoginFormSchema } from "../../features/auth/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

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

            const response = await loginMutation.mutateAsync(data);

            console.log(response);

            localStorage.setItem("bike_mechanic_token", response.token); 
            localStorage.setItem("bike_mechanic_user", JSON.stringify(response.user)); 
            localStorage.setItem("bike_mechanic_role", response.user.role); 

            switch (response.user.role) {
                case "cyclist":
                    navigate("/cyclist");
                    break;
                default:
                    navigate("/login");
            }
        } catch (error) {
            
            console.error(error);
        }
    }

    return (
        <>
            <div className="
                min-h-screen 
                bg-gray-300 
                text-gray-800
                flex justify-center items-center
                px-4
            ">
                <div className="
                    w-full
                    max-w-sm
                    md:max-w-lg
                    bg-gray-100
                    shadow-lg
                    rounded-xl
                    p-6
                    md:p-8
                    flex flex-col gap-6
                ">
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
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter your email"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && ( <FieldError errors={[fieldState.error]} /> )}
                                    </Field>
                                )}
                            />

                            {/* Passord */}
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-password">
                                            Password
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="password"
                                            id="form-rhf-password"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter your password"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && ( <FieldError errors={[fieldState.error]} /> )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>

                    <CardContent>
                        <Field orientation={"horizontal"} className="flex justify-between">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => form.reset()}
                            >
                                Reset
                            </Button>
                            <Button
                                type="submit"
                                form="form-rhf"
                                disabled={loginMutation.isPending}
                            >
                                {loginMutation.isPending ? "Logging in..." : "Login"}
                            </Button>
                        </Field>
                    </CardContent>

                    <p className="text-center text-sm text-gray-600">
                        No account yet? Create one now!{" "}
                        <Link
                            to="/register"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}