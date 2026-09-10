import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createMechanicProfile,
    getMechanicProfile,
    updateMechanicAvailability,
    updateMechanicProfile,
} from "../api/mechanicProfileApi";
import type { CreateAndUpdateMechanicProfileFormData } from "../types/mechanicProfile";

// DISPLAY MECHANIC PROFILE
export const useMechanicProfile = (enabled = true) =>
    useQuery({
        queryKey: ["mechanic-profile"],
        queryFn: getMechanicProfile,
        enabled,
        retry: false,
        refetchOnWindowFocus: false,
    });

// CREATE MECHANIC PROFILE
export const useCreateMechanicProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateAndUpdateMechanicProfileFormData) =>
            createMechanicProfile(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["mechanic-profile"],
            });
        },
    });
};

// UDPATE MECHANIC PROFILE
export const useUpdateMechanicProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            uuid,
            data,
        }: {
            uuid: string;
            data: Partial<CreateAndUpdateMechanicProfileFormData>;
        }) => updateMechanicProfile(uuid, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["mechanic-profile"],
            });
        },
    });
};

// Handles updating the mechanic's availability status.
export function useUpdateMechanicAvailability() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) => updateMechanicAvailability(uuid),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["mechanic-profile"],
            });
        },
    });
}
