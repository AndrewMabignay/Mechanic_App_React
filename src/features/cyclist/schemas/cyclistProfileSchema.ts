import * as z from "zod";

export const cyclistProfileSchema = z.object({
    emergency_contact: z.string().min(11),

    default_location_lat: z.number().min(-90).max(90),

    default_location_lng: z.number().min(-180).max(180),
});

export type CyclistProfileFormData = z.infer<typeof cyclistProfileSchema>;
