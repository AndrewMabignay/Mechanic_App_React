"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
    cyclistProfileSchema,
    type CyclistProfileFormData,
} from "../schemas/cyclistProfileSchema";

import {
    useCreateCyclistProfile,
    useCyclistProfile,
    useUpdateCyclistProfile,
} from "../hooks/useCyclistProfile";

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "../../../components/ui/field";

import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import MapComponent from "@/components/Map";

import { Bike } from "lucide-react";

interface Props {
    onSuccess?: () => void;
}

export default function CyclistProfileForm({ onSuccess }: Props) {
    const navigate = useNavigate();
    const location = useLocation();

    const form = useForm<CyclistProfileFormData>({
        resolver: zodResolver(cyclistProfileSchema),
        defaultValues: {
            emergency_contact: "",
            default_location_lat: undefined,
            default_location_lng: undefined,
        },
    });

    const latitude = useWatch({
        control: form.control,
        name: "default_location_lat",
    });

    const longitude = useWatch({
        control: form.control,
        name: "default_location_lng",
    });

    const mapLatitude = latitude ?? 14.5995;
    const mapLongitude = longitude ?? 120.9842;

    /*
     * ============================================================
     * CURRENT LOCATION
     * ============================================================
     */

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                form.setValue("default_location_lat", coords.latitude, {
                    shouldDirty: true,
                    shouldValidate: true,
                });

                form.setValue("default_location_lng", coords.longitude, {
                    shouldDirty: true,
                    shouldValidate: true,
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

    /*
     * ============================================================
     * PROFILE
     * ============================================================
     */

    const isCreatePage = location.pathname === "/cyclist/create-profile";

    const { data: cyclistProfile } = useCyclistProfile(!isCreatePage);

    useEffect(() => {
        if (!cyclistProfile) {
            return;
        }

        form.reset({
            emergency_contact: cyclistProfile.emergency_contact,
            default_location_lat: Number(cyclistProfile.default_location_lat),
            default_location_lng: Number(cyclistProfile.default_location_lng),
        });
    }, [cyclistProfile, form]);

    /*
     * ============================================================
     * MUTATIONS
     * ============================================================
     */

    const createCyclistProfileMutation = useCreateCyclistProfile();

    const updateCyclistProfileMutation = useUpdateCyclistProfile();

    const isSaving =
        createCyclistProfileMutation.isPending ||
        updateCyclistProfileMutation.isPending;

    /*
     * ============================================================
     * SUBMIT
     * ============================================================
     */

    async function onSubmit(values: CyclistProfileFormData) {
        try {
            if (cyclistProfile) {
                await updateCyclistProfileMutation.mutateAsync({
                    uuid: cyclistProfile.uuid,
                    data: values,
                });

                onSuccess?.();
            } else {
                await createCyclistProfileMutation.mutateAsync(values);

                navigate("/cyclist");
            }
        } catch (error) {
            console.error(error);
        }
    }

    /*
     * ============================================================
     * RENDER
     * ============================================================
     */

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
                <div className="w-full rounded-xl border border-gray-200 bg-white px-6 py-7 shadow-sm sm:px-8 sm:py-8">
                    {/* Header */}
                    <div className="mb-7">
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                            Cyclist Profile
                        </h1>

                        <p className="mt-2 text-sm text-gray-600">
                            Set up your emergency contact and default service
                            location.
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        id="form-rhf-cyclist-profile"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FieldGroup>
                            {/* Section Header */}
                            <div className="mb-1">
                                <h2 className="text-lg font-medium text-gray-900">
                                    Profile information
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Provide your emergency contact and preferred
                                    location.
                                </p>
                            </div>

                            {/* Emergency Contact */}
                            <Controller
                                name="emergency_contact"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel
                                            htmlFor="form-rhf-emergency-contact"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            Emergency contact #
                                        </FieldLabel>

                                        <Input
                                            {...field}
                                            id="form-rhf-emergency-contact"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter your emergency contact #"
                                            autoComplete="off"
                                            className="
                                                h-11
                                                border-gray-300
                                                focus-visible:border-[#fc4c02]
                                                focus-visible:ring-[#fc4c02]/20
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

                            {/* Location Section */}
                            <div className="space-y-3">
                                <div>
                                    <FieldLabel className="text-sm font-medium text-gray-700">
                                        Default location
                                    </FieldLabel>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Select your usual location on the map.
                                    </p>
                                </div>

                                {/* Map */}
                                <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                                    <div className="h-[350px]">
                                        <MapComponent
                                            latitude={mapLatitude}
                                            longitude={mapLongitude}
                                            onLocationSelect={(lat, lng) => {
                                                form.setValue(
                                                    "default_location_lat",
                                                    lat,
                                                    {
                                                        shouldDirty: true,
                                                        shouldValidate: true,
                                                    },
                                                );

                                                form.setValue(
                                                    "default_location_lng",
                                                    lng,
                                                    {
                                                        shouldDirty: true,
                                                        shouldValidate: true,
                                                    },
                                                );
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Coordinates */}
                                <div
                                    className="
                                        flex
                                        flex-col
                                        gap-3
                                        rounded-lg
                                        border
                                        border-gray-200
                                        bg-gray-50
                                        p-4
                                        sm:flex-row
                                        sm:items-center
                                        sm:justify-between
                                    "
                                >
                                    <div>
                                        <p className="text-xs font-medium text-gray-700">
                                            Selected location
                                        </p>

                                        <p className="mt-1 font-mono text-sm text-gray-600">
                                            {mapLatitude.toFixed(6)},{" "}
                                            {mapLongitude.toFixed(6)}
                                        </p>
                                    </div>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={getCurrentLocation}
                                        className="
                                            h-10
                                            border-gray-300
                                            hover:border-[#fc4c02]
                                            hover:text-[#fc4c02]
                                        "
                                    >
                                        Use Current Location
                                    </Button>
                                </div>

                                {/* Location Errors */}
                                {(form.formState.errors.default_location_lat ||
                                    form.formState.errors
                                        .default_location_lng) && (
                                    <FieldError
                                        errors={[
                                            form.formState.errors
                                                .default_location_lat,
                                            form.formState.errors
                                                .default_location_lng,
                                        ].filter(Boolean)}
                                    />
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="mt-2 flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={isSaving}
                                    className="
                                        h-11
                                        rounded-md
                                        bg-[#fc4c02]
                                        px-7
                                        font-medium
                                        text-white
                                        hover:bg-[#e64500]
                                    "
                                >
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </FieldGroup>
                    </form>
                </div>
            </div>
        </div>
    );
}
