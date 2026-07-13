import { Controller, useForm } from "react-hook-form";
import { registerSchema, type RegisterFormSchema } from "../../features/auth/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../../features/auth/hooks/useAuth";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

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

    async function onSubmit(data: RegisterFormSchema) {
        try {

            const response = await registerMutation.mutateAsync(data);

            localStorage.setItem("bike_mechanic_token", response.token); 
            localStorage.setItem("bike_mechanic_user", JSON.stringify(response.user)); 
            localStorage.setItem("bike_mechanic_role", response.user.role);

            switch (response.user.role) {
                case "cyclist":
                    navigate("/cyclist");
                    break;
                case "bike_shop_owner":
                    navigate("/owner");
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

                            {/* First name */}
                            <Controller
                                name="first_name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-first-name">
                                            First name
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-first-name"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter your first name"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && ( <FieldError errors={[fieldState.error]} /> )}
                                    </Field>
                                )}
                            />

                            {/* Last name */}
                            <Controller
                                name="last_name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-last-name">
                                            Last name
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

                            {/* Middle name */}
                            <Controller
                                name="middle_name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-middle-name">
                                            Middle name
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-middle-name"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter your middle name"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && ( <FieldError errors={[fieldState.error]} /> )}
                                    </Field>
                                )}
                            />

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

                            {/* Password */}
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

                            {/* Confirm password */}
                            <Controller
                                name="password_confirmation"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-password-confirmation">
                                            Confirm password
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="password"
                                            id="form-rhf-password-confirmation"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Confirm your password"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && ( <FieldError errors={[fieldState.error]} /> )}
                                    </Field>
                                )}
                            />

                            {/* Phone */}
                            <Controller
                                name="phone"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-phone">
                                            Phone
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-phone"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Phone"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && ( <FieldError errors={[fieldState.error]} /> )}
                                    </Field>
                                )}
                            />

                            {/* Role */}
                            <Controller
                                name="role"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-role">
                                            Role
                                        </FieldLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger id="form-rhf-role" >
                                                <SelectValue placeholder="Select a role" />
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
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                        </FieldGroup>
                    </form>

                    <CardContent>
                        <Field orientation={"horizontal"} className="flex justify-between">
                            <Button
                                type="submit"
                                form="form-rhf"
                                disabled={registerMutation.isPending}
                                className="w-full"
                            >
                                {registerMutation.isPending ? "Signing up..." : "Register"}
                            </Button>
                        </Field>
                    </CardContent>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}