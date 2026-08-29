"use client"

import { requestMechanicSchema, type RequestMechanicFormData } from "../schemas/requestMechanicSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../../components/ui/field";
import LocationPicker from "../../../components/maps/LocationPicker";
import { useEffect, useState } from "react";
import { Input } from "../../../components/ui/input";
import { CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { useCreateCyclistRequestService } from "../hooks/useCyclist";
import { LoaderCircle } from "lucide-react";

export default function RequestMechanicForm() {
    const [position, setPosition] = useState({
        lat: 14.5995,
        lng: 120.9842,
    });

    const form = useForm({
        resolver: zodResolver(requestMechanicSchema),
        defaultValues: {
            bike_problem_id: undefined,
            description: "",
            location_lat: undefined,
            location_lng: undefined,
            picture: undefined,
        },
    });

    const [preview, setPreview] = useState<string | null>(null);

    const createCyclistRequestServiceMutation = useCreateCyclistRequestService();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            setPosition({ lat, lng });

            form.setValue("location_lat", lat);
            form.setValue("location_lng", lng);
        });
    }, [form]);

    useEffect(() => {
        console.log(form.formState.errors);
    }, [form.formState.errors]);

    async function onSubmit(data: RequestMechanicFormData) {
        console.log("Submitted!", data);

        await createCyclistRequestServiceMutation.mutateAsync(data);
    }

    return (
        <>
            <form id="form-rhf-request-mechanic" onSubmit={form.handleSubmit(onSubmit)}>

                <FieldGroup>

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
                                    placeholder="Describe your bike shop..."
                                    rows={4}
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {/* Picture */}
                    <Controller
                        name="picture"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="picture">
                                    Picture
                                </FieldLabel>

                                <Input
                                    id="picture"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];

                                        field.onChange(file);

                                        if (file) {
                                            setPreview(URL.createObjectURL(file));
                                        } else {
                                            setPreview(null);
                                        }
                                    }}
                                />

                                {preview && (
                                    <div className="mt-3">
                                        <img
                                            src={preview}
                                            alt="Picture Preview"
                                            className="h-48 w-full rounded-lg border object-cover"
                                        />
                                    </div>
                                )}

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Field>
                        <FieldLabel>
                            Current Location
                        </FieldLabel>

                        <LocationPicker
                            latitude={position.lat}
                            longitude={position.lng}
                            onChange={(lat, lng) => {
                                setPosition({ lat, lng });

                                form.setValue("location_lat", lat, {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                });

                                form.setValue("location_lng", lng, {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                });
                            }}
                        />
                    </Field>
                </FieldGroup> 
            </form>
            <CardContent>
                <Field orientation="vertical">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                    >
                        Reset
                    </Button>

                    <Button
                        type="submit"
                        form="form-rhf-request-mechanic"
                        disabled={createCyclistRequestServiceMutation.isPending}
                    >
                        {createCyclistRequestServiceMutation.isPending ? (
                            <>
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            "Submit Request"
                        )}
                    </Button>
                </Field>
            </CardContent>
        </>
    );
}