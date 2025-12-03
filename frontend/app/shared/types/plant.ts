export interface Plant {
  id: string;
  name: string;
  type: string;
  species?: string;
  description?: string;
  careInstructions?: string;
  waterFrequency: number;
  lastWatered: string;
  nextWatering: string;
  health: 'excellent' | 'good' | 'warning' | 'critical';
  image: string;
  location?: string;
  sunlight?: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface CareTask {
  id: string;
  plantId: string;
  type: 'watering' | 'fertilizing' | 'pruning' | 'checkup' | 'repotting';
  date: string; // YYYY-MM-DD format
  time: string; // HH:MM AM/PM format
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  recurrence: 'none' | 'daily' | 'weekly' | 'monthly';
  notes: string;
}

export type PlantHealth = Plant['health'];