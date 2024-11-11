<template>
  <main>
    <div class="container">
      <h1>Administrar Tipo de Producto</h1>

      <table>
        <!-- Encabezados de la tabla -->
        <tr>
          <th>Nombre</th>
          <th>Categoria</th>
          <th>Acciones</th>
        </tr>
        <!-- Filas de la tabla -->
        <tr v-for="subcategoria in subcategorias" :key="subcategoria.id">
          <td>{{ subcategoria.nombre }}</td>
          <td>{{ subcategoria.categoria_nombre }}</td>

          <td>
            <!-- Botón para modificar -->
            <button
              @click="prepararModificacion(subcategoria)"
              class="btn btn-sm btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#modalModificar"
            >
              Modificar
            </button>
            <!-- Botón para eliminar -->
            <button
              @click="confirmarEliminar(subcategoria.id)"
              class="btn btn-sm btn-danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </table>
      <button
        @click="prepararAgregar"
        class="btn btn-agregar"
        data-bs-toggle="modal"
        data-bs-target="#modalAgregar"
      >
        Agregar Tipo de Producto
      </button>
      <!-- Modal para agregar subcategoría -->
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
                Agregar Tipo de Producto
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!-- Formulario para agregar subcategoría -->
              <form @submit.prevent="agregarsubcategoria">
                <div class="form-group">
                  <label for="nombreAgregar">Nombre:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nombreAgregar"
                    v-model="nuevasubcategoria.nombre"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="categoriaId" class="form-label">Categoria:</label>
                  <select
                    class="form-select"
                    id="categoriaId"
                    v-model="nuevasubcategoria.categoria"
                    required
                  >
                    <option value="" disabled selected>
                      Seleccione una categoria
                    </option>
                    <option
                      v-for="categoria in categorias"
                      :key="categoria.id"
                      :value="categoria.id"
                    >
                      {{ categoria.nombre }}
                    </option>
                  </select>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">Agregar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal para modificar subcategoría -->
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
                Modificar Tipo de Producto
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!-- Formulario para modificar subcategoría -->
              <form
                v-if="subcategoriaActual"
                @submit.prevent="modificarsubcategoria"
              >
                <div class="form-group">
                  <label for="nombreModificar">Nombre:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nombreModificar"
                    v-model="subcategoriaActual.nombre"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="categoriaIdModificar" class="form-label"
                    >Categoria:</label
                  >
                  <select
                    class="form-select"
                    id="categoriaIdModificar"
                    v-model="subcategoriaActual.categoria"
                    required
                  >
                    <option value="" disabled selected>
                      Seleccione una categoria
                    </option>
                    <option
                      v-for="categoria in categorias"
                      :key="categoria.id"
                      :value="categoria.id"
                    >
                      {{ categoria.nombre }}
                    </option>
                  </select>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">
                    Guardar cambios
                  </button>
                </div>
              </form>
              <div v-else>
                <p>
                  No se ha seleccionado ninguna subcategoría para modificar.
                </p>
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
  name: "subcategoriaAdmin",
  data() {
    return {
      subcategorias: [],
      categorias: [],
      subcategoriaActual: null,
      nuevasubcategoria: {
        nombre: "",
        categoria: "",
      },
    };
  },
  created() {
    this.fetchsubcategorias();
    this.fetchCategorias();
  },
  methods: {
    fetchsubcategorias() {
      axios
        .get("/api/subcategorias")
        .then((response) => {
          this.subcategorias = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener las subcategorías:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener las subcategorías. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
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
      this.nuevasubcategoria = { nombre: "", categoria: "" };
    },
    agregarsubcategoria() {
      axios
        .post("/api/subcategorias", this.nuevasubcategoria)
        .then((response) => {
          // Agrega la nueva subcategoría a la lista localmente
          this.subcategorias.push({
            ...this.nuevasubcategoria,
            id: response.data.id,
            categoria_nombre: this.categorias.find(
              (c) => c.id === this.nuevasubcategoria.categoria
            ).nombre,
          });
          // Cierra el modal de agregar
          const modal = document.getElementById("modalAgregar");
          const bootstrapModal = Modal.getOrCreateInstance(modal); // Usa el objeto Modal de Bootstrap
          bootstrapModal.hide();
          // Muestra un mensaje de éxito
          Swal.fire(
            "Agregado",
            "El tipo de producto ha sido agregado.",
            "success"
          );
        })
        .catch((error) => {
          console.error("Error al agregar el tipo de producto:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al agregar el tipo de producto. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    prepararModificacion(subcategoria) {
      this.subcategoriaActual = subcategoria;
    },
    modificarsubcategoria() {
      axios
        .put(
          `/api/subcategorias/${this.subcategoriaActual.id}`,
          this.subcategoriaActual
        )
        .then(() => {
          // Cierra el modal de modificación
          const modal = document.getElementById("modalModificar");
          const bootstrapModal = Modal.getOrCreateInstance(modal); // Usa el objeto Modal de Bootstrap
          bootstrapModal.hide();
          // Muestra un mensaje de éxito
          Swal.fire(
            "Modificado",
            "El tipo de producto ha sido modificado.",
            "success"
          );
          // Actualiza la lista de subcategorías
          this.fetchsubcategorias();
        })
        .catch((error) => {
          console.error("Error al modificar el tipo de producto:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al modificar el tipo de producto. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    confirmarEliminar(subcategoriaId) {
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
          this.eliminarsubcategoria(subcategoriaId);
        }
      });
    },
    eliminarsubcategoria(subcategoriaId) {
      axios
        .delete(`/api/subcategorias/${subcategoriaId}`)
        .then(() => {
          // Eliminar la subcategoría de la lista localmente
          const index = this.subcategorias.findIndex(
            (subcategoria) => subcategoria.id === subcategoriaId
          );
          if (index !== -1) {
            this.subcategorias.splice(index, 1);
            Swal.fire(
              "Eliminado",
              "El tipo de producto ha sido eliminado.",
              "success"
            );
          }
        })
        .catch((error) => {
          console.error("Error al eliminar el tipo de producto:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar el tipo de producto. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    resetModal() {
      this.subcategoriaActual = null;
      const modal = document.getElementById("modalModificar");
      const bootstrapModal = Modal.getOrCreateInstance(modal); // Usa el objeto Modal de Bootstrap
      bootstrapModal.hide();
    },
  },
};
</script>

<style scoped>
@import "../../../assets/styles/views/sidebar/core/subcategorias.css";
</style>
