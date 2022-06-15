//------html------------------------//
<template>
  <div class="mb-10 p-10 d-flex flex-row align-items-center product">
    <strong class="flex-fill mr-10">Macbook pro</strong>

    <span class="mr-10">Prix: 1500€</span>
    <button class="btn btn-danger">supprimer</button>
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts"></script>

//-------scss------------------------------------
<style lang="scss" scoped>
@import "../../assets/base.scss";
.product {
  border: $colorborder;
  border-radius: $colorborder-radius;
  background-color: $colorgray-1;
}
</style>
