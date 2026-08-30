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
import { CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { useUpdateUserProfile } from "../hooks/useUser";
import { Loader2, Pencil } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog";
import { useState } from "react";

interface EditPersonalInformationDialogProps {
    user: User;
    profileQueryKey: string[];
}

export default function EditPersonalInformationDialog({
    user,
    profileQueryKey,
}: EditPersonalInformationDialogProps) {
    const [open, setOpen] = useState(false);
    const updateUserProfile = useUpdateUserProfile(profileQueryKey);

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
        try {
            await updateUserProfile.mutateAsync({
                profile: user.uuid,
                data: values,
            });

            setOpen(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant={"outline"}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle>Edit Profile Information</DialogTitle>
                        <DialogDescription>
                            Update your personal and contact information
                        </DialogDescription>
                    </DialogHeader>

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
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Last name */}
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
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Middle name */}
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
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-phone">
                                            Phone
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-phone"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter your phone #"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>
                    <CardContent>
                        <Field orientation="vertical">
                            <Button
                                type="submit"
                                form="form-rhf-user-profile"
                                disabled={updateUserProfile.isPending}
                            >
                                {updateUserProfile.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </Field>
                    </CardContent>
                </DialogContent>
            </Dialog>
        </>
    );
}
