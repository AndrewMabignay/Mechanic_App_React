export const clearAuthData = () => {
    localStorage.removeItem("bike_mechanic_token");
    localStorage.removeItem("bike_mechanic_user");
    localStorage.removeItem("bike_mechanic_role");
};
