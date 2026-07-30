import { Controller, useForm, useWatch } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { mechanicProfileSchema, type MechanicProfileFormData } from "../schemas/mechanicProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateMechanicProfile, useMechanicProfile, useUpdateMechanicProfile } from "../hooks/useMechanicProfile";
import { useEffect, useState } from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../../components/ui/field";
import { Switch } from "../../../components/ui/switch";
import LocationPicker from "../../../components/maps/LocationPicker";
import { CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";

interface Props {
    onSuccess?: () => void;
}

export default function MechanicProfileForm({
    onSuccess
}: Props) {
    const navigate = useNavigate();
    const form = useForm<MechanicProfileFormData>({
        resolver: zodResolver(mechanicProfileSchema),
        defaultValues: {
            skill_description: "",
            is_available: true,
            latitude: undefined,
            longitude: undefined,
            specializations: [],
            years_experience: 0,
        },
    });

    const latitude = useWatch({
        control: form.control,
        name: "latitude",
    });

    const longitude = useWatch({
        control: form.control,
        name: "longitude",
    });

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                form.setValue("latitude", coords.latitude, {
                    shouldDirty: true,
                });

                form.setValue("longitude", coords.longitude, {
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

    const location = useLocation();
    const isCreatePage = location.pathname === "/mechanic/create-profile";
    const { data: mechanicProfile } = useMechanicProfile(!isCreatePage);
    useEffect(() => {
        if (!mechanicProfile?.data) return;

        const profile = mechanicProfile.data;

        form.reset({
            skill_description: profile.skill_description,
            is_available: profile.is_available === 1,
            latitude: Number(profile.latitude),
            longitude: Number(profile.longitude),
            specializations: profile.specializations,
            years_experience: Number(profile.years_experience),
        });
    }, [mechanicProfile, form]);

    const createMechanicProfileMutation = useCreateMechanicProfile();
    const updateMechanicProfileMutation = useUpdateMechanicProfile();

    async function onSubmit(values: MechanicProfileFormData) {
        try {
            if (mechanicProfile) {

                // Update existing mechanic profile
                await updateMechanicProfileMutation.mutateAsync({
                    uuid: mechanicProfile.data.uuid,
                    data: values,
                });

                // Close dialog only
                onSuccess?.();
            } else {

                // Create first profile
                await createMechanicProfileMutation.mutateAsync(values);

                // Redirect to mechanic dashboard/home
                navigate('/mechanic');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const [specializationInput, setSpecializationInput] = useState("");
    const addSpecialization = () => {
        const value = specializationInput.trim();

        if (!value) return;

        const current = form.getValues("specializations");

        // Iwas duplicate
        if (current.includes(value)) {
            setSpecializationInput("");
            return;
        }

        form.setValue(
            "specializations",
            [...current, value],
            {
                shouldDirty: true,
                shouldValidate: true,
            }
        );

        setSpecializationInput("");
    };

    const removeSpecialization = (value: string) => {
        form.setValue(
            "specializations",
            form.getValues("specializations").filter(
                (item) => item !== value
            ),
            {
                shouldDirty: true,
                shouldValidate: true,
            }
        );
    };

    return (
        <>
            <form id="form-rhf-mechanic-profile" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>

                    {/* Skill Description */}
                    <Controller
                        name="skill_description"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-skill-description">
                                    Skill Description
                                </FieldLabel>

                                <textarea
                                    {...field}
                                    id="form-rhf-skill-description"
                                    className="w-full rounded-md border p-2"
                                    placeholder="Describe your skills..."
                                    rows={4}
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {/* Is Available */}
                    <Controller
                        name="is_available"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div>
                                        <FieldLabel>Available for Service</FieldLabel>
                                        <p className="text-sm text-muted-foreground">
                                            Allow cyclists to send you service requests.
                                        </p>
                                    </div>

                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </div>

                                <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                            </Field>
                        )}
                    />

                    {/* Latitude and Longitude */}
                    <Field>
                        <FieldLabel>Default Location</FieldLabel>

                        <LocationPicker
                            latitude={latitude ?? 14.5995}
                            longitude={longitude ?? 120.9842}
                            onChange={(lat, lng) => {
                                form.setValue("latitude", lat, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                });

                                form.setValue("longitude", lng, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                });
                            }}
                        />

                        {(form.formState.errors.latitude ||
                        form.formState.errors.longitude) && (
                            <FieldError
                                errors={[
                                    form.formState.errors.latitude,
                                    form.formState.errors.longitude,
                                ].filter(Boolean)}
                            />
                        )}
                    </Field>

                    {/* Specializations */}
                    <Controller
                        name="specializations"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Specializations</FieldLabel>

                                <div className="flex gap-2">
                                    <Input
                                        value={specializationInput}
                                        placeholder="Add specialization"
                                        onChange={(e) =>
                                            setSpecializationInput(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                addSpecialization();
                                            }
                                        }}
                                    />

                                    <Button
                                        type="button"
                                        onClick={addSpecialization}
                                    >
                                        Add
                                    </Button>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {field.value.map((item) => (
                                        <Badge
                                            key={item}
                                            className="flex items-center gap-2"
                                        >
                                            {item}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeSpecialization(item)
                                                }
                                            >
                                                ✕
                                            </button>
                                        </Badge>
                                    ))}
                                </div>

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {/* Years of experience */}
                    <Controller
                        name="years_experience"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-years-experience">
                                    Years of Experience
                                </FieldLabel>

                                <Input
                                    id="form-rhf-years-experience"
                                    type="number"
                                    min={0}
                                    placeholder="e.g. 2"
                                    value={field.value}
                                    onChange={(e) =>
                                        field.onChange(
                                            e.target.value === ""
                                                ? 0
                                                : Number(e.target.value)
                                        )
                                    }
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

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
                        form="form-rhf-mechanic-profile"
                        disabled={
                            createMechanicProfileMutation.isPending ||
                            updateMechanicProfileMutation.isPending
                        }
                    >
                        {
                            createMechanicProfileMutation.isPending ||
                            updateMechanicProfileMutation.isPending
                                ? "Saving..."
                                : "Save Changes"
                        }
                    </Button>
                </Field>
            </CardContent>
        </>
    );
}