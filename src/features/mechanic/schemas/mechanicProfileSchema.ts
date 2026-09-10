import * as z from "zod";

export const mechanicProfileSchema = z.object({
    skill_description: z.string().min(5, "Skill description is required."),

    latitude: z.number().min(-90).max(90),

    longitude: z.number().min(-180).max(180),

    specializations: z
        .array(z.string().min(1))
        .min(1, "Select at least one specialization."),

    years_experience: z
        .number()
        .min(0, "Years of experience must be at least 0."),

    is_available: z.boolean(),
});

export type MechanicProfileFormData = z.infer<typeof mechanicProfileSchema>;
