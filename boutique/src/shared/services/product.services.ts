//import product from "@/data/product";
import type {
  filtersInterface,
  ProductFormInterface,
  ProductInterface,
} from "@/shared/interfaces";
import { ref, type Ref } from "vue";

const BASE_URL = "https://restapi.fr/api/vueprojectproducts";
//___________________ on récupère tous les produits filtrés______________________
export async function fetchProductWithFilter(
  filter: filtersInterface,
  page: number
): Promise<ProductInterface[] | ProductInterface> {
  const query = new URLSearchParams();
  if (filter.category !== "all") {
    query.append("category", filter.category);
  }
  //on limite le téléchargment des produits à 20
  query.append("limit", 20 + "");
  if (page !== 1) {
    query.append("skip", (page - 1) * 20 + "");
  }
  query.append("price", `$lte:${filter.priceRange[1]}`);
  query.append("price", `$gte:${filter.priceRange[0]}`);
  const products = await (await fetch(`${BASE_URL}?${query}`)).json();
  return products;
}

// import données  pour afficher dans productlist de admin
export async function fetchProducts(): Promise<ProductInterface[]> {
  return await (await fetch(BASE_URL)).json();
}
// supprimer un produit
export async function deleteProduct(productId: string): Promise<string> {
  await fetch(`${BASE_URL}/${productId}`, {
    method: "DELETE",
  });
  return productId;
}
// pour ajouter un nouveau produit (post)
export async function addProduct(
  product: ProductFormInterface
): Promise<ProductInterface> {
  const newProduct = await (
    await fetch("https://restapi.fr/api/projetproducts", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return newProduct;
}
// pour éditer un produit
export async function getProduct(productId: string): Promise<ProductInterface> {
  const product = await (await fetch(`${BASE_URL}/${productId}`)).json();
  return product;
}

export async function editProduct(
  productId: string,
  product: ProductFormInterface
): Promise<ProductInterface> {
  const updatedProduct = await (
    await fetch(`${BASE_URL}/${productId}`, {
      method: "PATCH",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return updatedProduct;
}
