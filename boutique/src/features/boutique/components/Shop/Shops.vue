//------html------------------------//
<template>
  <div class="d-flex flex-row">
    <ShopFilters
      :filters="filters"
      :nbr-of-products="products.length"
      @update-filter="emit('updateFilter', $event)"
      class="shop-filter"
    />
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
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
import type { ProductInterface } from "@/interfaces/product.interface";
//on importe le fichier ShopsProductlist
import ShopsProductlist from "./ShopsProductlist.vue";
import ShopFilters from "./shopFilters.vue";
import type { filtersInterface, filterUpdate } from "@/interfaces";
//on define propriété de la clé product que l'on recoit de app.vue
//on type products grace à l'interface ProductInterface
defineProps<{
  products: ProductInterface[];
  filters: filtersInterface;
  moreResults: boolean;
}>();

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
.shop-filter {
  flex: 0 0 200px;
}
.scrollable {
  overflow-y: auto;
  height: calc(100vh - 96px);
}
</style>
