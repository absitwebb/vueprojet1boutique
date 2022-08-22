<template>
  <div class="d-flex flex-column">
    <Shops
      @update-filter="updateFilter"
      @add-product-to-cart="addProductToCart"
      @inc-page="incPage"
      :products="productStore.filteredProducts"
      :filters="productStore.filters"
      :more-results="productStore.moreResults"
      :page="productStore.page"
      class="shop"
    />
    <!--composant pour affichier le panier -->
    <!--si carte est suprérieur à 0 on affiche le reste-->
    <Carte
      v-if="!cartStore.cartEmpty"
      :cart="cartStore.cart"
      class="cart"
      @remove-product-from-cart="removeProductFromCart"
    />
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
import Shops from "./components/Shop/Shops.vue";
import Carte from "./components/Cart/Carte.vue";

import type { filterUpdate } from "@/shared/interfaces";

import { useProducts } from "./stores/productStore";
import { useCart } from "./stores/cartStore";

//on récupère nos stores (pinia)
const productStore = useProducts();
//productStore.seed();
productStore.fetchProducts();
const cartStore = useCart();

function updateFilter(filterUpdate: filterUpdate) {
  productStore.updateFilter(filterUpdate);
}
//pour incrémenter la page
function incPage() {
  productStore.incPage();
}

// pour afficher le produit sélectionné
function addProductToCart(productId: string) {
  cartStore.addProductToCart(productId);
}
//pour supprimer un produit sélectionné
function removeProductFromCart(productId: string) {
  cartStore.removeProductFromCart(productId);
}

productStore.$onAction(({ name, after, args }) => {
  if (name === "updateFilter" && !args[0].search!) {
    after(() => {
      productStore.page = 1;
      productStore.products = [];
      productStore.moreResults = true;
      productStore.fetchProducts();
    });
  } else if (name === "incPage") {
    after(() => {
      productStore.fetchProducts();
    });
  }
});

//contient tous nos produits
//ProductInterface permet de vérifier que les produits correspondent aux types définie dans ProductInterface
//const products = reactive<ProductInterface[]>(data);
//on met dans cart les produits selectionnés pour le panier
//const cart = reactive<ProductInterface[]>([]);
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
