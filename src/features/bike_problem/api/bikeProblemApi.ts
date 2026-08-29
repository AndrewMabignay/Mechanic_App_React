import api from "../../../api/axios";
import type { BikeProblemResponse } from "../types/bikeProblem";

export const getBikeProblems = async (): Promise<BikeProblemResponse> => {
    const response = await api.get("/cyclists/bike-problem-options");

    return response.data;
};