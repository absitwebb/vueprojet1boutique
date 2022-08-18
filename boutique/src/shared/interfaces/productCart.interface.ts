import type { ProductInterface } from "./product.interface";

// extends pemet de rajouter toutes les propriétes de ProductInterface dans ProductCartInterface
export interface ProductCartInterface extends ProductInterface {
  quantity: number;
}
