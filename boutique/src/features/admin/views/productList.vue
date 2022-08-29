//------html------------------------
<template>
  <div class="container card">
    <h1>liste des produits</h1>

    <h3 v-if="adminProductStore.isLoading">Chargement ....</h3>
    <ul v-else>
      <li
        class="d-flex flex-row align-items-center"
        v-for="product of adminProductStore.products"
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
import { useAdminProducts } from "../stores/AdminProductStore";

const adminProductStore = useAdminProducts();
//.fetchProduct()est appelé à partir de routes.ts
// adminProductStore.fetchProduct();

function trydeleteProduct(productId: string) {
  adminProductStore.deleteProduct(productId);
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
