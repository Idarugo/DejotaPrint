import { createApp } from "vue";
import AdminApp from "@/admin/components/AdminPage.vue";
import adminRouter from "./router/admin.router";
import store from "./store";

// Importa Bootstrap CSS y JS
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "@fortawesome/fontawesome-free/css/all.css";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

import $ from "jquery";
window.$ = $;

const adminApp = createApp(AdminApp);
adminApp.use(adminRouter);
adminApp.use(store);
adminApp.mount("#admin-app");
