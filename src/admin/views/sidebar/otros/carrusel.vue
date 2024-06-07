<template>
  <main>
    <div class="container">
      <h1>Administrar Carrusel</h1>
      <table>
        <tr>
          <th>Titulo</th>
          <th>Imagen</th>
          <th>Enlace</th>
          <th>Posicion</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
        <tr v-for="carrusel in carrusels" :key="carrusel.id">
          <td>{{ carrusel.titulo }}</td>
          <td>
            <img
              :src="'http://localhost:3000' + carrusel.imagen_url"
              alt="Imagen del carrusel"
              width="50"
            />
          </td>
          <td>{{ carrusel.enlace }}</td>
          <td>{{ carrusel.posicion }}</td>
          <td>{{ estadocarrusel(carrusel.estado) }}</td>
          <td>
            <button
              @click="verDetalles(carrusel)"
              class="btn btn-sm btn-info"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Ver Detalles
            </button>
            <button
              @click="cambiarEstado(carrusel.id, carrusel.estado === 1 ? 0 : 1)"
              class="btn btn-sm btn-warning"
            >
              {{ carrusel.estado === 1 ? "Bloquear" : "Desbloquear" }}
            </button>
            <button
              @click="confirmarEliminar(carrusel.id)"
              class="btn btn-sm btn-danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </table>
      <button
        type="button"
        class="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#modalAgregar"
      >
        Agregar carrusel
      </button>

      <div
        class="modal fade"
        id="modalAgregar"
        tabindex="-1"
        aria-labelledby="modalAgregarLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalAgregarLabel">
                Agregar nuevo carrusel
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="agregarCarrusel">
                <div class="mb-3">
                  <label for="titulo" class="form-label">Titulo:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="titulo"
                    v-model="createCarrusel.titulo"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="imagen" class="form-label">Imagen:</label>
                  <input
                    type="file"
                    class="form-control"
                    id="imagen"
                    @change="onFileChange"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="enlace" class="form-label">Enlace:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="enlace"
                    v-model="createCarrusel.enlace"
                    placeholder="Opcional"
                  />
                </div>

                <div class="mb-3">
                  <label for="posicion" class="form-label">Posicion:</label>
                  <input
                    type="number"
                    class="form-control"
                    id="posicion"
                    v-model="createCarrusel.posicion"
                    required
                  />
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">Agregar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="myModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Detalles del carrusel
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <template v-if="carruselActual">
                <p><strong>Titulo:</strong> {{ carruselActual.titulo }}</p>
                <p>
                  <strong>Imagen:</strong>
                  <img
                    :src="'http://localhost:3000' + carruselActual.imagen_url"
                    alt="Imagen del carrusel"
                    width="100"
                  />
                </p>
                <p><strong>Enlace:</strong> {{ carruselActual.enlace }}</p>
                <p><strong>Posicion:</strong> {{ carruselActual.posicion }}</p>
                <p>
                  <strong>Estado:</strong>
                  {{ estadocarrusel(carruselActual.estado) }}
                </p>
              </template>
              <template v-else>
                <p>No se ha seleccionado ningún carrusel.</p>
              </template>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "carruselAdmin",
  data() {
    return {
      carrusels: [],
      modalTitle: "Detalles del carrusel",
      carruselActual: null,
      createCarrusel: {
        titulo: "",
        imagen: null,
        enlace: "",
        posicion: "",
        estado: 1,
      },
    };
  },
  created() {
    this.fetchCarrusels();
  },
  methods: {
    fetchCarrusels() {
      axios
        .get("/api/carrusel")
        .then((response) => {
          this.carrusels = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los carrusels:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener los carrusels. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    agregarCarrusel() {
      if (
        !this.createCarrusel.titulo ||
        !this.createCarrusel.imagen ||
        !this.createCarrusel.enlace ||
        !this.createCarrusel.posicion
      ) {
        Swal.fire(
          "Campos incompletos",
          "Por favor completa todos los campos.",
          "warning"
        );
        return;
      }

      let formData = new FormData();
      formData.append("titulo", this.createCarrusel.titulo);
      formData.append("imagen", this.createCarrusel.imagen);
      formData.append("enlace", this.createCarrusel.enlace);
      formData.append("posicion", this.createCarrusel.posicion);
      formData.append("estado", this.createCarrusel.estado);

      axios
        .post("/api/carrusel", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.createCarrusel = {
            titulo: "",
            imagen: null,
            enlace: "",
            posicion: "",
            estado: 1,
          };
          this.fetchCarrusels();
          // Manejar el cierre del modal sin jQuery
          const modalElement = document.getElementById("modalAgregar");
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
          Swal.fire(
            "Carrusel agregado",
            "El carrusel ha sido agregado correctamente.",
            "success"
          );
        })
        .catch((error) => {
          console.error("Error al agregar el carrusel:", error);
          Swal.fire(
            "Error",
            "Hubo un error al agregar el carrusel. Por favor, intenta de nuevo más tarde.",
            "error"
          );
        });
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.createCarrusel.imagen = file;
    },
    verDetalles(carrusel) {
      this.carruselActual = carrusel;
    },
    confirmarEliminar(carruselId) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.eliminarCarrusel(carruselId);
        }
      });
    },
    eliminarCarrusel(carruselId) {
      axios
        .delete(`/api/carrusel/${carruselId}`)
        .then(() => {
          this.fetchCarrusels();
          Swal.fire("Eliminado", "El carrusel ha sido eliminado.", "success");
        })
        .catch((error) => {
          console.error("Error al eliminar el carrusel:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar el carrusel. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    cambiarEstado(carruselId, nuevoEstado) {
      axios
        .put(`/api/carrusel/${carruselId}/estado`, { estado: nuevoEstado })
        .then(() => {
          const carrusel = this.carrusels.find((t) => t.id === carruselId);
          if (carrusel) {
            carrusel.estado = nuevoEstado;
          }
          Swal.fire(
            "Estado actualizado",
            "El estado del carrusel ha sido actualizado correctamente.",
            "success"
          );
        })
        .catch((error) => {
          console.error("Error al actualizar el estado del carrusel:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al actualizar el estado del carrusel. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    estadocarrusel(estado) {
      return estado === 1 ? "Habilitado" : "Deshabilitado";
    },
  },
};
</script>

<style scoped>
@import "../../../assets/styles/views/sidebar/otros/carrusel.css";
</style>
