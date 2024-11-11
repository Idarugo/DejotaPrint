<template>
  <main class="container">
    <div class="contact-form">
      <h2>Contáctanos</h2>
      <p>
        Llena el formulario a continuación y nos pondremos en contacto contigo
        lo antes posible.
      </p>
      <form @submit.prevent="enviarMensaje" class="form">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input
            v-model="nombre"
            type="text"
            name="nombre"
            placeholder="Ingresa tu nombre"
            class="input-field"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input
            v-model="correo"
            type="email"
            name="correo"
            placeholder="Ingresa tu correo"
            class="input-field"
            required
          />
        </div>
        <div class="form-group">
          <label for="telefono">Telefono</label>
          <input
            v-model="telefono"
            type="text"
            name="telefono"
            placeholder="Ingresa tu teléfono"
            class="input-field"
            required
          />
        </div>
        <div class="form-group">
          <label for="message">Mensaje</label>
          <textarea
            v-model="mensaje"
            rows="6"
            name="mensaje"
            placeholder="Escribe tu mensaje aquí"
            class="input-field"
            required
          ></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      nombre: "",
      correo: "",
      telefono: "",
      mensaje: "",
      fecha: "",
    };
  },
  computed: {
    nombreLimpio() {
      return this.nombre.trim();
    },
    correoLimpio() {
      return this.correo.trim();
    },
    telefonoLimpio() {
      return this.telefono.trim();
    },
    mensajeLimpio() {
      return this.mensaje.trim();
    },
  },
  methods: {
    enviarMensaje() {
      if (
        this.nombreLimpio &&
        this.correoLimpio &&
        this.telefonoLimpio &&
        this.mensajeLimpio
      ) {
        // Obtener la fecha actual sin la hora
        const ahora = new Date();
        const dia = ahora.getDate().toString().padStart(2, "0");
        const mes = (ahora.getMonth() + 1).toString().padStart(2, "0");
        const año = ahora.getFullYear();
        this.fecha = `${año}-${mes}-${dia}`;

        // Realizar la solicitud HTTP POST a la ruta /api/contactos
        axios
          .post("http://localhost:3000/api/contactos", {
            nombre: this.nombreLimpio,
            correo: this.correoLimpio,
            telefono: this.telefonoLimpio,
            mensaje: this.mensajeLimpio,
            fecha: this.fecha, // Usar la fecha actual
          })
          .then((response) => {
            // Mostrar una alerta de éxito
            Swal.fire({
              title: "Mensaje enviado correctamente",
              text: response.data.message, // Suponiendo que el servidor devuelve un objeto con un campo 'message'
              icon: "success",
              confirmButtonText: "Aceptar",
            });

            // Limpiar los campos del formulario
            this.nombre = "";
            this.correo = "";
            this.telefono = "";
            this.mensaje = "";
          })
          .catch((error) => {
            // Mostrar una alerta de error
            Swal.fire({
              title: "Error al enviar mensaje",
              text: error.message,
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          });
      } else {
        // Mostrar una alerta de error si los campos están incompletos
        Swal.fire({
          title: "Por favor completa todos los campos",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/views/contacto.css";
</style>
