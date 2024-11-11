<template>
  <main class="container">
    <div class="form-container" v-if="validToken">
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
            <label for="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              v-model="form.createTestimonio.titulo"
              placeholder="Introduzca su título"
              required
            />
          </div>
          <div class="col-12 form-group">
            <label for="empresa">Empresa</label>
            <input
              type="text"
              id="empresa"
              v-model="form.createTestimonio.empresa"
              placeholder="Introduzca su empresa"
              required
            />
          </div>
          <div class="col-12 form-group">
            <label for="imagen">Imagen de Perfil</label>
            <input type="file" id="imagen" @change="onFileChange" />
          </div>
          <div class="col-12 form-group">
            <label for="mensaje">Mensaje</label>
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
    <div v-else>
      <p class="text-center mt-4">Enlace no válido o ya ha sido usado.</p>
    </div>
  </main>
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
          titulo: "",
          empresa: "",
          imagen_url: "",
          mensaje: "",
          estado: 0,
        },
      },
      imagen: null,
      validToken: false,
    };
  },
  methods: {
    agregarTestimonio() {
      const { nombre, titulo, empresa, mensaje } = this.form.createTestimonio;
      if (!nombre || !titulo || !empresa || !mensaje) {
        Swal.fire(
          "Campos incompletos",
          "Por favor completa todos los campos.",
          "warning"
        );
        return;
      }

      let formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("titulo", titulo);
      formData.append("empresa", empresa);
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
            titulo: "",
            empresa: "",
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

          // Invalida el token después de enviar el testimonio
          const urlParams = new URLSearchParams(window.location.search);
          const token = urlParams.get("token");
          axios.post(`/api/tokens/invalidate/${token}`).then(() => {
            setTimeout(() => {
              window.close();
            }, 10000);
          });
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
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    axios.get(`/api/tokens/verify/${token}`).then((response) => {
      if (response.data.valid) {
        this.validToken = true;
      } else {
        this.validToken = false;
      }
    });
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
