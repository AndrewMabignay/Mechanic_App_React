export interface CreateServiceRequestFormData {
    bike_problem_id: number;
    description: string;
    location_lat: number;
    location_lng: number;
}

export interface ServiceRequest {
    id: number;
    uuid: string;
    cyclist_id: number;
    mechanic_id: number | null;
    bike_problem_id: number | string;
    request_type: "normal" | "scheduled";
    description: string;
    location_lat: string;
    location_lng: string;
    status: "pending" | "accepted" | "completed" | "cancelled";
    requested_at: string;
    accepted_at: string | null;
    completed_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface CreateServiceRequestResponse {
    success: boolean;
    message: string;
    data: ServiceRequest;
}