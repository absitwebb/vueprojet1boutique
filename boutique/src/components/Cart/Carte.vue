//------html------------------------//
<template>
  <div class="p-20 d-flex flex-column">
    <h2 class="mb-10">Panier</h2>
    <!--on transmet l'information à CartProductListavec :cart="cart"-->
    <CartProductList
      class="flex-fill"
      :cart="cart"
      @remove-product-from-cart="emit('removeProductFromCart', $event)"
    />
    <button class="btn btn-success">Commander({{ totalPrice }}€)</button>
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
//on importe l'interface ProductCartInterface du fichier productCart.interface.ts
import type { ProductCartInterface } from "@/interfaces";
import { computed } from "vue";
//on importe le fichier CartProductList
import CartProductList from "./CartProductList.vue";

//on defini les propriétés de cart que l'on à récupéré depuis app.vue
//entre <> on défini le type typscript
const props = defineProps<{
  cart: ProductCartInterface[];
}>();

// on calcul pour obtenir le panier total
//on utilise la fonction reduce
const totalPrice = computed(() =>
  props.cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0)
);

//on definie l"evenement (sur le bouton supprimer)
const emit = defineEmits<{
  (e: "removeProductFromCart", productId: number): void;
}>();
</script>

//-------scss------------------------------------
<style lang="scss" scoped></style>
