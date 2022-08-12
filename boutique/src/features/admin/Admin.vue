/------html------------------------//
<template>
  <div class="admin-container d-flex flex-row p-20">
    <ProductForm />
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
import ProductForm from "./components/ProductForm.vue";
</script>

//-------scss------------------------------------
<style scoped lang="scss">
@import "../../assets/base.scss";
.admin-container {
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>
