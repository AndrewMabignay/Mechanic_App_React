import type { ServiceRequest } from "./serviceRequest";

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
