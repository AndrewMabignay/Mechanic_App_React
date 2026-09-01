import * as z from "zod";

export const sendServiceMessageSchema = z.object({
    message: z
        .string()
        .min(1, "Message is required.")
        .max(1000, "Message must not exceed 1000 characters."),
});

export type SendServiceMessageFormData = z.infer<
    typeof sendServiceMessageSchema
>;