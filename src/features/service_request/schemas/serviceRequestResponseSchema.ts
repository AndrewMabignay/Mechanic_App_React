import { z } from "zod";

export const serviceRequestResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        id: z.number(),
        uuid: z.string(),

        cyclist_id: z.number(),
        mechanic_id: z.number().nullable(),
        bike_problem_id: z.union([z.number(), z.string()]),

        request_type: z.enum(["normal", "scheduled"]),
        description: z.string(),

        location_lat: z.string(),
        location_lng: z.string(),

        status: z.enum(["pending", "accepted", "completed", "cancelled"]),

        requested_at: z.string(),
        accepted_at: z.union([z.string(), z.literal("")]).nullable(),
        completed_at: z.union([z.string(), z.literal("")]).nullable(),

        created_at: z.string(),
        updated_at: z.string(),
    }),
});

export type ServiceRequestResponse = z.infer<typeof serviceRequestResponseSchema>;