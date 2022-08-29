import type { RouteRecordRaw } from "vue-router";
import { Admin_Routes } from "./features/admin/admin.routes";
import { initialFetchAdminProducts } from "./features/admin/stores/AdminProductStore";
import {
  initialFetchProducts,
  useProducts,
} from "./features/boutique/stores/productStore";
import NotFound from "./views/NotFound.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/boutique",
  },
  {
    path: "/boutique",
    beforeEnter: [initialFetchProducts],

    component: () => import("./features/boutique/boutique.vue"),
  },
  {
    path: "/admin",
    beforeEnter: [initialFetchAdminProducts],
    component: () => import("./features/admin/Admin.vue"),
    children: Admin_Routes,
  },
  {
    path: "/:notfound(.*)*",
    component: NotFound,
  },
];
