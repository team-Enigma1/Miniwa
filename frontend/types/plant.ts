export type Plant = {
    id: number;
    name: string;
    description: string;
    img: string;
    season: string;
    wateringSched?: string;
    sunlight?: string;
    harvestAt: string;
    userPlantId?: number;
    growthDuration?: number;
}

export type HarvestedPlant = {
    id: number;
    userId: string;
    name: string;
    img: string;
    harvestedDate: string;
    userPlantId?: number
}