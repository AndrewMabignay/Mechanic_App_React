import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    personalInformationSchema,
    type PersonalInformationFormData,
} from "../schemas/userSchema";
import type { User } from "../types/user";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";

interface EditPersonalInformationDialogProps {
    user: User;
    // onSave: (data: PersonalInformationFormData) => void;
}

export default function EditPersonalInformationDialog({
    user,
}: EditPersonalInformationDialogProps) {
    const form = useForm({
        resolver: zodResolver(personalInformationSchema),
        defaultValues: {
            first_name: user.first_name ?? "",
            middle_name: user.middle_name ?? "",
            last_name: user.last_name ?? "",
            email: user.email ?? "",
            phone: user.phone ?? "",
        },
    });

    async function onSubmit(values: PersonalInformationFormData) {
        console.log("Submitted");
    }

    return (
        <>
            <form
                id="form-rhf-user-profile"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FieldGroup>
                    {/* First name */}
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
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {/* Last name */}
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
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
            </form>
        </>
    );
}
