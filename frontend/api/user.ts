import { UpdateLocation } from "@/types/user";
import { supabase } from "@/lib/supabase";
import { LOCATION_API_URL } from "./url";

export const updateLocation = async (
    payload : UpdateLocation
)=> {

    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    const res = await fetch(`${LOCATION_API_URL}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to update location');
    }
};
