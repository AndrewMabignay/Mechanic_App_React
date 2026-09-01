export interface ServiceMessageSender {
    id: number;
    uuid: string;
    first_name: string;
    last_name: string;
}

export interface ServiceMessage {
    id: number;
    service_request_id: number;
    sender_id: number;
    message: string;
    created_at: string;
    updated_at: string;
    sender: ServiceMessageSender;
}

export interface ServiceMessagesResponse {
    success: boolean;
    message: string;
    data: ServiceMessage[];
}

export interface ServiceMessageResponse {
    success: boolean;
    message: string;
    data: ServiceMessage;
}