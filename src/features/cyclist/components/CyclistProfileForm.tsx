"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
    cyclistProfileSchema,
    type CyclistProfileFormData,
} from "../schemas/cyclistProfileSchema";
import {
    useCreateCyclistProfile,
    useCyclistProfile,
    useUpdateCyclistProfile,
} from "../hooks/useCyclistProfile";
import { useEffect } from "react";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { CardContent } from "../../../components/ui/card";
import { useNavigate } from "react-router-dom";
import MapComponent from "@/components/Map";

interface Props {
    onSuccess?: () => void;
}

export default function CyclistProfileForm({ onSuccess }: Props) {
    const navigate = useNavigate();
    const form = useForm<
        z.input<typeof cyclistProfileSchema>,
        unknown,
        z.output<typeof cyclistProfileSchema>
    >({
        resolver: zodResolver(cyclistProfileSchema),
        defaultValues: {
            emergency_contact: "",
            default_location_lat: 14.5995,
            default_location_lng: 120.9842,
        },
    });

    const latitude = useWatch({
        control: form.control,
        name: "default_location_lat",
    }) as number;

    const longitude = useWatch({
        control: form.control,
        name: "default_location_lng",
    }) as number;

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                form.setValue("default_location_lat", coords.latitude, {
                    shouldDirty: true,
                });

                form.setValue("default_location_lng", coords.longitude, {
                    shouldDirty: true,
                });
            },
            (error) => {
                console.error(error);
                alert("Unable to get your current location.");
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
            },
        );
    };

    const { data: cyclistProfile } = useCyclistProfile();
    useEffect(() => {
        if (cyclistProfile) {
            form.reset({
                emergency_contact: cyclistProfile.emergency_contact,
                default_location_lat: cyclistProfile.default_location_lat,
                default_location_lng: cyclistProfile.default_location_lng,
            });
        }
    }, [cyclistProfile]);

    const createCyclistProfileMutation = useCreateCyclistProfile();
    const updateCyclistProfileMutation = useUpdateCyclistProfile();

    async function onSubmit(values: CyclistProfileFormData) {
        try {
            if (cyclistProfile) {
                // UPDATE EXISTING PROFILE
                await updateCyclistProfileMutation.mutateAsync({
                    uuid: cyclistProfile.uuid,
                    data: values,
                });

                // close dialog only
                onSuccess?.();
            } else {
                // CREATE FIRST PROFILE
                await createCyclistProfileMutation.mutateAsync(values);

                // redirect to cyclist dashboard/home
                navigate("/cyclist");
            }

            onSuccess?.();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <form
                id="form-rhf-cyclist-profile"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FieldGroup>
                    {/* EMERGENCY CONTACT NUMBER */}
                    <Controller
                        name="emergency_contact"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-emergency_contact">
                                    Emergency Contact #
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-emergency_contact"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your emergency contact #"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <div className="space-y-2">
                        <FieldLabel>Default Location</FieldLabel>

                        <div className="h-[300px] overflow-hidden rounded-lg border">
                            <MapComponent
                                latitude={latitude ?? 14.5995}
                                longitude={longitude ?? 120.9842}
                                onLocationSelect={(latitude, longitude) => {
                                    form.setValue(
                                        "default_location_lat",
                                        latitude,
                                        {
                                            shouldDirty: true,
                                            shouldValidate: true,
                                        },
                                    );

                                    form.setValue(
                                        "default_location_lng",
                                        longitude,
                                        {
                                            shouldDirty: true,
                                            shouldValidate: true,
                                        },
                                    );
                                }}
                            />
                        </div>

                        <p className="text-xs text-muted-foreground">
                            Click the map to select your location.
                        </p>

                        <p className="text-xs text-muted-foreground">
                            {latitude?.toFixed(6)}, {longitude?.toFixed(6)}
                        </p>
                    </div>
                </FieldGroup>
            </form>
            <CardContent>
                <Field orientation="vertical">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={getCurrentLocation}
                    >
                        Use Current Location
                    </Button>

                    <Button
                        type="submit"
                        form="form-rhf-cyclist-profile"
                        disabled={
                            createCyclistProfileMutation.isPending ||
                            updateCyclistProfileMutation.isPending
                        }
                    >
                        {createCyclistProfileMutation.isPending ||
                        updateCyclistProfileMutation.isPending
                            ? "Saving..."
                            : "Save Changes"}
                    </Button>
                </Field>
            </CardContent>
        </>
    );
}
