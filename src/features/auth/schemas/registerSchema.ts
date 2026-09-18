import * as z from "zod";

export const registerSchema = z
    .object({
        first_name: z.string().min(2, "First name is required").max(255),
        last_name: z.string().min(2, "Last name is required").max(255),
        middle_name: z.string().optional().or(z.literal("")),
        email: z.email("Email is required").max(255),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(
                /[A-Z]/,
                "Password must contain at least one uppercase letter",
            )
            .regex(
                /[a-z]/,
                "Password must contain at least one lowercase letter",
            )
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(
                /[^A-Za-z0-9]/,
                "Password must contain at least one special character",
            ),
        password_confirmation: z.string(),
        phone: z.string().max(20),
        role: z.enum(["cyclist", "mechanic"]),
        profile_picture: z.instanceof(File).optional(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        path: ["password_confirmation"],
        message: "Passwords do not match.",
    });

export type RegisterFormData = z.infer<typeof registerSchema>;
