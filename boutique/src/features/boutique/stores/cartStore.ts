import type { ProductCartInterface } from "@/shared/interfaces";
import { defineStore } from "pinia";
import { DEFAULT_FILTERS } from "../data/filters";
import { useProducts } from "./productStore";
//_____________________________________________________________________________________
// on crée une interface regroupant toutes les autres interfaces
interface CartSate {
  cart: ProductCartInterface[];
}
//______________________________________________________________________________________
// on crée notre store cart
export const useCart = defineStore("cart", {
  //----------------------------state------------------------------
  state: (): CartSate => ({
    cart: [],
  }),
  //----------------------------getters------------------------------
  getters: {
    //si panier est égal à 0 cartEmpty sera true
    cartEmpty(state): boolean {
      return state.cart.length === 0;
    },
  },
  //________________________actions___________________________________________
  actions: {
    // ----pour ajouter un produit dans carte selon son id-----------------------
    addProductToCart(productId: string): void {
      //on récupere la liste des produits depuis useProducts
      const productStore = useProducts();
      const product = productStore.products.find(
        (product) => product._id === productId
      );
      // on vérifie si on n'a bien un produit et si le produit est égal à l'element que l'on veut ajouter
      if (product) {
        const productInCart = this.cart.find(
          (product) => product._id === productId
        );
        if (productInCart) {
          productInCart.quantity++;
        }
        //sinon si il y à qu'un produit
        else {
          this.cart.push({ ...product, quantity: 1 });
        }
      }
    },
    //__________________________________________________________________________________
    // fonction pour supprimer le produit dans le panier qu'on on clique sur supprimer
    // elle récupère en paramètre le productID
    removeProductFromCart(productId: string): void {
      //on commence à récuperer le produit
      const productFromCartIndex = this.cart.findIndex(
        (product) => product._id === productId
      );
      if (productFromCartIndex !== -1) {
        if (this.cart[productFromCartIndex].quantity === 1) {
          this.cart.splice(productFromCartIndex, 1);
        } else {
          this.cart[productFromCartIndex].quantity--;
        }
      }
    },
  },
});
