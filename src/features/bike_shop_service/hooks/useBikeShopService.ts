import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBikeShopServices, deleteBikeShopServices, getBikeShopOptions, getBikeShopServices } from "../api/bikeShopServiceApi";
import type { CreateAndUpdateBikeShopServiceFormData } from "../types/bikeShopService";

export const useBikeShopsService = (params : {
    page: number;
    per_page: number;
}) => {
    return useQuery({
        queryKey: ["bike-shop-services", params],
        queryFn: async () => {
            const { data } = await getBikeShopServices(params);
            return data;
        },
    });
};

export const useBikeShopOptions = () => {
    return useQuery({
        queryKey: ["bike-shop-services"],
        queryFn: async () => {
            const { data } = await getBikeShopOptions();
            return data;
        },
    });
};

export const useCreateBikeShopServiceByOwner = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateAndUpdateBikeShopServiceFormData) => createBikeShopServices(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["bike-shop-services"],
            });
        },
    });
};

export const useDeleteBikeShopServiceByOwner = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ bikeShopService } : {
            bikeShopService: string;
        }) => deleteBikeShopServices(bikeShopService),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["bike-shop-services"],
            });
        },
    });
};