import { createApp } from "vue";
import App from "@/components/PublicPage.vue";
import publicRouter from "./router/public.router";
import store from "./store";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

import $ from "jquery";
window.$ = $;

const app = createApp(App);
app.use(publicRouter);
app.use(store);
app.mount("#app"); // Asegúrate de que esto monta en el div con id="app"
