import { useQuery } from "@tanstack/react-query";
import { getBikeProblemOptions } from "../api/bikeProblemRequestApi";

export const useBikeProblemOptions = () => {
    return useQuery({
        queryKey: ["bike-problem-options"],
        queryFn: getBikeProblemOptions,
    });
};