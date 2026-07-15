"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBikeShopByOwner, useEditBikeShopOwner, useUpdateBikeShopByOwner } from "../../../features/bike_shop_owner/hooks/useBikeShopOwner";
import { bikeShopOwnerSchema } from "../../../features/bike_shop_owner/schemas/bikeShopOwnerSchema";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import LocationPicker from "../../../components/maps/LocationPicker";
import { CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BikeShopOwnerForm() {

    const { uuid } = useParams();

    const isEdit = !!uuid;

    const { data: bikeShopResponse } = useEditBikeShopOwner(uuid!, {
        enabled: isEdit,
    });

    const createBikeShopMutation = useCreateBikeShopByOwner();
    const updateBikeShopMutation = useUpdateBikeShopByOwner();

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

    useEffect(() => {
        if (!bikeShopResponse?.data) return;

        const shop = bikeShopResponse.data;

        form.reset({
            name: shop.name,
            description: shop.description,
            address: shop.address,
            latitude: shop.latitude.toString(),
            longitude: shop.longitude.toString(),
            phone: shop.phone,
            opening_time: shop.opening_time,
            closing_time: shop.closing_time,
            is_open: shop.is_open,
        });
    }, [bikeShopResponse, form]);

    // useEffect(() => {
    //     setPosition([latitude, longitude]);
    // }, [latitude, longitude]);
    

    async function onSubmit(data: z.infer<ReturnType<typeof bikeShopOwnerSchema>>) {
        console.log(data);

        try {
            if (isEdit) {
                await updateBikeShopMutation.mutateAsync({
                    bikeShop: uuid!,
                    data,
                });
            } else {
                await createBikeShopMutation.mutateAsync(data);
                form.reset();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <h2 className="text-2xl font-bold">
                {isEdit ? "Edit Bike Shop" : "Create Bike Shop"}
            </h2>
            <form id="form-rhf-bike-shop" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                    {/* Address */}
                    <Controller
                        name="address"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-address">
                                    Description
                                </FieldLabel>

                                <textarea
                                    {...field}
                                    id="form-rhf-address"
                                    className="w-full rounded-md border p-2"
                                    placeholder="Bike shop address..."
                                    rows={4}
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {/* Location Picker */}
                    <div className="md:col-span-2">
                        <LocationPicker
                            latitude={Number(form.watch("latitude")) || 14.626}
                            longitude={Number(form.watch("longitude")) || 121.122}
                            onChange={(lat, lng) => {
                                form.setValue("latitude", lat.toString());
                                form.setValue("longitude", lng.toString());
                            }}
                        />
                    </div>

                    <Input {...form.register("latitude")} />
                    <Input {...form.register("longitude")} />

                    <div className="md:col-span-2 grid grid-cols-3 gap-4">

                        {/* Opening Time */}
                        <Controller
                            name="opening_time"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Opening Time</FieldLabel>

                                    <Input
                                        {...field}
                                        type="time"
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Closing Time */}
                        <Controller
                            name="closing_time"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Closing Time</FieldLabel>

                                    <Input
                                        {...field}
                                        type="time"
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Is Open */}
                        <Controller
                            name="is_open"
                            control={form.control}
                            render={({ field }) => (
                                <Field>
                                    <FieldLabel>Shop Status</FieldLabel>

                                    <label className="flex h-10 items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={(e) => field.onChange(e.target.checked)}
                                        />
                                        <span>Open</span>
                                    </label>
                                </Field>
                            )}
                        />

                    </div>
                </FieldGroup>
            </form>
            <CardContent>
                <Field orientation="horizontal" className="flex justify-end items-center">
                    <Button type="submit" form="form-rhf-bike-shop">
                        Submit
                    </Button>
                </Field>
            </CardContent>
        </>
    );  
}