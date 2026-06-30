import { useNavigate } from "react-router-dom";
import { CardContent } from "../../components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { loginSchema, type LoginFormSchema } from "../../features/auth/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../../features/auth/hooks/useAuth";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function Login() {
    const navigate = useNavigate();
    
    const loginUserMutation = useLogin();

    const form = useForm<LoginFormSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "test@example.com",
            password: "123456",
        },
    });

    const loginMutation = useLogin();

    async function onSubmit(data: LoginFormSchema) {
        try {
            const response = await loginMutation.mutateAsync(data);

            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user))

            navigate("/users");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <form id="form-rhf" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                
                    {/* EMAIL */}
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

                    {/* PASSWORD */}
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
                                    autoComplete="current-password"
                                />
                                {fieldState.invalid && ( <FieldError errors={[fieldState.error]} /> )}
                            </Field>
                        )}
                    />
                </FieldGroup>
            </form>

            <CardContent>
                <Field orientation={"horizontal"}>
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
                        disabled={loginUserMutation.isPending}
                    >
                        {loginUserMutation.isPending ? "Logging in..." : "Login"}
                    </Button>
                </Field>
            </CardContent>
        </>
    );
}