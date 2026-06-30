"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "../types/user";
import { useCreateUser, useUpdateUser } from "../hooks/useUser";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../../components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

const getFormSchema = (isEdit: boolean) => z.object({
    first_name: z
        .string()
        .min(1, 'First name is required')
        .max(255),

    last_name: z
        .string()
        .min(1, "Last name is required")
        .max(255),
    
    middle_name: z
        .string()
        .max(255)
        .optional()
        .or(z.literal("")),
    
    email: z
        .email("Invalid email address")
        .max(255),

    password: isEdit
        ? z.string().optional().or(z.literal(""))
        : z.string().min(8, "Password must be at least 8 characters"),

    password_confirmation: isEdit
        ? z.string().optional().or(z.literal(""))
        : z.string(),

    phone: z
        .string()
        .max(20),

    role: z.enum(["admin", "cyclist", "mechanic", "bike_shop_owner", "cyclist_mechanic"]),
})
.refine(
    (data) => {
        if (isEdit && !data.password) {
            return true;
        }

        return data.password === data.password_confirmation;
    },
    {
        message: "Password do not match",
        path: ["password_confirmation"],
    }
);

type UserFormProps = {
    user?: User | null;
};

export default function UserForm({
    user,
}: UserFormProps) {
    const isEdit = !!user;

    const createUserMutation = useCreateUser();
    const updateUserMutation = useUpdateUser();

    const form = useForm({
        resolver: zodResolver(getFormSchema(isEdit)),
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

    async function onSubmit(data: z.infer<ReturnType<typeof getFormSchema>>) {
        try {
            if (user?.uuid) {
                const payload = { ...data };

                if (!payload.password) {
                    delete payload.password;
                    delete payload.password_confirmation;
                }

                await updateUserMutation.mutateAsync({
                    user: user.uuid,
                    data: payload,
                });
            } else {
                await createUserMutation.mutateAsync({
                    ...data,
                    password: data.password as string,
                    password_confirmation: data.password_confirmation as string,
                });
            }

            form.reset();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <form id="form-rhf" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>

                    {/* FIRST NAME */}
                    <Controller
                        name="first_name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-firstName">
                                    First Name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-firstName"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your first name"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && ( <FieldError errors={[fieldState.error]} /> )}
                            </Field>
                        )}
                    />

                    {/* LAST NAME */}
                    <Controller
                        name="last_name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-lastName">
                                    Last Name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-lastName"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your last name"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && ( <FieldError errors={[fieldState.error]} /> )}
                            </Field>
                        )}
                    />

                    {/* MIDDLE NAME */}
                    <Controller
                        name="middle_name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-middleName">
                                    Middle Name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-middleName"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your middle name"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && ( <FieldError errors={[fieldState.error]} /> )}
                            </Field>
                        )}
                    />

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
                                    id="form-rhf-password"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your password"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && ( <FieldError errors={[fieldState.error]} /> )}
                            </Field>
                        )}
                    />

                    {/* PASSWORD CONFIRMATION */}
                    <Controller
                        name="password_confirmation"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-password_confirmation">
                                    Confirm Password
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-password_confirmation"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Confirm your password"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && ( <FieldError errors={[fieldState.error]} /> )}
                            </Field>
                        )}
                    />

                    {/* PHONE */}
                    <Controller
                        name="phone"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-phone">
                                    Confirm Password
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-phone"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your phone #"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && ( <FieldError errors={[fieldState.error]} /> )}
                            </Field>
                        )}
                    />

                    {/* ROLE */}
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
                                        <SelectItem value="admin">
                                            Admin
                                        </SelectItem>
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
                <Field orientation="horizontal">
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
                        disabled={createUserMutation.isPending}
                    >
                        {createUserMutation.isPending ? "Saving..." : "Save Changes"}
                    </Button>
                </Field>
            </CardContent>
        </>
    );
}