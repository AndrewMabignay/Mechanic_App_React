import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const requestMechanicSchema = z.object({
    bike_problem_id: z.coerce.number().int(),

    description: z
        .string()
        .min(1, "Description is required")
        .max(500),

    location_lat: z.coerce.number(),

    location_lng: z.coerce.number(),

    picture: z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: "Image must not exceed 5MB.",
        })
        .refine(
            (file) =>
                ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
                    file.type
                ),
            {
                message: "Only JPG, JPEG, PNG, and WEBP images are allowed.",
            }
        ),
});

export type RequestMechanicFormData = z.infer<typeof requestMechanicSchema>;