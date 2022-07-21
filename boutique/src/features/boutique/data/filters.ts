import type { filtersInterface } from "@/interfaces";

export const DEFAULT_FILTERS: filtersInterface = {
  search: "",
  priceRange: [0, 10000],
  category: "all",
};
