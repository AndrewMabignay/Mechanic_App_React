export interface BikeProblem {
    id: number;
    uuid: string;
    name: string;
    description: string;
}

export interface Mechanic {
    id: number;
    uuid: string;
    user_id: number;
    latitude: number;
    longitude: number;
    skill_description: string;
    specializations: string[];
    years_experience: string;
    is_available: string;
    rating: number;
    total_jobs: number;
    created_at: string;
    updated_at: string;
}

export interface CurrentServiceRequest {
    id: number;
    uuid: string;
    cyclist_id: number;
    mechanic_id: number | null;
    bike_problem_id: number;
    request_type: "normal" | "sos";
    description: string;
    image: string | null;
    location_lat: number;
    location_lng: number;
    status: "pending" | "accepted" | "completed" | "cancelled";
    requested_at: string;
    accepted_at: string | null | "";
    completed_at: string | null | "";
    created_at: string;
    updated_at: string;
    bike_problem: BikeProblem;
    mechanic: Mechanic | null;
}

export interface CurrentServiceRequestResponse {
    success: boolean;
    message: string;
    data: CurrentServiceRequest;
}