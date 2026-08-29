export interface BikeProblem {
    id: number;
    uuid: string;
    name: string;
}

export interface BikeProblemResponse {
    data: BikeProblem[];
}