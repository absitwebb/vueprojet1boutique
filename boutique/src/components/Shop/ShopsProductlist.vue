//------html------------------------//
<template>
  <div class="grid p-20">
    <!-- on fait une boucle for pour récupéer chaque produit de products // et le
    mettre dans le composant ShopsProduct-->
    <ShopsProduct v-for="i in products" :product="i" />
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
