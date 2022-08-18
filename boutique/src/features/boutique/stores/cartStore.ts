import type { ProductCartInterface } from "@/shared/interfaces";
import { defineStore } from "pinia";
import { DEFAULT_FILTERS } from "../data/filters";

// on crée une interface regroupant toutes les autres interfaces
interface CartSate {
  cart: ProductCartInterface[];
}

export const useCart = defineStore("cart", {
  state: (): CartSate => ({
    cart: [],
  }),
});
