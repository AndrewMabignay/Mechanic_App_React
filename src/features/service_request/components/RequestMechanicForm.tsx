"use client"

import { Controller, useForm, useWatch } from "react-hook-form";
import { useCreateServiceRequest } from "../hooks/useServiceRequest"
import { serviceRequestSchema, type ServiceRequestFormData } from "../schemas/serviceRequestSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { useBikeProblems } from "../../bike_problem/hooks/useBikeProblem";
import { Field, FieldError, FieldLabel } from "../../../components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import LocationPicker from "../../../components/maps/LocationPicker";

interface Props {
    onSuccess?: () => void;
}

export default function RequestMechanicForm({
    onSuccess
}: Props) {
    const { data: bikeProblems } = useBikeProblems();
    const form = useForm<ServiceRequestFormData>({
        resolver: zodResolver(serviceRequestSchema),
        defaultValues: {
            bike_problem_id: 0,
            description: "",
            location_lat: 14.4646,
            location_lng: 121.1929,
        }
    });

    const latitude = useWatch({
        control: form.control,
        name: "location_lat",
    });

    const longitude = useWatch({
        control: form.control,
        name: "location_lng",
    });

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                form.setValue("location_lat", coords.latitude, {
                    shouldDirty: true,
                });

                form.setValue("location_lng", coords.longitude, {
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
            }
        );
    };

    const createServiceRequestMutation = useCreateServiceRequest();

    async function onSubmit(values: ServiceRequestFormData) {
        try {
            await createServiceRequestMutation.mutateAsync(values);

            form.reset();

            onSuccess?.();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <form
                id="form-rhf-service-request"
                onSubmit={form.handleSubmit(onSubmit)}
            >

                {/* Bike Problem Id */}
                <Controller
                    control={form.control}
                    name="bike_problem_id"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Bike Problem</FieldLabel>

                            <Select
                                value={field.value ? String(field.value) : ""}
                                onValueChange={(value) => field.onChange(Number(value))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a bike problem" />
                                </SelectTrigger>

                                <SelectContent>
                                    {bikeProblems?.data.map((problem) => (
                                        <SelectItem
                                            key={problem.id}
                                            value={String(problem.id)}
                                        >
                                            {problem.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FieldError
                                errors={fieldState.error ? [fieldState.error] : []}
                            />
                        </Field>
                    )}
                />

                {/* Description */}
                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-description">
                                Description
                            </FieldLabel>

                            <textarea
                                {...field}
                                id="form-rhf-description"
                                className="w-full rounded-md border p-2"
                                placeholder="Describe your bike problem..."
                                rows={4}
                            />

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* Latitude and Longitude */}
                <Field>
                    <FieldLabel>Default Location</FieldLabel>

                    <LocationPicker
                        latitude={latitude ?? 14.4646}
                        longitude={longitude ?? 121.1929}
                        onChange={(lat, lng) => {
                            form.setValue("location_lat", lat, {
                                shouldDirty: true,
                                shouldValidate: true,
                            });

                            form.setValue("location_lng", lng, {
                                shouldDirty: true,
                                shouldValidate: true,
                            });
                        }}
                    />

                    {(form.formState.errors.location_lat ||
                    form.formState.errors.location_lng) && (
                        <FieldError
                            errors={[
                                form.formState.errors.location_lat,
                                form.formState.errors.location_lng,
                            ].filter(Boolean)}
                        />
                    )}

                    <Button
                        type="button"
                        variant="outline"
                        onClick={getCurrentLocation}
                    >
                        Use Current Location
                    </Button>
                </Field>
            </form>

            <CardContent>
                <Button
                    type="submit"
                    form="form-rhf-service-request"
                    disabled={createServiceRequestMutation.isPending}
                >
                    {createServiceRequestMutation.isPending
                        ? "Requesting..."
                        : "Request Mechanic"}
                </Button>
            </CardContent>
        </>
    );
}