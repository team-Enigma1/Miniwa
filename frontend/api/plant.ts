import { supabase } from "@/lib/supabase";
import { HARVESTED_PLANTS_API_URL, DELETE_PLANT_API_URL, HARVEST_PLANT_API_URL, PLANT_GROWTH_IMG_API_URL } from "./url";
import { HarvestedPlant,PlantGrowthImg } from "@/types/plant";

export const getHarvestedPlants = async (): Promise<HarvestedPlant[]> => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    if (!token) {
        throw new Error('No auth token found');
    }

    const res = await fetch(HARVESTED_PLANTS_API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch harvested plants');
    }

    const raw = await res.json();
    return raw.map((item: any) => ({
        id: item.id,
        userId: item.user_id,
        name: item.pname,
        img: item.image_url,
        harvestedDate: item.harvested_date,
    }));
}

export const deleteUserPlant = async (userPlantId: number) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  const res = await fetch(DELETE_PLANT_API_URL(userPlantId), {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete plant");
  }
};

export const harvestPlant = async (userPlantId: number) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  const res = await fetch(HARVEST_PLANT_API_URL(userPlantId), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to harvest plant");
  }
};

export const plantGrowthImg = async (userPlantId: number): Promise<PlantGrowthImg[]> => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    if (!token) {
      throw new Error("No access token");
    }

    const res = await fetch(PLANT_GROWTH_IMG_API_URL(userPlantId), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch plant growth image');
    }

    return res.json()
}