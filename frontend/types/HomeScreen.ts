export interface TodoItem {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  icon: string;
  type: 'water' | 'check' | 'fertilize';
}

export interface Plant {
   id: number;
  name: string;
  status: string;
  emoji: string;
  image?: string;
}

export interface RecommendedItem {
  id: number;
  name: string;
  category: string;
  emoji: string;
}