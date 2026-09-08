import { Controller, useForm, useWatch } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
    mechanicProfileSchema,
    type MechanicProfileFormData,
} from "../schemas/mechanicProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    useCreateMechanicProfile,
    useMechanicProfile,
    useUpdateMechanicProfile,
} from "../hooks/useMechanicProfile";
import { useEffect, useState } from "react";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "../../../components/ui/field";
import { Switch } from "../../../components/ui/switch";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import MapComponent from "@/components/Map";
import { Bike } from "lucide-react";

interface Props {
    onSuccess?: () => void;
}

export default function MechanicProfileForm({ onSuccess }: Props) {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [specializationInput, setSpecializationInput] = useState("");

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
                form.setValue("latitude", coords.latitude, {
                    shouldDirty: true,
                    shouldValidate: true,
                });

                form.setValue("longitude", coords.longitude, {
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

    /*
     * ============================================================
     * MUTATIONS
     * ============================================================
     */

    const createMechanicProfileMutation = useCreateMechanicProfile();

    const updateMechanicProfileMutation = useUpdateMechanicProfile();

    const isSaving =
        createMechanicProfileMutation.isPending ||
        updateMechanicProfileMutation.isPending;

    /*
     * ============================================================
     * SUBMIT
     * ============================================================
     */

    async function onSubmit(values: MechanicProfileFormData) {
        try {
            if (mechanicProfile) {
                await updateMechanicProfileMutation.mutateAsync({
                    uuid: mechanicProfile.data.uuid,
                    data: values,
                });

                onSuccess?.();
            } else {
                await createMechanicProfileMutation.mutateAsync(values);

                navigate("/mechanic");
            }
        } catch (error) {
            console.error(error);
        }
    }

    /*
     * ============================================================
     * SPECIALIZATIONS
     * ============================================================
     */

    const addSpecialization = () => {
        const value = specializationInput.trim();

        if (!value) return;

        const current = form.getValues("specializations");

        if (current.includes(value)) {
            setSpecializationInput("");
            return;
        }

        form.setValue("specializations", [...current, value], {
            shouldDirty: true,
            shouldValidate: true,
        });

        setSpecializationInput("");
    };

    const removeSpecialization = (value: string) => {
        form.setValue(
            "specializations",
            form.getValues("specializations").filter((item) => item !== value),
            {
                shouldDirty: true,
                shouldValidate: true,
            },
        );
    };

    /*
     * ============================================================
     * STEP NAVIGATION
     * ============================================================
     */

    const goToStep2 = async () => {
        const valid = await form.trigger([
            "skill_description",
            "specializations",
            "years_experience",
        ]);

        if (!valid) {
            return;
        }

        setStep(2);
    };

    const goToStep1 = () => {
        setStep(1);
    };

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
                            Mechanic Profile
                        </h1>

                        <p className="mt-2 text-sm text-gray-600">
                            Set up your mechanic information and service
                            location.
                        </p>
                    </div>

                    {/* Step Indicator */}
                    <div className="mb-8">
                        <div className="flex items-center">
                            {/* Step 1 */}
                            <div className="flex items-center gap-2">
                                <div
                                    className={`
                                    flex h-8 w-8 shrink-0 items-center justify-center
                                    rounded-full text-xs font-semibold
                                    transition-colors
                                    ${
                                        step >= 1
                                            ? "bg-[#fc4c02] text-white"
                                            : "bg-gray-200 text-gray-500"
                                    }
                                `}
                                >
                                    {step === 2 ? "✓" : "1"}
                                </div>

                                <div className="hidden sm:block">
                                    <p
                                        className={`text-sm font-medium ${
                                            step === 1
                                                ? "text-gray-900"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        Profile
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Basic information
                                    </p>
                                </div>
                            </div>

                            {/* Progress Line */}
                            <div
                                className={`
                                mx-3 h-[2px] flex-1 transition-colors
                                ${step === 2 ? "bg-[#fc4c02]" : "bg-gray-200"}
                            `}
                            />

                            {/* Step 2 */}
                            <div className="flex items-center gap-2">
                                <div
                                    className={`
                                    flex h-8 w-8 shrink-0 items-center justify-center
                                    rounded-full text-xs font-semibold
                                    ${
                                        step === 2
                                            ? "bg-[#fc4c02] text-white"
                                            : "bg-gray-200 text-gray-500"
                                    }
                                `}
                                >
                                    2
                                </div>

                                <div className="hidden sm:block">
                                    <p
                                        className={`text-sm font-medium ${
                                            step === 2
                                                ? "text-gray-900"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        Location
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Service location
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className="mt-3 text-xs text-gray-500 sm:hidden">
                            Step {step} of 2
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        id="form-rhf-mechanic-profile"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        {/* STEP 1 */}
                        {step === 1 && (
                            <FieldGroup>
                                <div className="mb-1">
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Profile information
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Tell cyclists about your skills and
                                        experience.
                                    </p>
                                </div>

                                {/* Skill Description */}
                                <Controller
                                    name="skill_description"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel
                                                htmlFor="form-rhf-skill-description"
                                                className="text-sm font-medium text-gray-700"
                                            >
                                                Skill description
                                            </FieldLabel>

                                            <textarea
                                                {...field}
                                                id="form-rhf-skill-description"
                                                rows={5}
                                                placeholder="Describe your skills, experience, and the types of bike repairs you can handle..."
                                                className="
                                                w-full
                                                resize-none
                                                rounded-md
                                                border
                                                border-gray-300
                                                bg-white
                                                px-3
                                                py-2.5
                                                text-sm
                                                outline-none
                                                transition
                                                placeholder:text-gray-400
                                                focus:border-[#fc4c02]
                                                focus:ring-2
                                                focus:ring-[#fc4c02]/20
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

                                {/* Availability */}
                                <Controller
                                    name="is_available"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <div
                                                className="
                                                flex
                                                items-center
                                                justify-between
                                                gap-4
                                                rounded-lg
                                                border
                                                border-gray-200
                                                bg-gray-50
                                                p-4
                                            "
                                            >
                                                <div>
                                                    <FieldLabel className="text-sm font-medium text-gray-900">
                                                        Available for service
                                                    </FieldLabel>

                                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                                        Allow cyclists to send
                                                        you service requests.
                                                    </p>
                                                </div>

                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </div>

                                            <FieldError
                                                errors={
                                                    fieldState.error
                                                        ? [fieldState.error]
                                                        : []
                                                }
                                            />
                                        </Field>
                                    )}
                                />

                                {/* Specializations */}
                                <Controller
                                    name="specializations"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel className="text-sm font-medium text-gray-700">
                                                Specializations
                                            </FieldLabel>

                                            <div className="flex gap-2">
                                                <Input
                                                    value={specializationInput}
                                                    placeholder="e.g. Flat Tire Repair"
                                                    onChange={(e) =>
                                                        setSpecializationInput(
                                                            e.target.value,
                                                        )
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            addSpecialization();
                                                        }
                                                    }}
                                                    className="
                                                    h-11
                                                    border-gray-300
                                                    focus-visible:border-[#fc4c02]
                                                    focus-visible:ring-[#fc4c02]/20
                                                "
                                                />

                                                <Button
                                                    type="button"
                                                    onClick={addSpecialization}
                                                    className="
                                                    h-11
                                                    bg-[#fc4c02]
                                                    px-5
                                                    text-white
                                                    hover:bg-[#e64500]
                                                "
                                                >
                                                    Add
                                                </Button>
                                            </div>

                                            {field.value.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {field.value.map((item) => (
                                                        <Badge
                                                            key={item}
                                                            className="
                                                            gap-2
                                                            border
                                                            border-[#fc4c02]/20
                                                            bg-[#fc4c02]/10
                                                            px-3
                                                            py-1.5
                                                            text-[#fc4c02]
                                                            hover:bg-[#fc4c02]/10
                                                        "
                                                        >
                                                            {item}

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeSpecialization(
                                                                        item,
                                                                    )
                                                                }
                                                                className="
                                                                text-[#fc4c02]
                                                                hover:text-red-600
                                                            "
                                                            >
                                                                ×
                                                            </button>
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}

                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                {/* Years Experience */}
                                <Controller
                                    name="years_experience"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel
                                                htmlFor="form-rhf-years-experience"
                                                className="text-sm font-medium text-gray-700"
                                            >
                                                Years of experience
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
                                                            : Number(
                                                                  e.target
                                                                      .value,
                                                              ),
                                                    )
                                                }
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

                                {/* Continue */}
                                <div className="mt-2 flex justify-end">
                                    <Button
                                        type="button"
                                        onClick={goToStep2}
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
                                        Next
                                    </Button>
                                </div>
                            </FieldGroup>
                        )}

                        {/* STEP 2 */}
                        {step === 2 && (
                            <FieldGroup>
                                <div className="mb-1">
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Service location
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Select the location where you usually
                                        provide your mechanic services.
                                    </p>
                                </div>

                                {/* Map */}
                                <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                                    <div className="h-[350px]">
                                        <MapComponent
                                            latitude={mapLatitude}
                                            longitude={mapLongitude}
                                            onLocationSelect={(lat, lng) => {
                                                form.setValue("latitude", lat, {
                                                    shouldDirty: true,
                                                    shouldValidate: true,
                                                });

                                                form.setValue(
                                                    "longitude",
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
                                {(form.formState.errors.latitude ||
                                    form.formState.errors.longitude) && (
                                    <FieldError
                                        errors={[
                                            form.formState.errors.latitude,
                                            form.formState.errors.longitude,
                                        ].filter(Boolean)}
                                    />
                                )}

                                {/* Buttons */}
                                <div className="mt-2 flex items-center justify-between">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={goToStep1}
                                        disabled={isSaving}
                                        className="
                                        font-medium
                                        text-gray-600
                                        hover:bg-gray-100
                                        hover:text-gray-900
                                    "
                                    >
                                        ← Back
                                    </Button>

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
                                        {isSaving
                                            ? "Saving..."
                                            : "Save Changes"}
                                    </Button>
                                </div>
                            </FieldGroup>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
