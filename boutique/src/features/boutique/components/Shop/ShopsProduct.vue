//------html------------------------//
<template>
  <!--container carte-->
  <div class="product d-flex flex-column">
    <!--container image-->
    <!--la propriété style background-image est transformé en camelcase;obligé
    dans le template-->
    <div
      class="product-image"
      :style="{ backgroundImage: `url(${product.image})` }"
    ></div>

    <!--container description et prix-->
    <div class="p-10 d-flex flex-column">
      <!--on récupere le titre du produit dans product-->
      <h4>{{ product.title }}</h4>
      <!--on récupère la description du produit dans product-->
      <p>
        {{ product.description }}
      </p>
      <div class="d-flex flex-row align-items-center">
        <!--on récupère la description du produit dans product-->
        <strong class="flex-fill">prix:{{ product.price }}€ </strong>
        <button
          class="btn btn-primary"
          @click="emit('addProductToCart', product.id)"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
import type { ProductInterface } from "@/interfaces/product.interface";

//on definie les propriétes du produit
defineProps<{
  product: ProductInterface;
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
@import "../../../../assets/base.scss";
.product {
  background-color: white;
  padding-top: 20px;
  border: $colorborder;
  border-radius: $colorborder-radius;
  &-image {
    border-top-right-radius: $colorborder-radius;
    border-top-left-radius: $colorborder-radius;

    background-size: cover;

    background-position: center;
    height: 200px;
  }
}
</style>
