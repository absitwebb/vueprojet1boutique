//------html------------------------//
<template>
  <div class="d-flex flex-column">
    <!--$event permet de récupérer le paramètre de l'evenement passé depuis carProduct-->
    <CartProduct
      v-for="i of cart"
      :product="i"
      @remove-product-from-cart="emit('removeProductFromCart', $event)"
    />
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
//on importe le fichier CartProduct
import CartProduct from "./CartProduct.vue";
//on importe l'interface ProductCartInterface du fichier productCarte.interface.ts

import type { ProductCartInterface } from "@/interfaces";

//on defini les propriétés de cart que l'on à récupéré depuis carte.vue
//entre <> on défini le type typscript
defineProps<{
  cart: ProductCartInterface[];
}>();

//on definie l"evenement (sur le bouton supprimer)
const emit = defineEmits<{
  (e: "removeProductFromCart", productId: number): void;
}>();
</script>

//-------scss------------------------------------
<style lang="scss" scoped></style>
