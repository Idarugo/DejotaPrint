// src/router/public.router.js
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/index.vue";
import DetalleProducto from "@/views/detalle-producto.vue";
import CarroCompras from "@/views/CarroCompras.vue";
import ConfirmacionPago from "@/views/ConfirmacionPago.vue";
import Exito from "@/views/exito.vue";
import Error404 from "@/views/error/Error404.vue";
import store from "@/store"; // Asegúrate de importar el store

const publicRoutes = [
  {
    path: "/",
    name: "Inicio",
    component: HomeView,
    meta: {
      title: "Inicio",
    },
  },
  {
    path: "/galeria",
    name: "galeria",
    component: () => import("@/views/galeria.vue"),
  },
  {
    path: "/productos",
    name: "productos",
    component: () => import("@/views/productos.vue"),
  },
  {
    path: "/ofertas",
    name: "ofertas",
    component: () => import("@/views/ofertas.vue"),
  },
  {
    path: "/detalle-producto/:id",
    name: "DetalleProducto",
    component: DetalleProducto,
    meta: {
      title: "Detalle Producto",
    },
  },
  {
    path: "/carro",
    name: "CarroCompras",
    component: CarroCompras,
    meta: {
      title: "Carro de Compra",
    },
  },
  {
    path: "/confirmacion-pago",
    name: "ConfirmacionPago",
    component: ConfirmacionPago,
  },
  {
    path: "/exito/:pedidoId",
    name: "Exito",
    component: Exito,
  },

  {
    path: "/contacto",
    name: "contacto",
    component: () => import("@/views/contacto.vue"),
  },
  {
    path: "/quienes-somos",
    name: "quienes-somos",
    component: () => import("@/views/info/quienes-somos.vue"),
  },
  {
    path: "/envios-seguimiento",
    name: "envios-seguimiento",
    component: () => import("@/views/info/envios-seguimiento.vue"),
  },
  {
    path: "/testimonios",
    name: "testimonios",
    component: () => import("@/views/info/testimonios.vue"),
  },
  {
    path: "/preguntas-frecuentes",
    name: "preguntas-frecuentes",
    component: () => import("@/views/info/preguntas-frecuentes.vue"),
  },
  {
    path: "/garantia",
    name: "garantia",
    component: () => import("@/views/info/garantia.vue"),
  },
  {
    path: "/error",
    name: "error-404",
    component: Error404,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/error",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: publicRoutes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "error-404") {
    store.dispatch("toggleHeaderFooter", true); // Usar el store directamente
  }
  next();
});

export default router;
