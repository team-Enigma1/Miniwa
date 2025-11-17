export interface Plant {
  id: number;
  name: string;
  description: string;
  emoji: string;
  season: string;
}

export interface Favorites {
  [key: number]: boolean;
}