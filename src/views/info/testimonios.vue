<template>
  <div class="form-container">
    <h1>Comparte tu testimonio</h1>
    <p>
      Ayuda a otros a descubrir nuestro increíble producto compartiendo tu
      experiencia.
    </p>
    <form @submit.prevent="agregarTestimonio">
      <div class="row">
        <div class="col-12 form-group">
          <label for="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            v-model="form.createTestimonio.nombre"
            placeholder="Introduzca su nombre"
            required
          />
        </div>
        <div class="col-12 form-group">
          <label for="imagen">Imagen de Perfil</label>
          <input type="file" id="imagen" @change="onFileChange" />
        </div>
        <div class="col-12 form-group">
          <label for="mensaje">Homenaje</label>
          <textarea
            id="mensaje"
            v-model="form.createTestimonio.mensaje"
            placeholder="Comparte tu experiencia"
            required
          ></textarea>
        </div>
        <button type="submit">Enviar testimonio</button>
      </div>
    </form>
  </div>
</template>
  
  <script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      form: {
        createTestimonio: {
          nombre: "",
          imagen_url: "",
          mensaje: "",
          estado: 1,
        },
      },
      imagen: null,
    };
  },
  methods: {
    agregarTestimonio() {
      const { nombre, mensaje } = this.form.createTestimonio;
      if (!nombre || !mensaje) {
        Swal.fire(
          "Campos incompletos",
          "Por favor completa todos los campos.",
          "warning"
        );
        return;
      }

      let formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("imagen", this.imagen);
      formData.append("mensaje", mensaje);
      formData.append("estado", this.form.createTestimonio.estado);

      axios
        .post("/api/testimonios", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.form.createTestimonio = {
            nombre: "",
            imagen_url: "",
            mensaje: "",
            estado: 1,
          };
          this.imagen = null;
          Swal.fire(
            "Testimonio agregado",
            "El testimonio ha sido agregado correctamente.",
            "success"
          );
        })
        .catch((error) => {
          console.error("Error al agregar testimonio:", error);
          Swal.fire(
            "Error",
            "Hubo un error al agregar el testimonio. Por favor, intenta de nuevo más tarde.",
            "error"
          );
        });
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.imagen = file;
    },
  },
};
</script>
  
  <style>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-container h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.form-group input[type="file"] {
  padding: 3px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #333;
}
</style>
  