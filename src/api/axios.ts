import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: "application/json",
    },
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("bike_mechanic_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Response interceptor
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("bike_mechanic_token");
            localStorage.removeItem("bike_mechanic_user");
            localStorage.removeItem("bike_mechanic_role");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    },
);

export default axiosClient;
