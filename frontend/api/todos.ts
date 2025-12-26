import { UpdateTodoPayload, Todo } from "@/types/todo";

const TODO_API_URL = 'http://localhost:8080/todos';

export const getTodos = async (): Promise<Todo[]> => {
    const res = await fetch(`${TODO_API_URL}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`, // JWT使うなら
        },
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
