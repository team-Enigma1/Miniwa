import { UpdateTodoPayload, Todo } from "@/types/todo";
import { supabase } from "@/lib/supabase";
import { TODO_API_URL } from "./url";

export const getTodos = async (): Promise<Todo[]> => {

    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    const res = await fetch(`${TODO_API_URL}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
            user_plant_id: 1,
        }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to fetch todos');
    }

    return res.json();
};

export const updateTodo = async (
    payload: UpdateTodoPayload
): Promise<Todo[]> => {
    const res = await fetch(`${TODO_API_URL}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`, // JWT使うなら
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to update todo');
    }

    return res.json();
};
