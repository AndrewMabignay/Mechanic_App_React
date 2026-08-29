import { useQuery } from "@tanstack/react-query";
import { getBikeProblems } from "../api/bikeProblemApi";

export function useBikeProblems() {
    return useQuery({
        queryKey: ["bikeProblems"],
        queryFn: getBikeProblems,
    });
}