import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCyclistProfile, getCyclistProfile, updateCyclistProfile } from "../api/cyclist-profile";
import type { CreateAndUpdateCyclistProfileFormData } from "../types/cylistProfile";

// DISPLAY CYCLIST PROFILE 
export const useCyclistProfile = () =>
    useQuery({
        queryKey: ["cyclist-profile"],
        queryFn: getCyclistProfile,
    });

// CREATE CYCLIST PROFILE
export const useCreateCyclistProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateAndUpdateCyclistProfileFormData) => createCyclistProfile(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cyclist-profile"],
            });
        },
    });
};

// UPDATE CYCLIST PROFILE
export const useUpdateCyclistProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            uuid,
            data,
        }: {
            uuid: string;
            data: Partial<CreateAndUpdateCyclistProfileFormData>
        }) => updateCyclistProfile(uuid, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cyclist-profile"],
            });
        },
    });
};