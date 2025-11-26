//CatalogScreen.styles

// 植物データの型定義
export interface Plant {
  id: number;
  name: string;
  description: string;
  emoji: string;
  season: string;
    status: string;
  image?: string;
}

// お気に入り状態の型定義
export interface Favorites {
  [key: number]: boolean;
}

//
