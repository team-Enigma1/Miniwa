export interface Todo {
    id: string;
    user_plant_id: number;

    water: boolean;
    fertilizer: boolean;
    water_count: number;
}


export interface UpdateTodoPayload {
    user_plant_id: number;
    water_count?: number;
    fertilizer?: boolean;
}