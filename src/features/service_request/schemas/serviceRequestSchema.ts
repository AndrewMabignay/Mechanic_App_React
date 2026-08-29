import * as z from "zod";

export const serviceRequestSchema = z.object({
    bike_problem_id: z.number()
        .min(1, "Please select a bike problem."),

    description: z
        .string()
        .trim()
        .min(1, "Description is required.")
        .max(500, "Description must not exceed 500 characters."),

    location_lat: z.number({
        error: "Latitude is required.",
    }),

    location_lng: z.number({
        error: "Longitude is required.",
    }),
});

export type ServiceRequestFormData = z.infer<typeof serviceRequestSchema>;