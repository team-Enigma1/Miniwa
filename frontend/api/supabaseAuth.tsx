import { supabase } from "../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthData {
    email: string;
    password: string;
}

export const signup = async ({ email, password }: AuthData): Promise<any> => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        return { error };
    }

    if (data.session?.access_token) {
        await AsyncStorage.setItem("access_token", data.session.access_token);
    }

    return { data };
}

export const login = async ({ email, password }: AuthData): Promise<any> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return { error };
    }

    if (data.session?.access_token) {
        await AsyncStorage.setItem("access_token", data.session.access_token)
    }

    return { data };
}