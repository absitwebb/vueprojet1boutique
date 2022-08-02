import type { filtersInterface, ProductInterface } from "@/interfaces";

export async function fectProduct(
  filter: filtersInterface
): Promise<ProductInterface[] | ProductInterface> {
  const query = new URLSearchParams();
  if (filter.category !== "all") {
    query.append("category", filter.category);
  }
  //on limite le téléchargment des produits à 20
  query.append("limit", 20 + "");
  query.append("price", `$lte:${filter.priceRange[1]}`);
  query.append("price", `$gte:${filter.priceRange[0]}`);
  const products = await (
    await fetch(`https://restapi.fr/api/vueprojectproducts?${query}`)
  ).json();
  return products;
}
