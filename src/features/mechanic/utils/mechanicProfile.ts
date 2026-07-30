import { getMechanicProfile } from "../api/mechanicProfileApi";

// HAS MECHANIC PROFILE FUNCTION
export async function hasMechanicProfile() {
    try {
        const response = await getMechanicProfile();
        return response !== null;
    } catch (error) {
        console.log(error);
        return false;
    }
}