"use client"

import { Controller, useForm } from "react-hook-form";
import { useCreateBikeShopByOwner } from "../hooks/useBikeShopOwner";
import type { BikeShop } from "../types/bikeShopOwner";
import { zodResolver } from "@hookform/resolvers/zod";
import { bikeShopOwnerSchema } from "../schemas/bikeShopOwnerSchema";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import LocationPicker from "../../../components/maps/LocationPicker";
import { useState } from "react";
import { CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

type BikeShopFormProps = {
    bikeShop?: BikeShop | null;
};

export default function BikeShopForm({ 
    bikeShop, 
}: BikeShopFormProps) {
    const isEdit = !!bikeShop;

    const createBikeShopMutation = useCreateBikeShopByOwner();

    const form = useForm({
        resolver: zodResolver(bikeShopOwnerSchema()),
        defaultValues: {
            name: "",
            description: "",
            address: "",
            latitude: "",
            longitude: "",
            phone: "",
            opening_time: "",
            closing_time: "",
            is_open: false,
        },
    });

    const [step, setStep] = useState(1);

    async function onSubmit(data: z.infer<ReturnType<typeof getFormSchema>>) {
        console.log(data);
    }

    return (
        <>
            <form id="form-rhf-bike-shop" onSubmit={form.handleSubmit(onSubmit)}>
                {step === 1 && (
                    <FieldGroup>
                        {/* Name */}
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-name">
                                        Shop Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your shop name"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && ( <FieldError errors={[fieldState.error]} /> )}
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
                                        placeholder="Describe your bike shop..."
                                        rows={4}
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
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
                                        Phone #
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
                    </FieldGroup>
                )}

                {step === 2 && (
                    <FieldGroup>
                        <LocationPicker
                            latitude={14.626}
                            longitude={121.122}
                            onChange={(lat, lng) => {
                                form.setValue("latitude", lat);
                                form.setValue("longitude", lng);
                            }}
                        />

                        <Input {...form.register("latitude")} />
                        <Input {...form.register("longitude")} />
                    </FieldGroup>
                )}
                
                {step === 3 && (
                    <FieldGroup>
                        {/* Opening Time */}
                        {/* Closing Time */}
                        {/* Is Open */}
                        S
                    </FieldGroup>
                )}
            </form>
            <CardContent>
                <Field orientation="horizontal">
                    {step > 1 && (
                        <Button
                            type="button"
                            onClick={() => setStep(step - 1)}
                        >
                            Previous
                        </Button>
                    )}

                    {step < 3 ? (
                        <Button
                            type="button"
                            onClick={() => setStep(step + 1)}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button type="submit" form="form-rhf-bike-shop">
                            Submit
                        </Button>
                    )}
                </Field>
            </CardContent>
        </>
    );  
}
