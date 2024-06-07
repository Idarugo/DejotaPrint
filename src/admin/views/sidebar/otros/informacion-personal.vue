<template>
  <main>
    <div class="container">
      <h1>Informacion Personal</h1>
      <div class="row g-3 justify-content-center" enctype="multipart/form-data">
        <!-- Rut -->
        <div class="col-md-10">
          <label for="inputRut" class="form-label">Rut</label>
          <input
            type="text"
            name="txt_rut"
            id="rut"
            class="form-control"
            v-model="trabajador.rut"
            disabled
          />
        </div>
        <!-- Nombre -->
        <div class="col-md-5">
          <label for="inputNombre" class="form-label">Nombre</label>
          <input
            type="text"
            name="txt_nombre"
            id="nombre"
            class="form-control"
            v-model="trabajador.nombre"
          />
        </div>
        <!-- Apellido -->
        <div class="col-md-5">
          <label for="inputApellido" class="form-label">Apellido</label>
          <input
            type="text"
            name="txt_apellido"
            id="apellido"
            class="form-control"
            v-model="trabajador.apellido"
          />
        </div>
        <!-- Información de contacto -->
        <h4 class="col-md-10">Información de contacto</h4>
        <!-- Teléfono -->
        <div class="col-md-5">
          <label for="inputTelefono" class="form-label">Telefono</label>
          <input
            type="text"
            name="txt_telefono"
            id="telefono"
            class="form-control"
            v-model="trabajador.telefono"
          />
        </div>
        <!-- Correo (desactivado para no permitir modificaciones) -->
        <div class="col-md-5">
          <label for="inputCorreo" class="form-label">Correo</label>
          <input
            type="text"
            name="txt_correo"
            id="correo"
            class="form-control"
            v-model="trabajador.correo"
            disabled
          />
        </div>
        <!-- Desea Cambiar la Contraseña -->
        <div class="col-md-10">
          <label class="form-label">Desea Cambiar la Contraseña?</label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="change_pass"
              id="change_pass1"
              value="1"
              v-model="trabajador.cambiarContraseña"
              @change="cambiarContraseña;"
            />
            <label class="form-check-label" for="change_pass1">Sí</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="change_pass"
              id="change_pass2"
              value="2"
              v-model="trabajador.cambiarContraseña"
              @change="cambiarContraseña;"
            />
            <label class="form-check-label" for="change_pass2">No</label>
          </div>
        </div>
        <!-- Nuevo Contraseña -->
        <div
          id="change_pass_container"
          class="col-md-10 mb-3"
          v-if="trabajador.cambiarContraseña === '1'"
        >
          <label for="inputPassword" class="form-label">Nueva Contraseña</label>
          <input
            type="password"
            name="txt_password"
            id="password"
            class="form-control"
            v-model="trabajador.nuevaContraseña"
            autocomplete="off"
            placeholder="Inserte su Nueva Contraseña Aquí"
          />
        </div>
        <!-- Botón de Guardar -->
        <div class="col-md-12">
          <button type="button" class="btn btn-primary" @click="submitForm">
            Guardar
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      trabajador: {
        rut: "",
        nombre: "",
        apellido: "",
        telefono: "",
        correo: "",
        cambiarContraseña: "2", // Por defecto, no cambiar contraseña
        nuevaContraseña: "", // Variable para almacenar la nueva contraseña
      },
    };
  },
  mounted() {
    // Realiza una solicitud GET para obtener los datos del trabajador al cargar el componente
    this.obtenerDatosTrabajador();
  },
  methods: {
    async obtenerDatosTrabajador() {
      try {
        const workerRut = localStorage.getItem("workerRut");
        const token = localStorage.getItem("token");

        if (!workerRut) {
          console.error("No se ha proporcionado un RUT de trabajador");
          return;
        }

        const response = await axios.get(`/api/trabajadores/${workerRut}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.trabajador = response.data;
      } catch (error) {
        console.error("Error al obtener los datos del trabajador:", error);
        if (error.response) {
          console.error("Datos del error:", error.response.data);
          console.error("Estado del error:", error.response.status);
          console.error("Cabeceras del error:", error.response.headers);
        }
      }
    },

    cambiarContraseña() {
      if (this.trabajador.cambiarContraseña === "1") {
        // Mostrar el campo de nueva contraseña si se selecciona "Sí"
        document.getElementById("change_pass_container").style.display =
          "block";
      } else {
        // Ocultar el campo de nueva contraseña si se selecciona "No"
        document.getElementById("change_pass_container").style.display = "none";
        this.trabajador.nuevaContraseña = ""; // Restablecer la nueva contraseña
      }
    },
    async submitForm() {
      try {
        // Enviar la solicitud PUT solo si hay un RUT de trabajador definido
        if (!this.trabajador.rut) {
          console.error("No se ha proporcionado un RUT de trabajador");
          return;
        }

        const response = await axios.put(
          `/api/trabajadores/${this.trabajador.rut}`,
          this.trabajador
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      }
    },
  },
};
</script>

<style scoped>
@import "../../../assets/styles/views/sidebar/otros/informacion-personal.css";
</style>
