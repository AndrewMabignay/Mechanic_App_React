import { useMutation } from "@tanstack/react-query";
import { updateMechanicLocation } from "../api/updateMechanicLocationApi";

export function useUpdateMechanicLocation() {
    return useMutation({
        mutationFn: updateMechanicLocation,
    });
}