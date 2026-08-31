export interface ServiceRequestImage {
    id: number;
    service_request_id: number;
    image_path: string;
    created_at: string;
    updated_at: string;
}

export interface BikeProblem {
    id: number;
    uuid: string;
    name: string;
    description: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    standard_price: number;
}

export interface ServiceRequest {
    id: number;
    uuid: string;

    cyclist_id: number;
    mechanic_id: number | null;

    bike_problem_id: number;

    request_type: string;
    description: string;

    location_lat: string;
    location_lng: string;

    status: string;

    requested_at: string;
    accepted_at: string;
    completed_at: string;

    labor_price: number;
    parts_total: number;
    final_price: number;

    created_at: string;
    updated_at: string;

    images: ServiceRequestImage[];
    bike_problem: BikeProblem;
}

export interface ServiceRequestResponse {
    success: boolean;
    message: string;
    data: ServiceRequest;
}