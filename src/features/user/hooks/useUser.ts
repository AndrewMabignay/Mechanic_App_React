import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser, getUsers, updateUser } from "../api/userApi";
import type { CreateUserFormData, UpdateUserFormData } from "../types/user";

export const useUsers = (params = {}) => {
    return useQuery({
        queryKey: ["users", params],
        queryFn: async () => {
            const { data } = await getUsers(params);
            return data;
        },
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateUserFormData) => createUser(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            user, 
            data,
        }: {
            user: string,
            data: Partial<UpdateUserFormData>
        }) => updateUser(user, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ user } : {
            user: string;
        }) => deleteUser(user),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });
};