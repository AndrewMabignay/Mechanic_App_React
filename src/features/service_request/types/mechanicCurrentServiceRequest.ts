export interface MechanicCurrentServiceRequestResponse {
    success: boolean;
    message: string;
    data: MechanicCurrentServiceRequest | null;
}

export interface MechanicCurrentServiceRequest {
    id: number;
    uuid: string;

    cyclist_id: number;
    mechanic_id: number;

    bike_problem_id: number;

    request_type: "normal" | "scheduled";

    description: string;
    image: string | null;

    location_lat: number;
    location_lng: number;

    status: "pending" | "accepted" | "completed" | "cancelled";

    requested_at: string;
    accepted_at: string;
    completed_at: string;

    created_at: string;
    updated_at: string;

    cyclist: Cyclist;

    mechanic: Mechanic;

    bike_problem: BikeProblem;

    rating: Rating | null;
}

interface Cyclist {
    id: number;
    uuid: string;
    user_id: number;

    emergency_contact: string;

    default_location_lat: number;
    default_location_lng: number;

    user: User;
}

interface Mechanic {
    id: number;
    uuid: string;

    user_id: number;

    latitude: number;
    longitude: number;

    skill_description: string;

    specializations: string[];

    years_experience: number;

    is_available: number;

    rating: number;

    total_jobs: number;

    user: User;
}

interface BikeProblem {
    id: number;
    uuid: string;

    name: string;
    description: string;
}

interface User {
    id: number;
    uuid: string;

    first_name: string;
    last_name: string;
    middle_name: string;

    email: string;
    phone: string;

    role: string;

    profile_picture: string | null;
}

interface Rating {
    id: number;
    rating: number;
    review: string | null;
}