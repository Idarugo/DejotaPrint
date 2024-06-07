<template>
  <main>
    <div class="container">
      <h1>Administrar Marcas</h1>
      <table>
        <tr>
          <th>Nombre</th>
          <th>Imagen</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
        <tr v-for="marca in marcas" :key="marca.id">
          <td>{{ marca.nombre }}</td>
          <td>
            <img
              :src="'http://localhost:3000' + marca.imagen"
              alt="Imagen de la marca"
              width="50"
            />
          </td>
          <td>{{ estadoMarca(marca.estado) }}</td>
          <td>
            <button
              @click="prepararModificacion(marca)"
              class="btn btn-sm btn-info"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Modificar
            </button>
            <button
              @click="cambiarEstado(marca.id, marca.estado === 1 ? 0 : 1)"
              class="btn btn-sm btn-warning"
            >
              {{ marca.estado === 1 ? "Bloquear" : "Desbloquear" }}
            </button>
            <button
              @click="confirmarEliminar(marca.id)"
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
        Agregar Marca
      </button>

      <!-- Modal para agregar marca -->
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
              <h5 class="modal-title" id="modalAgregarLabel">Agregar Marca</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="agregarMarca">
                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nombre"
                    v-model="nuevaMarca.nombre"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="imagen" class="form-label">Imagen:</label>
                  <input
                    type="file"
                    class="form-control"
                    id="imagen"
                    @change="onFileChange($event, 'nuevaMarca')"
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

      <!-- Modal para modificar marca -->
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
                Modificar marca
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <template v-if="marcaActual">
                <div class="mb-3">
                  <label for="nombreModificar" class="form-label"
                    >Nombre:</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="nombreModificar"
                    v-model="marcaActual.nombre"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="imagenModificar" class="form-label"
                    >Imagen:</label
                  >
                  <input
                    type="file"
                    class="form-control"
                    id="imagenModificar"
                    @change="onFileChange($event, 'marcaActual')"
                  />
                </div>
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
              <button
                type="button"
                class="btn btn-primary"
                @click="actualizarMarca"
              >
                Guardar cambios
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
import { Modal } from "bootstrap";

export default {
  name: "marcaAdmin",
  data() {
    return {
      marcas: [],
      marcaActual: null,
      nuevaMarca: {
        nombre: "",
        imagen: null,
        estado: 1,
      },
    };
  },
  created() {
    this.fetchMarcas();
  },
  methods: {
    fetchMarcas() {
      axios
        .get("/api/marcas")
        .then((response) => {
          this.marcas = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener las marcas:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener las marcas. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    onFileChange(event, target) {
      const file = event.target.files[0];
      if (file) {
        this[target].imagen = file;
      }
    },
    agregarMarca() {
      const formData = new FormData();
      formData.append("nombre", this.nuevaMarca.nombre);
      formData.append("imagen", this.nuevaMarca.imagen); // Aquí debe ser un archivo, no una URL
      formData.append("estado", this.nuevaMarca.estado);

      axios
        .post("/api/marcas", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.fetchMarcas();
          this.nuevaMarca = {
            nombre: "",
            imagen: null,
            estado: 1,
          };
          const modal = document.getElementById("modalAgregar");
          const bootstrapModal = Modal.getOrCreateInstance(modal);
          bootstrapModal.hide();
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Marca agregada correctamente",
          });
        })
        .catch((error) => {
          console.error("Error al agregar la marca:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al agregar la marca. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    prepararModificacion(marca) {
      this.marcaActual = { ...marca };
    },
    actualizarMarca() {
      const formData = new FormData();
      formData.append("nombre", this.marcaActual.nombre);
      if (this.marcaActual.imagen instanceof File) {
        formData.append("imagen", this.marcaActual.imagen);
      }
      formData.append("estado", this.marcaActual.estado);

      axios
        .put(`/api/marcas/${this.marcaActual.id}`, formData)
        .then(() => {
          this.fetchMarcas();
          const modal = document.getElementById("myModal");
          const bootstrapModal = Modal.getOrCreateInstance(modal);
          bootstrapModal.hide();
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Marca actualizada correctamente",
          });
        })
        .catch((error) => {
          console.error("Error al actualizar la marca:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al actualizar la marca. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    confirmarEliminar(marcaId) {
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
          this.eliminarMarca(marcaId);
        }
      });
    },
    eliminarMarca(marcaId) {
      axios
        .delete(`/api/marcas/${marcaId}`)
        .then(() => {
          this.fetchMarcas();
          Swal.fire({
            icon: "success",
            title: "Eliminado",
            text: "La marca ha sido eliminada.",
          });
        })
        .catch((error) => {
          console.error("Error al eliminar la marca:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar la marca. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    cambiarEstado(marcaId, nuevoEstado) {
      axios
        .put(`/api/marcas/${marcaId}/estado`, { estado: nuevoEstado })
        .then(() => {
          this.fetchMarcas();
          Swal.fire({
            icon: "success",
            title: "Estado actualizado",
            text: "El estado de la marca ha sido actualizado correctamente.",
          });
        })
        .catch((error) => {
          console.error("Error al actualizar el estado de la marca:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al actualizar el estado de la marca. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    estadoMarca(estado) {
      return estado === 1 ? "Habilitado" : "Deshabilitado";
    },
    getImagenUrl(imagenPath) {
      return `${window.location.origin}/${imagenPath}`;
    },
  },
};
</script>

<style scoped>
@import "../../../assets/styles/views/sidebar/otros/marcas.css";
</style>
