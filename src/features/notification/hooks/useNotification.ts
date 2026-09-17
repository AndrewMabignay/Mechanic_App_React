import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    markAsAllRead,
    markAsRead,
    notifications,
} from "../api/notificationApi";

export const useNotification = () => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: notifications,
    });
};

export const useMarkAsReadNotification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: markAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notifications"],
            });
        },
    });
};

export const useMarkAsAllReadNotification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: markAsAllRead,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notifications"],
            });
        },
    });
};
