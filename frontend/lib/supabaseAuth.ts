import { supabase } from "./supabase";
import { AuthData, SignupResult, LoginResult  } from "@/types/auth";

export const signup = async (
    { email, password, username }: AuthData
): Promise<SignupResult> => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username,
            },
        },
    });

    if (error || !data.user) {
        return { error };
    }

    return {
        user: data.user,
    };
};

export const login = async (
    { email, password }: AuthData
): Promise<LoginResult> => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error || !data.session || !data.user) {
            return { error };
        }

        return {
            session: data.session,
            user: data.user,
            accessToken: data.session.access_token,
        };
    };
