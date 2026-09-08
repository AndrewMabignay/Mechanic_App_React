import type { User } from "../../user/types/user";

// Data from the API
export interface MechanicProfile {
    id: number;
    uuid: string;
    user_id: number;
    latitude: number;
    longitude: number;
    skill_description: string;
    specializations: string[];
    years_experience: number;
    is_available: boolean;
    rating: number;
    total_jobs: number;
    created_at: string;
    updated_at: string;
    user: User;
}

// Request body for create/update
export interface CreateAndUpdateMechanicProfileFormData {
    skill_description: string;
    latitude: number;
    longitude: number;
    specializations: string[];
    years_experience: number;
    is_available: boolean;
}

// API response
export interface MechanicProfileResponse {
    success: boolean;
    message: string;
    data: MechanicProfile;
}
