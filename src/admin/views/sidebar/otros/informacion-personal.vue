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
import Swal from "sweetalert2";
import EventBus from "@/admin/services/eventBus";

export default {
  data() {
    return {
      trabajador: {
        rut: "",
        nombre: "",
        apellido: "",
        telefono: "",
        correo: "",
        cambiarContraseña: "2",
        nuevaContraseña: "",
      },
    };
  },
  mounted() {
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
    cambiarContraseña() {
      if (this.trabajador.cambiarContraseña === "1") {
        document.getElementById("change_pass_container").style.display =
          "block";
      } else {
        document.getElementById("change_pass_container").style.display = "none";
        this.trabajador.nuevaContraseña = "";
      }
    },
    async submitForm() {
      try {
        const token = localStorage.getItem("token");

        if (!this.trabajador.rut) {
          console.error("No se ha proporcionado un RUT de trabajador");
          return;
        }

        const updatedFields = {};
        if (this.trabajador.nombre)
          updatedFields.nombre = this.trabajador.nombre;
        if (this.trabajador.apellido)
          updatedFields.apellido = this.trabajador.apellido;
        if (this.trabajador.telefono)
          updatedFields.telefono = this.trabajador.telefono;
        if (this.trabajador.nuevaContraseña)
          updatedFields.nuevaContraseña = this.trabajador.nuevaContraseña;

        const response = await axios.put(
          `http://localhost:3000/api/trabajadores/${this.trabajador.rut}`,
          updatedFields,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);

        EventBus.emit("trabajador-actualizado", this.trabajador);

        Swal.fire({
          icon: "success",
          title: "Actualización exitosa",
          text: "La información personal ha sido actualizada correctamente.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error al enviar el formulario:", error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al actualizar la información. Por favor, intenta de nuevo.",
          showConfirmButton: true,
        });
      }
    },
  },
};
</script>

<style scoped>
@import "../../../assets/styles/views/sidebar/otros/informacion-personal.css";
</style>
