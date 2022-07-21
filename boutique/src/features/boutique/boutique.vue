<template>
  <div class="boutique-container" :class="{ 'grid-empty': cartEmpty }">
    <Shops
      @update-filter="updateFilter"
      @add-product-to-cart="addProductToCart"
      :products="filteredProducts"
      :filters="state.filters"
      class="shop"
    />
    <!--composant pour affichier le panier -->
    <!--si carte est suprérieur à 0 on affiche le reste-->
    <Carte
      v-if="!cartEmpty"
      :cart="state.cart"
      class="cart"
      @remove-product-from-cart="removeProductFromCart"
    />
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
import Shops from "./components/Shop/Shops.vue";
import Carte from "./components/Cart/Carte.vue";
// import des produits qui setrouvent dans le fichier product.ts
import data from "../../data/product";
import { computed, reactive } from "vue";
// import de l'interface ProductInterface se trouant dans le fichier  product.interface.ts
import type { ProductInterface } from "../../interfaces/product.interface";
import type {
  filtersInterface,
  ProductCartInterface,
  filterUpdate,
} from "../../interfaces";
import { DEFAULT_FILTERS } from "../../features/boutique/data/filters";

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
  filters: filtersInterface;
}>({
  // on initilise les variables
  products: data,
  cart: [],
  filters: { ...DEFAULT_FILTERS },
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

//------------------------on filtre les produits-------------------
//on retourn la liste des produits en prenant la considération des filtres
// pour cela on récupère les produits et dessus on utilise la fonction filtrer
// on va utiliser filtrer sur chacun des élements du produit. si filtrer return true on garde l'élément

const filteredProducts = computed(() => {
  return state.products.filter((product) => {
    if (
      //on vérifie si titre du produit dans search(qui sera un input) commence  bien
      product.title
        .toLocaleLowerCase()
        .startsWith(state.filters.search.toLocaleLowerCase()) &&
      // on vérifie ensuite si le prix du produit est égal ou supérieur à priceRange[0](input)
      // et égal ou inférieur à priceRange[1](input)
      product.price >= state.filters.priceRange[0] &&
      product.price <= state.filters.priceRange[1] &&
      // et on vérifie la catégorie du produit
      (product.category === state.filters.category ||
        state.filters.category === "all")
    ) {
      return true;
    } else {
      false;
    }
  });
});

function updateFilter(filterUpdate: filterUpdate) {
  if (filterUpdate.search !== undefined) {
    state.filters.search = filterUpdate.search;
  } else if (filterUpdate.priceRange) {
    state.filters.priceRange = filterUpdate.priceRange;
  } else if (filterUpdate.category) {
    state.filters.category = filterUpdate.category;
  } else {
    state.filters = { ...DEFAULT_FILTERS };
  }
}
</script>

//-------scss------------------------------------
<style scoped lang="scss">
@import "../../assets/base.scss";
.boutique-container {
  display: grid;
  grid-template-columns: 75% 25%;
}
.grid-empty {
  grid-template-columns: 100%;
}
.cart {
  background-color: white;
  border-left: $colorborder;
}
</style>
