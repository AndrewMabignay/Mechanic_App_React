import type { CyclistProfile } from "./cyclist";

export interface Bicycle {
    id: number;
    uuid: string;
    cyclist_id: number;
    brand: string;
    model: string;
    type: string;
    frame_size: string;
    color: string;
    year: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    cyclist_profile: CyclistProfile
}

export interface BicycleResponse {
    current_page: number;
    data: Bicycle[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    per_page: number;
    to: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}