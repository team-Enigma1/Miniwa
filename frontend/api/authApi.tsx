import { supabase } from "../src/supabaseClient";

interface AuthData {
    email: string;
    password: string;
}

type LoginResult = 
    | { session: any; user: any; accessToken: string}
    | { error: any}

export const signup = async ({ email, password }: AuthData): Promise<any> => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        return { error };
    }

    return { data };
}

export const login = async ({ email, password }: AuthData): Promise<LoginResult> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.session) {
        return { error };
    }

    return { 
        session: data.session,
        user: data.user,
        accessToken: data.session.access_token
     };
}