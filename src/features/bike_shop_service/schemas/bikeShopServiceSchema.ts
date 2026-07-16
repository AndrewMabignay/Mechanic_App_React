import * as z from "zod";

export const bikeShopServiceSchema = () => z.object({
    bike_shop_id: z.number().int().positive(),

    name: z
      .string()
      .min(2, "Service name is required")
      .max(255, "Service name must not exceed 255 characters"),

    description: z
      .string()
      .min(2, "Description is required")
      .max(1000, "Description must not exceed 1000 characters"),

    price: z.number().min(0),

    estimated_duration: z.number().int().min(1),

    is_available: z.boolean(),
});

export type bikeShopServiceFormData = z.infer<typeof bikeShopServiceSchema>;