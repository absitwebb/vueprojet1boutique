import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import NotFound from "./views/NotFound.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
