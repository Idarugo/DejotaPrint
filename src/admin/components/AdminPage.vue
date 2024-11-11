<template>
  <div>
    <Sidebar v-if="isAuthenticated" :trabajador="trabajador" />
    <router-view @updateUserInfo="updateUserInfo" />
  </div>
</template>

<script>
import axios from "axios";
import Sidebar from "../components/Sidebar.vue";
import { printAsciiArt } from "../utils/asciiArt";

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      trabajador: null,
      isAuthenticated: false,
    };
  },
  created() {
    printAsciiArt();
    this.checkAuthentication();
  },
  mounted() {
    this.checkAuthentication();
  },
  methods: {
    async fetchUserData() {
      const workerRut = localStorage.getItem("workerRut");
      const token = localStorage.getItem("token");

      if (!workerRut) {
        console.error("No se ha proporcionado un RUT de trabajador");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/trabajadores/${workerRut}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.trabajador = response.data;
      } catch (error) {
        console.error("Error al obtener los datos del trabajador:", error);
      }
    },
    checkAuthentication() {
      const token = localStorage.getItem("token");
      if (token) {
        this.isAuthenticated = true;
        this.fetchUserData();
      } else {
        this.isAuthenticated = false;
        if (this.$route.name !== "admin-login") {
          this.$router.push({ name: "admin-login" });
        }
      }
    },
    updateUserInfo(trabajador) {
      this.trabajador = trabajador;
    },
  },
  watch: {
    $route(to) {
      this.checkAuthentication();
    },
  },
};
</script>
