import { User, UpdateLocation } from "@/types/user";
import { supabase } from "@/lib/supabase";
import { USER_DATA_API_URL, LOCATION_API_URL, UPDATE_USER_API_URL, USER_PLANTS_API_URL } from "./url";

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

export const getUserData = async () => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (!token) {
    throw new Error("No access token");
  }

  const res = await fetch(USER_DATA_API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  return await res.json();
};

export const updateUserData = async (payload: User) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    
    if (!token) {
      throw new Error("No access token");
    }

    const res = await fetch(UPDATE_USER_API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to update user data");
    }

    return await res.json();
}

export const getUserPlants = async () => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    
    if (!token) {
      throw new Error("No access token");
    }

    const res = await fetch(USER_PLANTS_API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Failed to fetch user plants');
    }

    return await res.json();
}
