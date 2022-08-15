import type { RouteRecordRaw } from "vue-router";

export const Admin_Routes: RouteRecordRaw[] = [
  {
    path: "",
    redirect: "/admin/addproduct",
  },
  {
    path: "addproduct",
    component: () => import("@/features/admin/views/ProductForm.vue"),
  },
  {
    path: "productlist",
    component: () => import("@/features/admin/views/productList.vue"),
  },
  // pour editer le produit
  {
    path: "edit/:productId",
    name: "edit",
    component: () => import("@/features/admin/views/ProductForm.vue"),
  },
];
