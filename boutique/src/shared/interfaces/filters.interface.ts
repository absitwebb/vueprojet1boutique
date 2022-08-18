import type { Category } from "./types";

export interface filtersInterface {
  search: string;
  priceRange: [number, number];
  category: Category;
}

export interface filterUpdate {
  search?: string;
  priceRange?: [number, number];
  category?: Category;
}
