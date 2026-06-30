import * as z from "zod";

export const userSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    middle_name: z.string().optional(),
    email: z.email(),
    password: z.string().min(8),
    password_confirmation: z.string(),
    phone: z.string(),
    role: z.enum(["admin", "cyclist", "mechanic", "bike_shop_owner", "cyclist_mechanic"]),
});

export type UserFormData = z.infer<typeof userSchema>;