import { createRouter, createWebHistory } from "vue-router";
import AdminPrincipal from "../views/AdminPrincipal.vue"; // Asegúrate de que esta ruta es correcta

const adminRoutes = [
  {
    path: "/admin/principal",
    name: "AdminPrincipal",
    component: AdminPrincipal,
    meta: {
      title: "Administrador",
    },
  },
  {
    path: "/admin/producto",
    name: "admin-producto",
    component: () => import("../views/sidebar/core/producto.vue"),
    meta: {
      title: "Producto",
    },
  },
  {
    path: "/admin/plantillas",
    name: "admin-plantillas",
    component: () => import("../views/sidebar/core/plantillas.vue"),
    meta: {
      title: "Plantillas",
    },
  },
  {
    path: "/admin/oferta",
    name: "admin-oferta",
    component: () => import("../views/sidebar/core/oferta.vue"),
    meta: {
      title: "Oferta",
    },
  },
  {
    path: "/admin/pedidos",
    name: "admin-pedidos",
    component: () => import("../views/sidebar/core/pedidos.vue"),
    meta: {
      title: "Pedidos",
    },
  },
  {
    path: "/admin/categoria",
    name: "admin-categoria",
    component: () => import("../views/sidebar/core/categoria.vue"),
    meta: {
      title: "Categoria",
    },
  },
  {
    path: "/admin/subcategoria",
    name: "admin-subcategoria",
    component: () => import("../views/sidebar/core/subcategorias.vue"),
    meta: {
      title: "Subcategoria",
    },
  },
  {
    path: "/admin/imagenProducto",
    name: "admin-imagenProducto",
    component: () => import("../views/sidebar/otros/imagen-producto.vue"),
    meta: {
      title: "Imagen Producto",
    },
  },
  {
    path: "/admin/carrusel",
    name: "admin-carrusel",
    component: () => import("../views/sidebar/otros/carrusel.vue"),
    meta: {
      title: "Carrusel",
    },
  },
  {
    path: "/admin/horario",
    name: "admin-horario",
    component: () => import("../views/sidebar/otros/horario.vue"),
    meta: {
      title: "Horario",
    },
  },
  {
    path: "/admin/trabajadore",
    name: "admin-trabajadore",
    component: () => import("../views/sidebar/core/trabajadore.vue"),
    meta: {
      title: "Trabajadores",
    },
  },
  {
    path: "/admin/contacto",
    name: "admin-contacto",
    component: () => import("../views/sidebar/otros/contacto.vue"),
    meta: {
      title: "Contacto",
    },
  },
  {
    path: "/admin/resena",
    name: "admin-resena",
    component: () => import("../views/sidebar/otros/resena.vue"),
    meta: {
      title: "Reseña",
    },
  },
  {
    path: "/admin/testimonios",
    name: "admin-testimonios",
    component: () => import("../views/sidebar/otros/testimonios.vue"),
    meta: {
      title: "Testimonios",
    },
  },
  {
    path: "/admin/preguntas-frecuentes",
    name: "admin-preguntas-frecuentes",
    component: () => import("../views/sidebar/otros/preguntas-frecuentes.vue"),
    meta: {
      title: "Preguntas Frecuentes",
    },
  },
  {
    path: "/admin/informacion-personal",
    name: "admin-informacion-personal",
    component: () => import("../views/sidebar/otros/informacion-personal.vue"),
    meta: {
      title: "Informacion Personal",
    },
  },
  {
    path: "/admin/ComoProtegerCuenta",
    name: "admin-ComoProtegerCuenta",
    component: () => import("../views/info/ComoProtegerCuenta.vue"),
    meta: {
      title: "Como Proteger Cuenta",
    },
  },

  {
    path: "/admin/marcas",
    name: "admin-marcas",
    component: () => import("../views/sidebar/otros/marcas.vue"),
    meta: {
      title: "Marcas",
    },
  },
];

const adminRouter = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: adminRoutes,
});

export default adminRouter;
