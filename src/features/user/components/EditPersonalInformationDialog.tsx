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
import { Camera, Loader2, Pencil } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog";
import { useState } from "react";
import { getImageUrl } from "../../../lib/imageUrl";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../../components/ui/avatar";

interface EditPersonalInformationDialogProps {
    user: User;
    profileQueryKey: string[];
}

export default function EditPersonalInformationDialog({
    user,
    profileQueryKey,
}: EditPersonalInformationDialogProps) {
    const [open, setOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(
        getImageUrl(user.profile_picture),
    );
    const updateUserProfile = useUpdateUserProfile(profileQueryKey);

    const form = useForm({
        resolver: zodResolver(personalInformationSchema),
        defaultValues: {
            first_name: user.first_name ?? "",
            middle_name: user.middle_name ?? "",
            last_name: user.last_name ?? "",
            email: user.email ?? "",
            phone: user.phone ?? "",
            profile_picture: undefined,
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
            <Dialog
                open={open}
                onOpenChange={(isOpen) => {
                    setOpen(isOpen);

                    if (isOpen) {
                        form.reset({
                            first_name: user.first_name ?? "",
                            middle_name: user.middle_name ?? "",
                            last_name: user.last_name ?? "",
                            email: user.email ?? "",
                            phone: user.phone ?? "",
                        });

                        setPreviewImage(getImageUrl(user.profile_picture));
                    }
                }}
            >
                <DialogTrigger asChild>
                    <Button variant={"outline"}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-[550px] overflow-y-auto">
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
                        <div className="flex justify-center">
                            <label
                                htmlFor="profile-picture"
                                className="group relative cursor-pointer"
                            >
                                <Avatar className="h-24 w-24 border-4 border-white shadow-md dark:border-[#1E1E1E]">
                                    <AvatarImage
                                        src={previewImage}
                                        alt="Profile picture"
                                    />

                                    <AvatarFallback className="bg-[#F8FAFC] text-xl font-semibold text-[#374151] dark:bg-[#252525] dark:text-[#F9FAFB]">
                                        {user.first_name?.charAt(0)}
                                        {user.last_name?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                    <Camera className="h-6 w-6 text-white" />
                                </div>

                                <input
                                    id="profile-picture"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    className="hidden"
                                    onChange={(event) => {
                                        const file = event.target.files?.[0];

                                        if (!file) return;

                                        form.setValue("profile_picture", file, {
                                            shouldValidate: true,
                                        });

                                        setPreviewImage(
                                            URL.createObjectURL(file),
                                        );
                                    }}
                                />
                            </label>
                        </div>

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
