import * as z from "zod";

export const cyclistProfileSchema = z.object({
    emergency_contact: z.string().min(11),
    default_location_lat: z.number(),
    default_location_lng: z.number(),
});

export type CyclistProfileFormData = z.infer<typeof cyclistProfileSchema>;