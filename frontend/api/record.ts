import { Record} from "@/types/record";
import { supabase } from "@/lib/supabase";
import { GET_PLANT_RECORD_API_URL, CREATE_PLANT_RECORD_API_URL, UPDATE_PLANT_RECORD_API_URL, DELETE_PLANT_RECORD_API_URL } from "./url";

export const getPlantRecord = async (user_plant_id: number) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (!token) {
    throw new Error("No access token");
  }

  const res = await fetch(GET_PLANT_RECORD_API_URL(user_plant_id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch plant record");
  }

  return await res.json();
};

export const createPlantRecord = async (
  payload: Partial<Record>
) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (!token) throw new Error("No access token");

  const res = await fetch(CREATE_PLANT_RECORD_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create plant record");
  }

  return await res.json();
};

export const updatePlantRecord = async (
  recordId: number,
  payload: Partial<Record>
) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (!token) throw new Error("No access token");

  const res = await fetch(UPDATE_PLANT_RECORD_API_URL(recordId), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to update plant record");
  }

  return await res.json();
};

export const deletePlantRecord = async (recordId: number) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (!token) {
    throw new Error("No access token");
  }

  const res = await fetch(DELETE_PLANT_RECORD_API_URL(recordId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete plant record");
  }
};

