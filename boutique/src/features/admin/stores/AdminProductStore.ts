import type {
  ProductFormInterface,
  ProductInterface,
} from "@/shared/interfaces";
import {
  addProduct,
  deleteProduct,
  editProduct,
  fetchProducts,
} from "@/shared/services/product.services";
import { defineStore } from "pinia";
import { array, string } from "zod";
//---------------------interface
interface AdminProductState {
  products: ProductInterface[];
  isLoading: boolean;
}
//----------------store-----------------------
export const useAdminProducts = defineStore("adminProduct", {
  state: (): AdminProductState => ({
    products: [],
    isLoading: false,
  }),
  actions: {
    async fetchProduct() {
      this.isLoading = true;
      const products = await fetchProducts();
      if (Array.isArray(products)) {
        this.products = products;
      } else {
        this.products = [products];
      }
      this.isLoading = false;
    },

    async deleteProduct(productId: string) {
      const productIndex = this.products.findIndex((p) => p._id === productId);
      if (productIndex !== -1) {
        await deleteProduct(productId);
        this.products.splice(productIndex, 1);
      }
    },
    //pour ajouter un nouveau produits
    async addProduct(productForm: ProductFormInterface) {
      const newProduct = await addProduct(productForm);
      if (newProduct) {
        this.products.push(newProduct);
      }
    },
    //pour editer et modifier un produit
    async editProduct(productId: string, productForm: ProductFormInterface) {
      const editedProduct = await editProduct(productId, productForm);
      if (editedProduct) {
        const stateProductIndex = this.products.findIndex(
          (p) => p._id === editedProduct._id
        );
        this.products[stateProductIndex] = editedProduct;
      }
    },
  },
});
