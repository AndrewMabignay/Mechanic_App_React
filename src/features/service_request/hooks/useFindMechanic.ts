import { useMutation } from "@tanstack/react-query";
import { findMechanic } from "../api/serviceRequestApi";

export const useFindMechanic = () => {
    return useMutation({
        mutationFn: findMechanic,
    });
};
