import type { filtersInterface, ProductInterface } from "@/shared/interfaces";
import { defineStore } from "pinia";
import { DEFAULT_FILTERS } from "../data/filters";

// on crée une interface regroupant toutes les autres interfaces
interface ProductSate {
  products: ProductInterface[];
  filters: filtersInterface;
  page: number;
  isLoading: boolean;
  moreResults: boolean;
}

export const useProducts = defineStore("produts", {
  state: (): ProductSate => ({
    products: [],

    filters: { ...DEFAULT_FILTERS },
    page: 1,
    isLoading: true,
    moreResults: true,
  }),
});
