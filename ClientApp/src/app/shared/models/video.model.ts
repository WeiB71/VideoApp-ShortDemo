import { Category } from "./category.model";

export interface Video {
    id: number;
    title?: string;
    description?: string;
    filePath?: string;
    thumbnailPath?: string;
    categoryId?: string; // Add this property
    categoryName: string;
    thumbnail: string;
  }
  