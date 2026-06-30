import * as z from "zod";

export const loginSchema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(6, "Password is required"),
});

export type LoginFormSchema = z.infer<typeof loginSchema>;