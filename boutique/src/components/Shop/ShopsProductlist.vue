//------html------------------------//
<template>
  <div class="grid p-20">
    <ShopsProduct />
    <ShopsProduct />
    <ShopsProduct />
    <ShopsProduct />
    <ShopsProduct />
    <ShopsProduct />
    <ShopsProduct />
    <ShopsProduct />
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
//on importe le fichier ShopsProduct
import ShopsProduct from "./ShopsProduct.vue";
</script>

//-------scss------------------------------------
<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 400px;
  gap: 20px;
}
</style>
