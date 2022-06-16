//------html------------------------//
<template>
  <!--dans le template on place le composant ShopsProduct-->
  <div class="grid p-20">
    <!-- on fait une boucle for pour récupéer chaque produit de products // et le
    mettre dans le composant ShopsProduct-->
    <ShopsProduct
      @add-product-to-cart="emit('addProductToCart', $event)"
      v-for="i in products"
      :product="i"
    />
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
//on importe le fichier ShopsProduct
import ShopsProduct from "./ShopsProduct.vue";
import type { ProductInterface } from "@/interfaces/product.interface";
//on define propriété de la clé product que l'on recoit de app.vue
//on type products grace à l'interface ProductInterface
defineProps<{
  products: ProductInterface[];
}>();

//defineEmits pour déclarer un évenement
//  l'evenement est add-product-to-cart qui se trouve dans le template
// on transforme add-product-to-cart en addProductToCart (camelcase)
//on lui passe aussi une information qu'on à besoin qui est id du produit
const emit = defineEmits<{
  (e: "addProductToCart", productId: number): void;
}>();
</script>

//-------scss------------------------------------
<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 400px;
  gap: 20px;
}
</style>
