//------html------------------------//
<template>
  <div class="mb-10 p-10 d-flex flex-row align-items-center product">
    <strong class="flex-fill mr-10">{{ product.title }} </strong>

    <span class="mr-10">Prix: {{ product.price }}€ </span>
    <button
      class="btn btn-danger"
      @click="emit('removeProductFromCart', product.id)"
    >
      supprimer
    </button>
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
//on importe l'interface ProductInterface du fichier product.interface.ts
import type { ProductInterface } from "@/interfaces/product.interface";
//on defini les propriétés de product que l'on à récupéré depuis cartProductList.vue
//entre <> on défini le type typscript
defineProps<{
  product: ProductInterface;
}>();

//on definie l"evenement (sur le bouton supprimer)
const emit = defineEmits<{
  (e: "removeProductFromCart", productId: number): void;
}>();
</script>

//-------scss------------------------------------
<style lang="scss" scoped>
@import "../../assets/base.scss";
.product {
  border: $colorborder;
  border-radius: $colorborder-radius;
  background-color: $colorgray-1;
}
</style>
