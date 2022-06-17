//------html------------------------//
<template>
  <div class="app-container" :class="{ gridEmpty: cartEmpty }">
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
    <!--si carte est suprérieur à 0 on affiche le reste-->
    <Carte
      v-if="!cartEmpty"
      :cart="state.cart"
      class="carte"
      @remove-product-from-cart="removeProductFromCart"
    />
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
import { computed, reactive } from "vue";
// import de l'interface ProductInterface se trouant dans le fichier  product.interface.ts
import type { ProductInterface } from "./interfaces/product.interface";
import type { ProductCartInterface } from "./interfaces";

//contient tous nos produits
// ProductInterface permet de vérifier que les produits correspondent aux types définie dans ProductInterface
//const products = reactive<ProductInterface[]>(data);
// on met dans cart les produits selectionnés pour le panier
//const cart =reactive<ProductInterface[]>([])
// au lieu d'avoir deux lignes (si dessus) on mets products et carte dans un objet
const state = reactive<{
  //on défini les propriétés ou type
  products: ProductInterface[];
  cart: ProductCartInterface[];
}>({
  // on initilise les variables
  products: data,
  cart: [],
});
//-----------------------------------------------------------
//fonction pour ajouter le produit dans le panier
// cette fonction doit recevoir id du produit en paramétre
function addProductToCart(productId: number): void {
  //on récupère le produit dans state.products grace à find qui va itéré sur chacun des produits du tableau
  // jusqu'a il trouve l'id du produit qui est égal à ProductId
  const product = state.products.find((product) => product.id === productId);
  // on vérifie si on n'a bien un produit et si le produit est égal à l'element que l'on veut ajouter
  if (product) {
    const productInCart = state.cart.find(
      (product) => product.id === productId
    );
    if (productInCart) {
      productInCart.quantity++;
    }
    //sinon si il y à qu'un produit
    else {
      state.cart.push({ ...product, quantity: 1 });
    }
  }
} //----------------------------------------------------------------
// fonction pour supprimer le produit qu'on on clique sur supprimer
// elle récupère en paramètre le productID
function removeProductFromCart(productId: number): void {
  //on commence à récuperer le produit
  const productFromCart = state.cart.find(
    (product) => product.id === productId
  );
  if (productFromCart) {
    if (productFromCart.quantity === 1) {
      // filter retourne un nouveau tableau avec tous produits avec un id différent du produit id que l'on veut supprimer
      state.cart = state.cart.filter((product) => product.id !== productId);
    } else {
      productFromCart.quantity--;
    }
  }
}
//si panier est égal à 0 cartEmpty sera true
const cartEmpty = computed(() => state.cart.length === 0);
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

.gridEmpty {
  grid-template-areas: "header " "shop" "footer";
  grid-template-columns: 100%;
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
