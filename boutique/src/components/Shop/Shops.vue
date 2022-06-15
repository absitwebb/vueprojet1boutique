//------html------------------------//
<template>
  <div>
    <!--on envoi à ShopsProductlist-->
    <ShopsProductlist :products="products" />
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
import type { ProductInterface } from "@/interfaces/product.interface";
//on importe le fichier ShopsProductlist
import ShopsProductlist from "./ShopsProductlist.vue";

//on define propriété de la clé product que l'on recoit de app.vue
//on type products grace à l'interface ProductInterface
defineProps<{
  products: ProductInterface[];
}>();
</script>

//-------scss------------------------------------
<style lang="scss" scoped></style>
