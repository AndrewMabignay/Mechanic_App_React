import { useEffect, useMemo, useRef, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Loader2, Wrench } from "lucide-react";
import { useBikeProblemOptions } from "../hooks/useBikeProblem";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    requestMechanicSchema,
    type RequestMechanicFormData,
} from "../schemas/requestMechanicSchema";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "../../../components/ui/field";
import { Textarea } from "../../../components/ui/textarea";
import { Input } from "../../../components/ui/input";
import { useCyclistProfile } from "../../cyclist/hooks/useCyclistProfile";
import MapComponent from "../../../components/Map";
import { useCreateServiceRequest } from "../hooks/useCreateServiceRequest";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";

export default function CyclistRequestMechanicForm() {
    const [open, setOpen] = useState(false);
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const { data: cyclistProfile } = useCyclistProfile();

    const latitude = Number(cyclistProfile?.default_location_lat);
    const longitude = Number(cyclistProfile?.default_location_lng);

    const { data, isLoading, error } = useBikeProblemOptions();

    const createServiceRequestMutation = useCreateServiceRequest();
    const form = useForm({
        resolver: zodResolver(requestMechanicSchema),
        defaultValues: {
            bike_problem: 0,
            location_lat: 0,
            location_lng: 0,
            description: "",
            images: [],
        },
    });

    const bikeProblems = data?.data ?? [];

    const selectedProblem = useWatch({
        control: form.control,
        name: "bike_problem",
    });

    const queryClient = useQueryClient();

    useEffect(() => {
        if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
            form.setValue("location_lat", latitude);
            form.setValue("location_lng", longitude);
        }
    }, [latitude, longitude, form]);

    async function onSubmit(values: RequestMechanicFormData) {
        try {
            console.log("Submitting:", values);

            const response =
                await createServiceRequestMutation.mutateAsync(values);

            console.log("Service request created:", response);

            await queryClient.refetchQueries({
                queryKey: ["cyclist-current-service-request"],
            });

            setOpen(false);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Status:", error.response?.status);
                console.error("Response:", error.response?.data);
            } else {
                console.error("Failed to create service request:", error);
            }
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div className="flex justify-center items-center">
                        <Button
                            className="
                            w-fit
                            mr-2
                            h-11
                            rounded-md
                            bg-[#fc4c02]
                            px-6
                            font-medium
                            text-white
                            shadow-sm
                            hover:bg-[#e64500]
                        "
                        >
                            <Wrench className="mr-2 h-4 w-4" />
                            Request Mechanic
                        </Button>
                    </div>
                </DialogTrigger>
                <DialogContent
                    className="
                        flex
                        max-h-[90vh]
                        flex-col
                        overflow-hidden
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        p-0
                        shadow-sm
                        sm:max-w-lg
                    "
                >
                    {/* Header */}
                    <div className="shrink-0 px-6 pt-7 sm:px-8 sm:pt-8">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-semibold tracking-tight text-gray-900">
                                Request Mechanic
                            </DialogTitle>

                            <DialogDescription>
                                Select the problem with your bicycle.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    {/* Scrollable Content */}
                    <div
                        className="
                            min-h-0
                            flex-1
                            overflow-y-auto
                            px-6
                            sm:px-8
                            [scrollbar-width:thin]
                            [scrollbar-color:#fc4c02_transparent]
                            [&::-webkit-scrollbar]:w-2
                            [&::-webkit-scrollbar-track]:bg-transparent
                            [&::-webkit-scrollbar-thumb]:rounded-full
                            [&::-webkit-scrollbar-thumb]:bg-[#fc4c02]
                            [&::-webkit-scrollbar-thumb:hover]:bg-[#e64500]
                        "
                    >
                        <form
                            id="form-rhf-request-mechanic"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FieldGroup>
                                {/* Bike Problem */}
                                <Field>
                                    <FieldLabel className="text-sm font-medium text-gray-700">
                                        Bike Problem
                                    </FieldLabel>

                                    {isLoading && (
                                        <p className="text-sm text-gray-500">
                                            Loading bike problems...
                                        </p>
                                    )}

                                    {error && (
                                        <p className="text-sm text-red-500">
                                            Failed to load bike problems.
                                        </p>
                                    )}

                                    {!isLoading && !error && (
                                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                            {bikeProblems.map((problem) => {
                                                const isSelected =
                                                    selectedProblem ===
                                                    problem.id;

                                                return (
                                                    <Button
                                                        key={problem.id}
                                                        type="button"
                                                        variant="outline"
                                                        className={`
                                            h-11
                                            justify-start
                                            rounded-md
                                            border-gray-300
                                            text-sm
                                            font-medium
                                            transition-colors
                                            ${
                                                isSelected
                                                    ? "border-[#fc4c02] bg-[#fc4c02]/10 text-[#fc4c02] hover:bg-[#fc4c02]/15 hover:text-[#fc4c02]"
                                                    : "bg-white text-gray-700 hover:border-[#fc4c02] hover:bg-[#fc4c02]/5 hover:text-[#fc4c02]"
                                            }
                                        `}
                                                        onClick={() => {
                                                            form.setValue(
                                                                "bike_problem",
                                                                problem.id,
                                                                {
                                                                    shouldDirty: true,
                                                                    shouldValidate: true,
                                                                },
                                                            );
                                                        }}
                                                    >
                                                        {problem.name}
                                                    </Button>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {form.formState.errors.bike_problem && (
                                        <FieldError
                                            errors={[
                                                form.formState.errors
                                                    .bike_problem,
                                            ]}
                                        />
                                    )}
                                </Field>

                                {/* Description */}
                                <Controller
                                    name="description"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel
                                                htmlFor="form-rhf-description"
                                                className="text-sm font-medium text-gray-700"
                                            >
                                                Description
                                            </FieldLabel>

                                            <Textarea
                                                {...field}
                                                id="form-rhf-description"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                placeholder="Describe the problem with your bicycle..."
                                                rows={5}
                                                className="
                                    resize-none
                                    border-gray-300
                                    bg-white
                                    text-sm
                                    placeholder:text-gray-400
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

                                {/* Images */}
                                <Controller
                                    name="images"
                                    control={form.control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState,
                                    }) => {
                                        const removeImage = (
                                            indexToRemove: number,
                                        ) => {
                                            const currentImages = value ?? [];

                                            const newImages =
                                                currentImages.filter(
                                                    (_: File, index: number) =>
                                                        index !== indexToRemove,
                                                );

                                            onChange(newImages);

                                            if (imageInputRef.current) {
                                                const dataTransfer =
                                                    new DataTransfer();

                                                newImages.forEach(
                                                    (file: File) => {
                                                        dataTransfer.items.add(
                                                            file,
                                                        );
                                                    },
                                                );

                                                imageInputRef.current.files =
                                                    dataTransfer.files;
                                            }
                                        };

                                        return (
                                            <Field
                                                data-invalid={
                                                    fieldState.invalid
                                                }
                                            >
                                                <FieldLabel
                                                    htmlFor="form-rhf-images"
                                                    className="text-sm font-medium text-gray-700"
                                                >
                                                    Images
                                                </FieldLabel>

                                                <Input
                                                    ref={imageInputRef}
                                                    id="form-rhf-images"
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={(event) => {
                                                        const files =
                                                            Array.from(
                                                                event.target
                                                                    .files ??
                                                                    [],
                                                            );

                                                        if (files.length > 5) {
                                                            form.setError(
                                                                "images",
                                                                {
                                                                    type: "manual",
                                                                    message:
                                                                        "You can upload a maximum of 5 images.",
                                                                },
                                                            );

                                                            return;
                                                        }

                                                        onChange(files);
                                                        form.clearErrors(
                                                            "images",
                                                        );
                                                    }}
                                                    className="
                                        border-gray-300
                                        bg-white
                                        text-sm
                                        focus-visible:border-[#fc4c02]
                                        focus-visible:ring-[#fc4c02]/20
                                    "
                                                />

                                                <p className="text-xs text-gray-500">
                                                    Upload 1–5 images of your
                                                    bicycle problem.
                                                </p>

                                                {value?.length > 0 && (
                                                    <div className="flex gap-3 overflow-x-auto pb-2">
                                                        {value.map(
                                                            (
                                                                file: File,
                                                                index: number,
                                                            ) => (
                                                                <ImagePreview
                                                                    key={`${file.name}-${file.lastModified}-${index}`}
                                                                    file={file}
                                                                    index={
                                                                        index
                                                                    }
                                                                    onRemove={
                                                                        removeImage
                                                                    }
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                )}

                                                {fieldState.invalid && (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error,
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        );
                                    }}
                                />

                                {/* Request Location */}
                                <Field>
                                    <FieldLabel className="text-sm font-medium text-gray-700">
                                        Request Location
                                    </FieldLabel>

                                    <div className="h-[300px] w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                                        {Number.isFinite(latitude) &&
                                            Number.isFinite(longitude) && (
                                                <MapComponent
                                                    latitude={latitude}
                                                    longitude={longitude}
                                                    onLocationSelect={(
                                                        selectedLatitude,
                                                        selectedLongitude,
                                                    ) => {
                                                        form.setValue(
                                                            "location_lat",
                                                            selectedLatitude,
                                                            {
                                                                shouldDirty: true,
                                                                shouldValidate: true,
                                                            },
                                                        );

                                                        form.setValue(
                                                            "location_lng",
                                                            selectedLongitude,
                                                            {
                                                                shouldDirty: true,
                                                                shouldValidate: true,
                                                            },
                                                        );
                                                    }}
                                                />
                                            )}
                                    </div>

                                    <p className="text-xs text-gray-500">
                                        Click on the map to select your request
                                        location.
                                    </p>
                                </Field>
                            </FieldGroup>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="shrink-0 border-t border-gray-100 bg-white px-6 py-5 sm:px-8">
                        <Button
                            type="submit"
                            form="form-rhf-request-mechanic"
                            disabled={createServiceRequestMutation.isPending}
                            className="
                h-11
                w-full
                rounded-md
                bg-[#fc4c02]
                px-7
                font-medium
                text-white
                shadow-sm
                hover:bg-[#e64500]
            "
                        >
                            {createServiceRequestMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Requesting...
                                </>
                            ) : (
                                "Request Mechanic"
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

function ImagePreview({
    file,
    index,
    onRemove,
}: {
    file: File;
    index: number;
    onRemove: (index: number) => void;
}) {
    const preview = useMemo(() => {
        return URL.createObjectURL(file);
    }, [file]);

    return (
        <div className="relative w-28 shrink-0 overflow-hidden rounded-lg border sm:w-32">
            <img
                src={preview}
                alt={`Selected image ${index + 1}`}
                className="h-28 w-full object-cover sm:h-32"
            />

            <Button
                type="button"
                size="icon"
                variant="destructive"
                onClick={() => onRemove(index)}
                className="absolute right-1 top-1 h-6 w-6 rounded-full"
            >
                ×
            </Button>
        </div>
    );
}
