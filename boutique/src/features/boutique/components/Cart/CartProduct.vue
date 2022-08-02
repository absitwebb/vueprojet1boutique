//------html------------------------//
<template>
  <div class="mb-10 p-10 d-flex flex-row align-items-center product">
    <strong class="mr-10">{{ product.title }} </strong>
    <span class="flex-fill">x {{ product.quantity }} </span>
    <span class="mr-10">Prix: {{ product.price }}€ </span>
    <button
      class="btn btn-danger"
      @click="emit('removeProductFromCart', product._id)"
    >
      supprimer
    </button>
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
//on importe l'interface ProductCartInterface du fichier productCart.interface.ts
import type { ProductCartInterface } from "@/interfaces";

//on defini les propriétés de product que l'on à récupéré depuis cartProductList.vue
//entre <> on défini le type typscript
defineProps<{
  product: ProductCartInterface;
}>();

//on definie l"evenement (sur le bouton supprimer)
const emit = defineEmits<{
  (e: "removeProductFromCart", productId: string): void;
}>();
</script>

//-------scss------------------------------------
<style lang="scss" scoped>
@import "../../../../assets/base.scss";
.product {
  border: $colorborder;
  border-radius: $colorborder-radius;
  background-color: $colorgray-1;
}
</style>
