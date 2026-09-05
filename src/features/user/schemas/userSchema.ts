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

// EDIT PERSONAL INFORMATION
export const personalInformationSchema = z.object({
    first_name: z
        .string()
        .min(1, "First name is required")
        .max(255, "First name is too long"),
    middle_name: z
        .string()
        .max(255, "Middle is too long")
        .optional()
        .or(z.literal("")),
    last_name: z
        .string()
        .min(1, "Last name is required")
        .max(255, "Last name is too long"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    phone: z
        .string()
        .min(1, "Phone number is required")
        .max(20, "Phone number is too long"),
    profile_picture: z
        .instanceof(File)
        .optional(),
});

export type PersonalInformationFormData = z.infer<typeof personalInformationSchema>;