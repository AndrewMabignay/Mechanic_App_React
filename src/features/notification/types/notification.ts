export interface Notification {
    id: number;
    uuid: string;
    user_id: string;
    service_request_id: number | null;
    title: string;
    message: string;
    type: string;
    is_read: number;
    deleted_at: string | null;
    created_at: string;
}

export interface NotificationResponse {
    success: boolean;
    message: string;
    data: {
        current_page: number;
        data: Notification[];
        first_page_url: string;
        from: number | null;
        last_page: number;
        last_page_url: string;
        per_page: number;
        prev_page_url: string | null;
        next_page_url: string | null;
        to: number | null;
        total: number;
    };
}
