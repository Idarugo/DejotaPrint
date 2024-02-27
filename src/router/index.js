import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../index.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("../pages/blog.vue"),
  },
  {
    path: "/productos",
    name: "productos",
    component: () => import("../pages/productos.vue"),
  },
  {
    path: "/servicios",
    name: "servicios",
    component: () => import("../pages/servicios.vue"),
  },
  {
    path: "/contacto",
    name: "contacto",
    component: () => import("../pages/contacto.vue"),
  },
  {
    path: "/quien-somos",
    name: "quien-somos",

    component: () => import("../pages/quien-somos.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
