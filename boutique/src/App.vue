//------html------------------------//
<template>
  <div class="app-container">
    <!--composants-->
    <!--composant header-->
    <theheader class="header" />

    <!--composant shop pour afficher les produits-->
    <!--product ou se trouvent les produits, on envoi à shops.vue //on ecoute
    l'evenement add-product-to-cart pour invoquer la fonction addProductToCart-->
    <Shops
      :products="state.products"
      @add-product-to-cart="addProductToCart"
      class="shop"
    />
    <!--composant pour affichier le panier -->
    <Carte class="carte" />
    <!--composant footer-->
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
// import des produits qui setrouvent dans le fichier product.ts
import data from "./data/product";
import { reactive } from "vue";
// import de l'interface ProductInterface se trouant dans le fichier  product.interface.ts
import type { ProductInterface } from "./interfaces/product.interface";

//contient tous nos produits
// ProductInterface permet de vérifier que les produits correspondent aux types définie dans ProductInterface
//const products = reactive<ProductInterface[]>(data);
// on met dans cart les produits selectionnés pour le panier
//const cart =reactive<ProductInterface[]>([])
// au lieu d'avoir deux lignes (si dessus) on mets products et carte dans un objet
const state = reactive<{
  //on défini les propriétés ou type
  products: ProductInterface[];
  cart: ProductInterface[];
}>({
  // on initilise les variables
  products: data,
  cart: [],
});

//fonction pour ajouter le produit dans le panier
// cette fonction doit recevoir id du produit en paramétre
function addProductToCart(productId: number): void {
  //on récupère id du produit dans state.products grace à find qui va itéré sur chacun des produits du tableau
  // jusqu'a il trouve l'id du produit qui est égal à ProductId
  const product = state.products.find((product) => product.id === productId);
  // on vérifie si on n'a bien un produit et si le produit de se trouve pas déja dans le panier
  if (product && !state.cart.find((product) => product.id === productId)) {
    // on met le produit dans le pannier (...en mettant 3 petits point on fait une deconstuction)
    state.cart.push({ ...product });
  }
}
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
