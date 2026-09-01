export interface ServiceRequestRating {
    id: number;
    uuid: string;
    service_request_id: number;
    mechanic_id: number;
    cyclist_id: number;
    rating: number;
    review?: string | null;
    created_at: string;
    updated_at: string;
}

export interface SubmitRatingPayload {
    rating: number;
    review?: string;
}

export interface SubmitRatingResponse {
    success: boolean;
    message: string;
    data: ServiceRequestRating;
}