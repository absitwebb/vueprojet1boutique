import type { RouteRecordRaw } from "vue-router";
import { Admin_Routes } from "./features/admin/admin.routes";
import NotFound from "./views/NotFound.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/boutique",
  },
  {
    path: "/boutique",
    component: () => import("./features/boutique/boutique.vue"),
  },
  {
    path: "/admin",
    component: () => import("./features/admin/Admin.vue"),
    children: Admin_Routes,
  },
  {
    path: "/:notfound(.*)*",
    component: NotFound,
  },
];
