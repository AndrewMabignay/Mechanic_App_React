import * as z from "zod";

export const bikeShopOwnerSchema = () => z.object({
    name: z.string().min(2, "Shop name is required").max(255),
    description: z.string().min(2, "Description is required").max(500),
    address: z.string().min(2, "Address is required").max(500),
    latitude: z.coerce.number().min(-90).max(90),
    longitude: z.coerce.number().min(-180).max(180),
    phone: z
        .string()
        .min(1, "Phone is required")
        .max(20),
    opening_time: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid opening time"),
    closing_time: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid closing time"),
    is_open: z.boolean(),
});

export type BikeShopOwnerFormData = z.infer<typeof bikeShopOwnerSchema>;