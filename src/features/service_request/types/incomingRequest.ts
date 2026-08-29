export interface IncomingRequestResponse {
    success: boolean;
    message: string;
    data: IncomingRequest[];
}

export interface IncomingRequest {
    id: number;
    uuid: string;
    service_request_id: number;
    mechanic_id: number;
    status: "pending" | "accepted" | "declined";
    responded_at: string | null;
    remarks: string | null;
    created_at: string;
    updated_at: string;

    service_request: ServiceRequest;
}

export interface ServiceRequest {
    id: number;
    uuid: string;

    cyclist_id: number;
    mechanic_id: number | null;
    bike_problem_id: number;

    request_type: "normal" | "scheduled";

    description: string;
    image: string | null;

    location_lat: number;
    location_lng: number;

    status: "pending" | "accepted" | "completed" | "cancelled";

    requested_at: string;
    accepted_at: string | "";
    completed_at: string | "";

    cyclist: Cyclist;
    bike_problem: BikeProblem;
}

export interface Cyclist {
    id: number;
    uuid: string;
    user_id: number;
    emergency_contact: string;
    default_location_lat: number;
    default_location_lng: number;
}

export interface BikeProblem {
    id: number;
    uuid: string;
    name: string;
    description: string;
}