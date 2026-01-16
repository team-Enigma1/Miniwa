export interface Todo {
    id: number;
    user_plant_id: number;

    water: number;
    water_required: number;
    fertilizer: boolean;
}


export interface UpdateTodoPayload {
    user_plant_id: number;
    water_count?: number;
    fertilizer?: boolean;
}