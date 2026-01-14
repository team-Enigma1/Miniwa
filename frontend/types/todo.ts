export type Todo = {
    id: number;
    user_plant_id: number;

    water: boolean;
    fertilizer: boolean;
    water_count: number;
}


export type UpdateTodoPayload = {
    user_plant_id: number;
    water_count?: number;
    fertilizer?: boolean;
}