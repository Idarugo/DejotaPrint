<template>
  <div class="login-root">
    <div
      class="box-root flex-flex flex-direction--column"
      style="min-height: 100vh; flex-grow: 1"
    >
      <div class="loginbackground box-background--white padding-top--64">
        <div class="loginbackground-gridContainer">
          <div
            class="box-root flex-flex"
            style="grid-area: top / start / 8 / end"
          >
            <div
              class="box-root"
              style="
                background-image: linear-gradient(
                  white 0%,
                  rgb(247, 250, 252) 33%
                );
                flex-grow: 1;
              "
            ></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 4 / 2 / auto / 5">
            <div
              class="box-root box-divider--light-all-2 animationLeftRight tans3s"
              style="flex-grow: 1"
            ></div>
          </div>
          <div
            class="box-root flex-flex"
            style="grid-area: 6 / start / auto / 2"
          >
            <div
              class="box-root box-background--blue800"
              style="flex-grow: 1"
            ></div>
          </div>
          <div
            class="box-root flex-flex"
            style="grid-area: 7 / start / auto / 4"
          >
            <div
              class="box-root box-background--blue animationLeftRight"
              style="flex-grow: 1"
            ></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 8 / 4 / auto / 6">
            <div
              class="box-root box-background--gray100 animationLeftRight tans3s"
              style="flex-grow: 1"
            ></div>
          </div>
          <div
            class="box-root flex-flex"
            style="grid-area: 2 / 15 / auto / end"
          >
            <div
              class="box-root box-background--cyan200 animationRightLeft tans4s"
              style="flex-grow: 1"
            ></div>
          </div>
          <div
            class="box-root flex-flex"
            style="grid-area: 3 / 14 / auto / end"
          >
            <div
              class="box-root box-background--blue animationRightLeft"
              style="flex-grow: 1"
            ></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 4 / 17 / auto / 20">
            <div
              class="box-root box-background--gray100 animationRightLeft tans4s"
              style="flex-grow: 1"
            ></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 5 / 14 / auto / 17">
            <div
              class="box-root box-divider--light-all-2 animationRightLeft tans3s"
              style="flex-grow: 1"
            ></div>
          </div>
        </div>
      </div>
      <div
        class="box-root padding-top--24 flex-flex flex-direction--column"
        style="flex-grow: 1; z-index: 9"
      >
        <div
          class="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center"
        >
          <h1>
            <a href="http://blog.stackfindover.com/" rel="dofollow">Login</a>
          </h1>
        </div>
        <div class="formbg-outer">
          <div class="formbg">
            <div class="formbg-inner padding-horizontal--48">
              <span class="padding-bottom--15"
                >Iniciar sesión en su cuenta</span
              >
              <form id="stripe-login" @submit.prevent="login">
                <div class="field padding-bottom--24">
                  <label for="rut">RUT</label>
                  <input
                    type="text"
                    name="rut"
                    v-model="rut"
                    @input="formatRUT"
                    maxlength="12"
                  />
                </div>
                <div class="field padding-bottom--24">
                  <div class="grid--50-50">
                    <label for="password">Contraseña</label>
                  </div>
                  <input type="password" name="password" v-model="password" />
                </div>
                <div
                  class="field field-checkbox padding-bottom--24 flex-flex align-center"
                >
                  <label for="checkbox">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      v-model="rememberMe"
                    />
                    Manténgase registrado para una semana
                  </label>
                </div>
                <div class="field padding-bottom--24">
                  <input type="submit" name="submit" value="Continuar" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      rut: "",
      password: "",
      rememberMe: false,
    };
  },
  mounted() {
    const rememberMe = localStorage.getItem("rememberMe");
    this.rememberMe = rememberMe === "true";
  },
  methods: {
    async login() {
      if (!this.rut || !this.password) {
        Swal.fire({
          icon: "warning",
          title: "Campos vacíos",
          text: "Los campos RUT y Contraseña no pueden estar vacíos",
        });
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/login",
          {
            rut: this.rut,
            password: this.password,
          }
        );

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("workerRut", this.rut);

        Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          text: "Has iniciado sesión correctamente",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          if (this.rememberMe) {
            localStorage.setItem("rememberMe", true);
          } else {
            localStorage.removeItem("rememberMe");
          }
          this.$router.push({ name: "AdminPrincipal" });
        });
      } catch (error) {
        this.handleLoginError(error);
      }
    },
    handleLoginError(error) {
      console.error("Error al iniciar sesión:", error);
      if (error.response) {
        console.error("Datos del error:", error.response.data);
        console.error("Estado del error:", error.response.status);
        console.error("Cabeceras del error:", error.response.headers);

        if (error.response.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Error al iniciar sesión",
            text: "Credenciales incorrectas",
          });
        } else if (error.response.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Error al iniciar sesión",
            text: error.response.data.error || "RUT y/o contraseña incorrectos",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al iniciar sesión",
            text: "Ocurrió un error inesperado. Por favor, intente nuevamente más tarde.",
          });
        }
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
        Swal.fire({
          icon: "error",
          title: "Error de red",
          text: "No se pudo conectar con el servidor. Por favor, intente nuevamente más tarde.",
        });
      } else {
        console.error("Error al configurar la solicitud:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error inesperado. Por favor, intente nuevamente más tarde.",
        });
      }
    },
    formatRUT() {
      let value = this.rut.replace(/\./g, "").replace(/-/g, "");
      if (value.length > 1) {
        value = value.slice(0, -1) + "-" + value.slice(-1);
      }
      if (value.length > 5) {
        value = value.slice(0, -5) + "." + value.slice(-5);
      }
      if (value.length > 9) {
        value = value.slice(0, -9) + "." + value.slice(-9);
      }
      this.rut = value;
    },
  },
};
</script>

<style scoped>
@import "../admin/assets/styles/index.css";
</style>

