//------html------------------------//
<template>
  <div class="p-20">
    <h2 class="mb-10">Panier</h2>
    <!--on transmet l'information à CartProductListavec :cart="cart"-->
    <CartProductList
      :cart="cart"
      @remove-product-from-cart="emit('removeProductFromCart', $event)"
    />
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
//on importe le fichier CartProductList
import type { ProductInterface } from "@/interfaces/product.interface";
import CartProductList from "./CartProductList.vue";

//on defini les propriétés de cart que l'on à récupéré depuis app.vue
//entre <> on défini le type typscript
defineProps<{
  cart: ProductInterface[];
}>();

//on definie l"evenement (sur le bouton supprimer)
const emit = defineEmits<{
  (e: "removeProductFromCart", productId: number): void;
}>();
</script>

//-------scss------------------------------------
<style lang="scss" scoped></style>
