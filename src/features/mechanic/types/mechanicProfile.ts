// Data from the API
export interface MechanicProfile { 
    id: number;
    uuid: string;
    user_id: number;
    latitude: string;
    longitude: string;
    skill_description: string;
    specializations: string[];
    years_experience: string;
    is_available: string;
    rating: number;
    total_jobs: number;
    created_at: string;
    updated_at: string;
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