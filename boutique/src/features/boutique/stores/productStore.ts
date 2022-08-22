import { seed, seed50articles } from "@/shared/data/seed";
import type {
  filtersInterface,
  ProductInterface,
  filterUpdate,
} from "@/shared/interfaces";
import { fectProduct } from "@/shared/services/product.services";
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

  getters: {
    filteredProducts(state) {
      return state.products.filter((product) =>
        product.title
          .toLocaleLowerCase()
          .startsWith(state.filters.search.toLocaleLowerCase())
      );
    },
  },
  actions: {
    async fetchProducts() {
      this.isLoading = true;
      const products = await fectProduct(this.filters, this.page);
      if (Array.isArray(products)) {
        // on ajoute resultat dans state.products; on rajoute ensuite(...products,...products)des produits dans state.products
        this.products = [...products, ...products];
        if (products.length < 20) {
          this.moreResults = false;
        }
      } else {
        this.products = [...this.products, products];
      }
      this.isLoading = false;
    },
    //--------------actions updateFiltrer: mise à jour du filtre-----------------
    updateFilter(filterUpdate: filterUpdate) {
      if (filterUpdate.search !== undefined) {
        this.filters.search = filterUpdate.search;
      } else if (filterUpdate.priceRange) {
        this.filters.priceRange = filterUpdate.priceRange;
      } else if (filterUpdate.category) {
        this.filters.category = filterUpdate.category;
      } else {
        this.filters = { ...DEFAULT_FILTERS };
      }
    },
    incPage() {
      this.page++;
    },
    seed() {
      seed("vueprojectproducts");
      seed50articles("vueprojectproducts");
    },
  },
});
