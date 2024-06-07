import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/index.vue";
import DetalleProducto from "../views/detalle-producto.vue";
import CarroCompras from "@/views/CarroCompras.vue";
import ConfirmacionPago from "@/views/ConfirmacionPago.vue";
import Exito from "@/views/exito.vue";

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
    component: () => import("../views/galeria.vue"),
  },
  {
    path: "/productos",
    name: "productos",
    component: () => import("../views/productos.vue"),
  },
  {
    path: "/ofertas",
    name: "ofertas",
    component: () => import("../views/ofertas.vue"),
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
    component: () => import("../views/contacto.vue"),
  },
  {
    path: "/quienes-somos",
    name: "quienes-somos",

    component: () => import("../views/info/quienes-somos.vue"),
  },
  {
    path: "/envios-seguimiento",
    name: "envios-seguimiento",

    component: () => import("../views/info/envios-seguimiento.vue"),
  },
  {
    path: "/testimonios",
    name: "testimonios",

    component: () => import("../views/info/testimonios.vue"),
  },
  {
    path: "/preguntas-frecuentes",
    name: "preguntas-frecuentes",

    component: () => import("../views/info/preguntas-frecuentes.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../admin/index.vue"),
    meta: {
      title: "Login",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: publicRoutes,
});

export default router;
