import { useEffect, useState } from "react";
import type { CyclistProfile } from "../types/cyclist";
import { useUpdateCyclistProfile } from "../hooks/useCyclistProfile";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    cyclistProfileSchema,
    type CyclistProfileFormData,
} from "../schemas/cyclistProfileSchema";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Loader2, Pencil } from "lucide-react";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import MapComponent from "../../../components/Map";
import { CardContent } from "../../../components/ui/card";

interface EditCyclistProfileDialogProps {
    profile: CyclistProfile;
}

export default function EditCyclistProfileDialog({
    profile,
}: EditCyclistProfileDialogProps) {
    const [open, setOpen] = useState(false);
    const updateCyclistProfile = useUpdateCyclistProfile();

    const form = useForm({
        resolver: zodResolver(cyclistProfileSchema),
        defaultValues: {
            emergency_contact: profile.emergency_contact ?? "",
            default_location_lat: profile.default_location_lat ?? "",
            default_location_lng: profile.default_location_lng ?? "",
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({
                emergency_contact: profile.emergency_contact ?? "",
                default_location_lat: profile.default_location_lat ?? "",
                default_location_lng: profile.default_location_lng ?? "",
            });
        }
    }, [open, profile, form]);

    const [selectedLocation, setSelectedLocation] = useState({
        latitude: Number(profile.default_location_lat),
        longitude: Number(profile.default_location_lng),
    });

    async function onSubmit(values: CyclistProfileFormData) {
        try {
            await updateCyclistProfile.mutateAsync({
                uuid: profile.uuid,
                data: {
                    ...values,
                    default_location_lat: selectedLocation.latitude,
                    default_location_lng: selectedLocation.longitude,
                },
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
                        Edit Profile
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle>
                            Edit Cyclist Profile Information
                        </DialogTitle>
                        <DialogDescription>
                            Update your location and emergency contact
                            information
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        id="form-rhf-cyclist-profile"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FieldGroup>
                            {/* Emergency Contact # */}
                            <Controller
                                name="emergency_contact"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-emergencyContact">
                                            Emergency Contact
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-emergencyContact"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter your emergency contact #"
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

                            <div className="space-y-2">
                                <FieldLabel>Default Location</FieldLabel>

                                <div className="h-[300px] overflow-hidden rounded-lg border">
                                    <MapComponent
                                        latitude={selectedLocation.latitude}
                                        longitude={selectedLocation.longitude}
                                        onLocationSelect={(
                                            latitude,
                                            longitude,
                                        ) => {
                                            setSelectedLocation({
                                                latitude,
                                                longitude,
                                            });
                                        }}
                                    />
                                </div>

                                <p className="text-xs text-muted-foreground">
                                    Click the map to select your location.
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    {selectedLocation.latitude.toFixed(6)},{" "}
                                    {selectedLocation.longitude.toFixed(6)}
                                </p>
                            </div>
                        </FieldGroup>
                    </form>
                    <CardContent>
                        <Field orientation="vertical">
                            <Button
                                type="submit"
                                form="form-rhf-cyclist-profile"
                                disabled={updateCyclistProfile.isPending}
                            >
                                {updateCyclistProfile.isPending ? (
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
