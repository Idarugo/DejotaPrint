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
  methods: {
    enviarMensaje() {
      if (this.nombre && this.correo && this.telefono && this.mensaje) {
        // Obtener la fecha actual sin la hora
        const ahora = new Date();
        const dia = ahora.getDate().toString().padStart(2, "0");
        const mes = (ahora.getMonth() + 1).toString().padStart(2, "0");
        const año = ahora.getFullYear();
        this.fecha = `${año}-${mes}-${dia}`;

        // Realizar la solicitud HTTP POST a la ruta /api/contactos
        axios
          .post("http://localhost:3000/api/contactos", {
            nombre: this.nombre,
            correo: this.correo,
            telefono: this.telefono,
            mensaje: this.mensaje,
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
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
}

.contact-form h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.contact-form p {
  text-align: center;
  margin-bottom: 2rem;
  color: #666;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group textarea {
  resize: vertical;
}

button {
  width: 100%;
  padding: 1rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}
</style>
