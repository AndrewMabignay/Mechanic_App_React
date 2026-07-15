import axios from "axios";

const axiosClient = axios.create({
    baseURL: '/api',
    headers: {
        Accept: "application/json"
    }
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("bike_mechanic_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosClient;