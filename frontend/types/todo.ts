export type Todo = {
    id: number;
    user_plant_id: number;

    water: boolean;
    water_required: number;
    fertilizer: boolean;
}


export type UpdateTodoPayload = {
    user_plant_id: number;
    water_count?: number;
    fertilizer?: boolean;
}