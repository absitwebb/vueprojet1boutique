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

// on va chercher les produits avec fetch
// si fetch renvoie tableau Array.isArray(products) on copie  dans  state.products
// si fetch renvoie un objet(juste un article) on copie dans un tableau puis dans  state.products
//________________________________________________________________________________________

// watchEffect(async () => {
//   state.isLoading = true;
//   const products = await fectProduct(state.filters, state.page);
//   if (Array.isArray(products)) {
//     // on ajoute resultat dans state.products; on rajoute ensuite(...products,...products)des produits dans state.products
//     state.products = [...products, ...products];
//     if (products.length < 20) {
//       state.moreResults = false;
//     }
//   } else {
//     state.products = [...state.products, products];
//   }
//   state.isLoading = false;
// });

//_________________________________________________________________________________________

// function updateFilter(filterUpdate: filterUpdate) {
//   if (filterUpdate.search !== undefined) {
//     state.filters.search = filterUpdate.search;
//   } else if (filterUpdate.priceRange) {
//     state.filters.priceRange = filterUpdate.priceRange;
//   } else if (filterUpdate.category) {
//     state.filters.category = filterUpdate.category;
//   } else {
//     state.filters = { ...DEFAULT_FILTERS };
//   }
// }
//________________________________________________________________________________
//------------------------on filtre les produits-------------------
//on retourn la liste des produits en prenant la considération des filtres
// pour cela on récupère les produits et dessus on utilise la fonction filtrer
// on va utiliser filtrer sur chacun des élements du produit. si filtrer return true on garde l'élément

// const filteredProducts = computed(() => {
//   return state.products.filter((product) => {
//     if (
//       //on vérifie si titre du produit dans search(qui sera un input) commence  bien
//       product.title
//         .toLocaleLowerCase()
//         .startsWith(state.filters.search.toLocaleLowerCase()) &&
//       // on vérifie ensuite si le prix du produit est égal ou supérieur à priceRange[0](input)
//       // et égal ou inférieur à priceRange[1](input)
//       product.price >= state.filters.priceRange[0] &&
//       product.price <= state.filters.priceRange[1] &&
//       // et on vérifie la catégorie du produit
//       (product.category === state.filters.category ||
//         state.filters.category === "all")
//     ) {
//       return true;
//     } else {
//       false;
//     }
//   });
// });
