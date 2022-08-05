//------html------------------------//
<template>
  <div ref="scrollablediv" class="d-flex flex-column p-20">
    <div class="grid mb-20">
      <!-- on fait une boucle for pour récupéer chaque produit de products // et le
    mettre dans le composant ShopsProduct-->
      <ShopsProduct
        @add-product-to-cart="emit('addProductToCart', $event)"
        v-for="i in products"
        :key="i._id"
        :product="i"
      />
    </div>
    <div
      v-if="moreResults"
      class="d-flex flex-row align-items-center justify-content-center"
    >
      <button @click="emit('incPage')" class="btn btn-primary">
        Charger plus de produits
      </button>
    </div>
  </div>
  <!--dans le template on place le composant ShopsProduct-->
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
//on importe le fichier ShopsProduct
import ShopsProduct from "./ShopsProduct.vue";
import type { ProductInterface } from "@/interfaces/product.interface";
import { inject, onMounted, onUpdated, ref, watch } from "vue";
import { pageKey } from "@/shared/services/injectionKeys/pageKey";
//on define propriété de la clé product que l'on recoit de app.vue
//on type products grace à l'interface ProductInterface
const props = defineProps<{
  products: ProductInterface[];
  moreResults: boolean;
}>();
const page = inject(pageKey)!;

const scrollablediv = ref<HTMLDivElement | null>(null);

//defineEmits pour déclarer un évenement
//  l'evenement est add-product-to-cart qui se trouve dans le template
// on transforme add-product-to-cart en addProductToCart (camelcase)
//on lui passe aussi une information qu'on à besoin qui est id du produit
const emit = defineEmits<{
  (e: "addProductToCart", productId: string): void;
  (e: "incPage"): void;
}>();

watch(page, () => {
  if (page.value === 1) {
    scrollablediv.value?.scrollTo(0, 0);
  }
});
</script>

//-------scss------------------------------------
<style lang="scss" scoped>
@import "../../../../assets/base.scss";
.grid {
  display: grid;
  grid-template-columns: 1fr;

  @include md {
    grid-template-columns: 1fr 1fr;
  }
  @include lg {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @include xl {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  grid-auto-rows: 400px;
  gap: 20px;
}
</style>
