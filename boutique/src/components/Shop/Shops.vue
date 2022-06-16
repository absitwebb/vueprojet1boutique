//------html------------------------//
<template>
  <div>
    <!--dans le template on place le composant ShopsProductlist-->
    <!--on envoi à ShopsProductlist-->
    <!--avec @add-product-to-cart on remonte l'information à shops-->
    <!--$event previent de l'element qui sera imit depuis le composant ShopsProductlist-->
    <ShopsProductlist
      :products="products"
      @add-product-to-cart="emit('addProductToCart', $event)"
    />
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

//defineEmits pour déclarer un évenement
//  l'evenement est add-product-to-cart qui se trouve dans le template
// on transforme add-product-to-cart en addProductToCart (camelcase)
//on lui passe aussi une information qu'on à besoin qui est id du produit
const emit = defineEmits<{
  (e: "addProductToCart", productId: number): void;
}>();
</script>

//-------scss------------------------------------
<style lang="scss" scoped></style>
