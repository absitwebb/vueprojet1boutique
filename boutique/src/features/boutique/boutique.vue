<template>
  <div class="d-flex flex-column">
    <Shops
      @update-filter="updateFilter"
      @add-product-to-cart="addProductToCart"
      @inc-page="state.page++"
      :products="filteredProducts"
      :filters="state.filters"
      :more-results="state.moreResults"
      class="shop"
    />
    <!--composant pour affichier le panier -->
    <!--si carte est suprérieur à 0 on affiche le reste-->
    <Carte
      v-if="!cartEmpty"
      :cart="state.cart"
      class="cart"
      @remove-product-from-cart="removeProductFromCart"
    />
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
import Shops from "./components/Shop/Shops.vue";
import Carte from "./components/Cart/Carte.vue";
// import des produits qui setrouvent dans le fichier product.ts
//import data from "../../data/product";
import { computed, provide, reactive, toRef, watch, watchEffect } from "vue";
// import de l'interface ProductInterface se trouant dans le fichier  product.interface.ts
import type { ProductInterface } from "../../interfaces/product.interface";
import type {
  filtersInterface,
  ProductCartInterface,
  filterUpdate,
} from "../../interfaces";
import { DEFAULT_FILTERS } from "../../features/boutique/data/filters";
import { fectProduct } from "@/shared/services/product.services";
import { array } from "zod";
import { pageKey } from "@/shared/services/injectionKeys/pageKey";

import { useProducts } from "./stores/productStore";
import { useCart } from "./stores/cartStore";

//on récupère nos stores (pinia)
const productStore = useProducts();
const cartStore = useCart();

//contient tous nos produits
//ProductInterface permet de vérifier que les produits correspondent aux types définie dans ProductInterface
const products = reactive<ProductInterface[]>(data);
//on met dans cart les produits selectionnés pour le panier
const cart = reactive<ProductInterface[]>([]);
//au lieu d'avoir deux lignes (si dessus) on mets products et carte dans un objet

// watch(
//   () => state.filters.category && state.filters.priceRange,
//   () => {
//     state.page = 1;
//     state.products = [];
//   }
// );
</script>

//-------scss------------------------------------
<style scoped lang="scss">
@import "../../assets/base.scss";
</style>
