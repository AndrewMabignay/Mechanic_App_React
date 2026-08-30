import api from "../../../api/axios";

export const getCyclistBicycles = (params?: { page: number }) => {
    return api.get("cyclist/bicycle", { params });
}