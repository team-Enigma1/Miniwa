export interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  followers?: number;
  following?: number;
  plantsCount?: number;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  images: string[];
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  tags: string[];
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

export interface Question {
  id: string;
  user: User;
  title: string;
  content: string;
  tags: string[];
  timestamp: Date;
  answers: number;
  views: number;
  isSolved: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  seller: User;
  isFavorite: boolean;
}


export interface ImagePickerResult {
  cancelled: boolean;
  assets?: Array<{
    uri: string;
    width: number;
    height: number;
    type?: string;
    fileName?: string;
  }>;
}

export interface CreatePostData {
  content: string;
  images: string[];
  tags: string[];
  userId: string;
}

export interface PostFormState {
  content: string;
  selectedImages: string[];
  selectedTags: string[];
  isLoading: boolean;
}