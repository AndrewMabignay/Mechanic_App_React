import { useEffect, useRef, useState } from "react";
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
import { CardContent } from "../../../components/ui/card";
import { useCreateServiceRequest } from "../hooks/useCreateServiceRequest";
import { AxiosError } from "axios";

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
                    <Button>
                        <Wrench className="mr-2 h-4 w-4" />
                        Request Mechanic
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle>Request Mechanic</DialogTitle>
                        <DialogDescription>
                            Select the problem with your bicycle.
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        id="form-rhf-request-mechanic"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FieldGroup>
                            {/* Bike Problems */}
                            <Field>
                                <FieldLabel>Bike Problem</FieldLabel>

                                {isLoading && (
                                    <p className="text-sm text-slate-500">
                                        Loading bike problems...
                                    </p>
                                )}

                                {error && (
                                    <p className="text-sm text-red-500">
                                        Failed to load bike problems.
                                    </p>
                                )}

                                {!isLoading && !error && (
                                    <div className="grid grid-cols-2 gap-2">
                                        {bikeProblems.map((problem) => {
                                            const isSelected =
                                                selectedProblem === problem.id;

                                            return (
                                                <Button
                                                    key={problem.id}
                                                    type="button"
                                                    variant={
                                                        isSelected
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    className="justify-start"
                                                    onClick={() => {
                                                        form.setValue(
                                                            "bike_problem",
                                                            problem.id,
                                                            {
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
                                            form.formState.errors.bike_problem,
                                        ]}
                                    />
                                )}
                            </Field>

                            {/* Description */}
                            <Controller
                                name="description"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-description">
                                            Description
                                        </FieldLabel>

                                        <Textarea
                                            {...field}
                                            id="form-rhf-description"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Describe the problem with your bicycle..."
                                            rows={4}
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

                                        const newImages = currentImages.filter(
                                            (_: File, index: number) =>
                                                index !== indexToRemove,
                                        );

                                        onChange(newImages);

                                        if (imageInputRef.current) {
                                            const dataTransfer =
                                                new DataTransfer();

                                            newImages.forEach((file: File) => {
                                                dataTransfer.items.add(file);
                                            });

                                            imageInputRef.current.files =
                                                dataTransfer.files;
                                        }
                                    };

                                    return (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor="form-rhf-images">
                                                Images
                                            </FieldLabel>

                                            <Input
                                                ref={imageInputRef}
                                                id="form-rhf-images"
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={(event) => {
                                                    const files = Array.from(
                                                        event.target.files ??
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
                                                    form.clearErrors("images");
                                                }}
                                            />

                                            <p className="text-xs text-slate-500">
                                                Upload 1–5 images.
                                            </p>

                                            {/* Image Preview */}
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
                                                                index={index}
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
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            />

                            {/* Request Location */}
                            <Field>
                                <FieldLabel>Request Location</FieldLabel>

                                <div className="h-[300px] w-full overflow-hidden rounded-lg border">
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
                                                    );

                                                    form.setValue(
                                                        "location_lng",
                                                        selectedLongitude,
                                                    );
                                                }}
                                            />
                                        )}
                                </div>

                                <p className="text-xs text-muted-foreground">
                                    Click on the map to select your request
                                    location.
                                </p>
                            </Field>
                        </FieldGroup>
                    </form>
                    <CardContent>
                        <Field orientation="vertical">
                            <Button
                                type="submit"
                                form="form-rhf-request-mechanic"
                                disabled={
                                    createServiceRequestMutation.isPending
                                }
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
                        </Field>
                    </CardContent>
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
    const [preview, setPreview] = useState("");

    useEffect(() => {
        const objectUrl = URL.createObjectURL(file);

        setPreview(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [file]);

    return (
        <div className="relative w-28 shrink-0 overflow-hidden rounded-lg border sm:w-32">
            {preview && (
                <img
                    src={preview}
                    alt={`Selected image ${index + 1}`}
                    className="h-28 w-full object-cover sm:h-32"
                />
            )}

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
