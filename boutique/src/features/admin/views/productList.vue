//------html------------------------
<template>
  <div class="container card">
    <h1>liste des produits</h1>
    <h3 v-if="error">oops une erreur c'est produite</h3>
    <h3 v-else-if="loading">Chargement ....</h3>
    <ul v-else>
      <li
        class="d-flex flex-row align-items-center"
        v-for="product of products"
        :key="product._id"
      >
        <span class="flex-fill">{{ product.title }}</span>
        <!--on modifie le produit-->
        <router-link :to="{ name: 'edit', params: { productId: product._id } }">
          <button class="btn btn-primary mr-20">Modifier</button>
        </router-link>
        <!--on supprime le produit-->
        <button @click="trydeleteProduct(product._id)" class="btn btn-danger">
          Supprimer
        </button>
      </li>
    </ul>
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
import {
  deleteProduct,
  useFetchProducts,
} from "@/shared/services/product.services";

const { products, loading, error } = useFetchProducts();

async function trydeleteProduct(productId: string) {
  await deleteProduct(productId);
  products.value = products.value!.filter((p) => p._id !== productId);
}
</script>

//-------scss------------------------------------
<style scoped lang="scss">
@import "@/assets/base.scss";
.container {
  width: 100%;
  height: 100%;
}
li {
  border: $colorborder;
  border-radius: $colorborder-radius;
  padding: 5px 15px;
  margin-bottom: 5px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: $colorgray-1;
  }
}
</style>
