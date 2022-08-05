//------html------------------------//
<template>
  <div class="cart-container">
    <div
      class="cart-holder d-flex flex-row justify-content-center align-items-center"
    >
      <span class="tag">{{ cart.length }}</span>
      <i class="fas fa-shopping-basket"></i>
    </div>
    <!--
   <div class="p-20 d-flex flex-column">
      <h2 class="mb-10">Panier</h2>
     on transmet l'information à CartProductListavec :cart="cart"
      <CartProductList
        class="flex-fill"
        :cart="cart"
        @remove-product-from-cart="emit('removeProductFromCart', $event)"
      />
      <button class="btn btn-success">Commander({{ totalPrice }}€)</button>
    </div> 
    -->
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
  (e: "removeProductFromCart", productId: string): void;
}>();
</script>

//-------scss------------------------------------
<style lang="scss" scoped>
@import "@/assets/base.scss";
.cart-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
.tag {
  width: 15px;
  font-size: 10px;
  line-height: 15px;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
  background-color: $colordanger-1;
  position: absolute;
  top: 0px;
  right: 0px;
  color: $colortext-primary;
}
.cart-holder {
  position: relative;
  background-color: $colorprimary-1;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: $colorprimary-2;
  }
  width: 50px;
  height: 50px;
  border-radius: 50%;
  i {
    font-size: 20px;
    color: $colortext-primary;
  }
}
</style>
