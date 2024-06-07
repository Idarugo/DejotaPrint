<template>
  <main>
    <div class="container">
      <h1>Administrar Categoría</h1>

      <table>
        <!-- Encabezados de la tabla -->
        <tr>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
        <!-- Filas de la tabla -->
        <tr v-for="categoria in categorias" :key="categoria.id">
          <td>{{ categoria.nombre }}</td>
          <td>
            <!-- Botón para modificar -->
            <button
              @click="prepararModificacion(categoria)"
              class="btn btn-sm btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#modalModificar"
            >
              Modificar
            </button>
            <!-- Botón para eliminar -->
            <button
              @click="confirmarEliminar(categoria.id)"
              class="btn btn-sm btn-danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </table>
      <button
        @click="prepararAgregar"
        class="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#modalAgregar"
      >
        Agregar Categoría
      </button>
      <!-- Modal para agregar categoría -->
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
                Agregar Categoría
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!-- Formulario para agregar categoría -->
              <form @submit.prevent="agregarCategoria">
                <div class="form-group">
                  <label for="nombreAgregar">Nombre:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nombreAgregar"
                    v-model="nuevaCategoria.nombre"
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
      <!-- Modal para modificar categoría -->
      <div
        class="modal fade"
        id="modalModificar"
        tabindex="-1"
        aria-labelledby="modalModificarLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalModificarLabel">
                Modificar Categoría
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!-- Formulario para modificar categoría -->
              <form v-if="categoriaActual" @submit.prevent="modificarCategoria">
                <div class="form-group">
                  <label for="nombreModificar">Nombre:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nombreModificar"
                    v-model="categoriaActual.nombre"
                    required
                  />
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">
                    Guardar cambios
                  </button>
                </div>
              </form>
              <div v-else>
                <p>No se ha seleccionado ninguna categoría para modificar.</p>
              </div>
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
  name: "categoriaAdmin",
  data() {
    return {
      categorias: [],
      categoriaActual: null,
      nuevaCategoria: {
        nombre: "",
      },
    };
  },
  created() {
    this.fetchCategorias();
  },
  methods: {
    fetchCategorias() {
      axios
        .get("/api/categorias")
        .then((response) => {
          this.categorias = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener las categorías:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener las categorías. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    prepararAgregar() {
      this.nuevaCategoria = { nombre: "" };
    },
    agregarCategoria() {
      axios
        .post("/api/categorias", this.nuevaCategoria)
        .then((response) => {
          // Agrega la nueva categoría a la lista localmente
          this.categorias.push({
            ...this.nuevaCategoria,
            id: response.data.id,
          });
          // Cierra el modal de agregar
          const modal = document.getElementById("modalAgregar");
          const bootstrapModal = Modal.getOrCreateInstance(modal); // Usa el objeto Modal de Bootstrap
          bootstrapModal.hide();
          // Muestra un mensaje de éxito
          Swal.fire("Agregado", "La categoría ha sido agregada.", "success");
        })
        .catch((error) => {
          console.error("Error al agregar la categoría:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al agregar la categoría. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    prepararModificacion(categoria) {
      this.categoriaActual = categoria;
    },
    modificarCategoria() {
      axios
        .put(`/api/categorias/${this.categoriaActual.id}`, this.categoriaActual)
        .then(() => {
          // Cierra el modal de modificación
          const modal = document.getElementById("modalModificar");
          const bootstrapModal = Modal.getOrCreateInstance(modal); // Usa el objeto Modal de Bootstrap
          bootstrapModal.hide();
          // Muestra un mensaje de éxito
          Swal.fire(
            "Modificado",
            "La categoría ha sido modificada.",
            "success"
          );
          // Actualiza la lista de categorías
          this.fetchCategorias();
        })
        .catch((error) => {
          console.error("Error al modificar la categoría:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al modificar la categoría. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    confirmarEliminar(categoriaId) {
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
          this.eliminarCategoria(categoriaId);
        }
      });
    },
    eliminarCategoria(categoriaId) {
      axios
        .delete(`/api/categorias/${categoriaId}`)
        .then(() => {
          // Eliminar la categoría de la lista localmente
          const index = this.categorias.findIndex(
            (categoria) => categoria.id === categoriaId
          );
          if (index !== -1) {
            this.categorias.splice(index, 1);
            Swal.fire(
              "Eliminado",
              "La categoría ha sido eliminada.",
              "success"
            );
          }
        })
        .catch((error) => {
          console.error("Error al eliminar la categoría:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar la categoría. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    resetModal() {
      this.categoriaActual = null;
      const modal = document.getElementById("modalModificar");
      const bootstrapModal = Modal.getOrCreateInstance(modal); // Usa el objeto Modal de Bootstrap
      bootstrapModal.hide();
    },
  },
};
</script>
  
  <style scoped>
@import "../../../assets/styles/views/sidebar/core/categoria.css";
</style>
  