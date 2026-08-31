import * as z from "zod";

export const requestMechanicSchema = z.object({
    bike_problem: z
        .number()
        .min(1, "Please select a bike problem."),

    location_lat: z.coerce
        .number()
        .min(-90, "Invalid latitude.")
        .max(90, "Invalid latitude."),

    location_lng: z.coerce
        .number()
        .min(-180, "Invalid longitude.")
        .max(180, "Invalid longitude."),

    description: z
        .string()
        .max(1000, "Description must not exceed 1000 characters."),

    images: z
        .array(z.instanceof(File))
        .min(1, "Please upload at least 1 image.")
        .max(5, "You can upload a maximum of 5 images."),
});

export type RequestMechanicFormData = z.infer<typeof requestMechanicSchema>;