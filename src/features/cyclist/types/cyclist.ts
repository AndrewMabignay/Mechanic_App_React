import type { User } from "../../../types/user";

export interface CyclistProfile {
    id: number;
    uuid: string;
    user_id: number;
    emergency_contact: string;
    default_location_lat: number;
    default_location_lng: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    user: User;
}

export interface CreateCyclistRequestServiceData {
    bike_problem_id: number;
    description: string;
    location_lat: number;
    location_lng: number;
    picture: File;
}