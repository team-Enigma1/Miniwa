import { supabase } from "../src/supabaseClient";

interface AuthData {
    email: string;
    password: string;
}

export const signup = async ({ email, password }: AuthData): Promise<any> => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        return { error };
    }

    return { data };
}

export const login = async ({ email, password }: AuthData): Promise<any> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return { error };
    }

    return { data };
}