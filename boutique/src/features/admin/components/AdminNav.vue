//------html------------------------
<template>
  <nav class="card d-flex flex-column">
    <h3 class="mb-20">Produits</h3>
    <router-link class="mb-10" to="/admin/productlist"
      >liste des produits</router-link
    >
    <router-link class="mb-10" to="/admin/addproduct"
      >Ajouter des produits</router-link
    >
  </nav>
</template>

//-------------javascript typecript--------------
<script setup lang="ts"></script>

//-------scss------------------------------------
<style scoped lang="scss">
@import "@/assets/base.scss";
</style>
