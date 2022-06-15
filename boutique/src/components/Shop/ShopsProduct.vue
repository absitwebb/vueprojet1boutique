//------html------------------------//
<template>
  <!--container carte-->
  <div class="product d-flex flex-column">
    <!--container image-->
    <div class="product-image"></div>
    <!--container description et prix-->
    <div class="p-10 d-flex flex-column">
      <h4>mac book pro</h4>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur
        molestiae quidem.
      </p>
      <div class="d-flex flex-row align-items-center">
        <strong class="flex-fill">prix: 1500€</strong>
        <button class="btn btn-primary">Ajouter au panier</button>
      </div>
    </div>
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts"></script>

//-------scss------------------------------------
<style lang="scss" scoped>
@import "../../assets/base.scss";
.product {
  background-color: white;
  padding-top: 20px;
  border: $colorborder;
  border-radius: $colorborder-radius;
  &-image {
    border-top-right-radius: $colorborder-radius;
    border-top-left-radius: $colorborder-radius;
    background-image: url(../../assets/img/macbookpro.jpg);
    background-size: cover;

    background-position: center;
    height: 200px;
  }
}
</style>
