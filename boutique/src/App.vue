//------html------------------------//
<template>
  <div class="app-container">
    <!--composants-->
    <theheader class="header" />
    <Shops class="shop" />
    <Carte class="carte" />
    <thefooter class="footer" />
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
// on importe les composants
import theheader from "./components/Header.vue";
import thefooter from "./components/Footer.vue";
import Shops from "./components/Shop/Shops.vue";
import Carte from "./components/Cart/Carte.vue";
</script>

//-------scss------------------------------------
<style lang="scss">
@import "./assets/base.scss";

// on crée une grille pour placer nos éléments
.app-container {
  min-height: 100vh;
  display: grid;
  grid-template-areas: "header header" "shop carte" "footer footer";
  grid-template-columns: 75% 25%;
  grid-template-rows: 48px auto 48px;
}

.header {
  grid-area: header;
}
.shop {
  grid-area: shop;
}
.carte {
  grid-area: carte;
  border-left: $colorborder;
  background-color: white;
}
.footer {
  grid-area: footer;
}
</style>
