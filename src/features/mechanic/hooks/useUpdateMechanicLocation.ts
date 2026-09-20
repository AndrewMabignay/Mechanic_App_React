import { useMutation } from "@tanstack/react-query";
import { updateMechanicLocation } from "../api/mechanicProfileApi";

export function useUpdateMechanicLocation() {
    return useMutation({
        mutationFn: updateMechanicLocation,
    });
}
