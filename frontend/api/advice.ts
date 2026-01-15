import { Advice } from "@/types/advice";
import { ADVICE_API_URL } from "./url";
import { supabase } from "@/lib/supabase";

export const getAdvice = async ():Promise<Advice> => {
    try {

        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;

        const res = await fetch(ADVICE_API_URL,{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
        },
    });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("getAdvice error:", error);
        throw error;
    }
};
