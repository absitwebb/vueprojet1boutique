//------html------------------------//
<template>
  <div class="d-flex flex-row shop-container">
    <ShopFilters
      v-if="state.open"
      :filters="filters"
      :nbr-of-products="products.length"
      @update-filter="emit('updateFilter', $event)"
      class="shop-filter"
    />
    <div class="d-flex flex-column">
      <button
        @click="state.open = !state.open"
        class="btn btn-primary d-flex flex-row justify-content-center align-items-center"
      >
        <i class="fas fa-search m-10"></i>
        <span>Rechercher</span>
      </button>

      <!--dans le template on place le composant ShopsProductlist-->
      <!--on envoi à ShopsProductlist-->
      <!--avec @add-product-to-cart on remonte l'information à shops-->
      <!--$event previent de l'element qui sera imit depuis le composant ShopsProductlist-->
      <ShopsProductlist
        class="flex-fill scrollable"
        :products="products"
        :more-results="moreResults"
        @add-product-to-cart="emit('addProductToCart', $event)"
        @inc-page="emit('incPage')"
      />
    </div>
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
import type { ProductInterface } from "@/interfaces/product.interface";
//on importe le fichier ShopsProductlist
import ShopsProductlist from "./ShopsProductlist.vue";
import ShopFilters from "./shopFilters.vue";
import type { filtersInterface, filterUpdate } from "@/interfaces";
import { reactive } from "vue";
//on define propriété de la clé product que l'on recoit de app.vue
//on type products grace à l'interface ProductInterface
defineProps<{
  products: ProductInterface[];
  filters: filtersInterface;
  moreResults: boolean;
}>();

const state = reactive<{
  open: boolean;
}>({
  open: false,
});
//defineEmits pour déclarer un évenement
//  l'evenement est add-product-to-cart qui se trouve dans le template
// on transforme add-product-to-cart en addProductToCart (camelcase)
//on lui passe aussi une information qu'on à besoin qui est id du produit
const emit = defineEmits<{
  (e: "addProductToCart", productId: string): void;
  (e: "updateFilter", updateFilters: filterUpdate): void;
  (e: "incPage"): void;
}>();
</script>

//-------scss------------------------------------
<style lang="scss" scoped>
@import "@/assets/base.scss";
.shop-filter {
  flex: 0 0 200px;
  @include xs {
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: white;
  }
}
.shop-container {
  position: relative;
}
button {
  margin: 20px 20px 10px 20px;
  @include sm {
    display: none;
  }
}
.scrollable {
  overflow-y: auto;
  height: calc(100vh - 96px);
}
</style>
