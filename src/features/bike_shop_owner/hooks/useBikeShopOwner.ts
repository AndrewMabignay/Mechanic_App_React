import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBikeShop, deleteBikeShop, getBikeShopByUuid, getBikeShops, updateBikeShop } from "../api/bikeShopOwnerApi";
import type { CreateAndUpdateBikeShopFormData, PaginatedBikeShops } from "../types/bikeShopOwner";

export const useBikeShopsOwner = (page: number = 1) => {
    return useQuery({
        queryKey: ["bike-shops", page],
        queryFn: async () => {
            const { data } = await getBikeShops({ page });
            return data;
        },
    });
};

export const useCreateBikeShopByOwner = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateAndUpdateBikeShopFormData) => createBikeShop(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["bike-shops"],
            });
        },
    });
};

export const useUpdateBikeShopByOwner = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            bikeShop,
            data,
        }: {
            bikeShop: string,
            data: Partial<CreateAndUpdateBikeShopFormData>
        }) => updateBikeShop(bikeShop, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["bike-shops"],
            });
        },
    });
};

export const useBikeShopOwner = (uuid: string) => {
    return useQuery({
        queryKey: ["bike-shop", uuid],
        queryFn: () => getBikeShopByUuid(uuid),
        enabled: !!uuid,
    });
};

export const useEditBikeShopOwner = (
    uuid?: string,
    options?: {
        enabled?: boolean;
    }
) => {
    return useQuery({
        queryKey: ["bike-shop", uuid],
        queryFn: () => getBikeShopByUuid(uuid!),
        enabled: options?.enabled ?? !!uuid,
    });
};

export const useDeleteBikeShopByOwner = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) => deleteBikeShop(uuid),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["bike-shops"],
            });
        },
    });
};