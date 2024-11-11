<template>
  <main>
    <div class="container">
      <h1>Administrar Imágenes de Producto</h1>
      <table>
        <tr>
          <th>Producto</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
        <tr v-for="imagenProducto in paginatedData" :key="imagenProducto.id">
          <td>{{ imagenProducto.nombre_producto }}</td>
          <td>
            <img
              :src="'http://localhost:3000' + imagenProducto.url_imagen"
              alt="Imagen del producto"
              width="50"
            />
          </td>
          <td>
            <button
              @click="prepararModificacion(imagenProducto)"
              class="btn btn-sm btn-info"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Modificar
            </button>
            <button
              @click="confirmarEliminar(imagenProducto.id)"
              class="btn btn-sm btn-danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </table>
      <Pagination
        :currentPage="currentPage"
        :totalItems="imagenProductos.length"
        :pageSize="pageSize"
        @page-changed="onPageChange"
      />
      <button
        type="button"
        class="btn btn-agregar"
        data-bs-toggle="modal"
        data-bs-target="#modalAgregar"
      >
        Agregar Imagen
      </button>

      <!-- Modal para agregar imagen -->
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
              <h5 class="modal-title" id="modalAgregarLabel">Agregar Imagen</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="agregarImagen">
                <div class="mb-3">
                  <label for="producto" class="form-label">Producto</label>
                  <select
                    class="form-control"
                    id="producto"
                    v-model="nuevoProducto.producto_id"
                    required
                  >
                    <option value="" disabled>Seleccione un producto</option>
                    <option
                      v-for="producto in productos"
                      :key="producto.id"
                      :value="producto.id"
                    >
                      {{ producto.nombre }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="imagen" class="form-label">Imagen</label>
                  <input
                    type="file"
                    class="form-control"
                    id="imagen"
                    @change="onFileChange($event, 'nuevoProducto')"
                    required
                  />
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-agregar">Agregar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal para modificar imagen -->
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
                Modificar Imagen
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <template v-if="imagenProductoActual">
                <div class="mb-3">
                  <label for="productoModificar" class="form-label"
                    >Producto</label
                  >
                  <select
                    class="form-control"
                    id="productoModificar"
                    v-model="imagenProductoActual.producto_id"
                    required
                  >
                    <option value="" disabled>Seleccione un producto</option>
                    <option
                      v-for="producto in productos"
                      :key="producto.id"
                      :value="producto.id"
                    >
                      {{ producto.nombre }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="imagenModificar" class="form-label">Imagen</label>
                  <input
                    type="file"
                    class="form-control"
                    id="imagenModificar"
                    @change="onFileChange($event, 'imagenProductoActual')"
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
                @click="actualizarImagen"
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
import Pagination from "../../../components/Pagination.vue";

export default {
  components: { Pagination },
  name: "imagenProductoAdmin",
  data() {
    return {
      imagenProductos: [],
      productos: [],
      imagenProductoActual: null,
      nuevoProducto: {
        producto_id: "",
        imagen: null,
      },
      selectedFile: null,
      paginatedData: [],
      currentPage: 1,
      pageSize: 5,
    };
  },
  created() {
    this.fetchImagenProductos();
    this.fetchProductos();
  },
  watch: {
    imagenProductos() {
      this.paginatedData = this.getPaginatedData();
    },
    currentPage() {
      this.paginatedData = this.getPaginatedData();
    },
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page;
    },
    getPaginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.imagenProductos.slice(start, end);
    },
    fetchImagenProductos() {
      axios
        .get("/api/imagenesProducto")
        .then((response) => {
          this.imagenProductos = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los imagen productos:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener los imagen productos. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    fetchProductos() {
      axios
        .get("/api/productos")
        .then((response) => {
          this.productos = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los productos:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener los productos. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    onFileChange(event, target) {
      const file = event.target.files[0];
      if (file) {
        this[target].imagen = file;
      }
    },
    cerrarModal(idModal) {
      const modal = document.getElementById(idModal);
      const bootstrapModal = Modal.getInstance(modal);
      if (bootstrapModal) {
        bootstrapModal.hide();
      }

      // Elimina manualmente el backdrop
      document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
        backdrop.parentNode.removeChild(backdrop);
      });
      document.body.classList.remove("modal-open");
      document.body.style.paddingRight = "";
    },
    agregarImagen() {
      const formData = new FormData();
      formData.append("producto_id", this.nuevoProducto.producto_id);
      formData.append("imagen", this.nuevoProducto.imagen);

      axios
        .post("/api/imagenesProducto", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.fetchImagenProductos();
          this.nuevoProducto = {
            producto_id: "",
            imagen: null,
          };
          this.cerrarModal("modalAgregar");
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Imagen de producto agregada correctamente",
          });
        })
        .catch((error) => {
          console.error("Error al agregar la imagen de producto:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al agregar la imagen de producto. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    prepararModificacion(imagenProducto) {
      this.imagenProductoActual = { ...imagenProducto };
    },
    actualizarImagen() {
      const formData = new FormData();
      formData.append("producto_id", this.imagenProductoActual.producto_id);
      if (this.imagenProductoActual.imagen instanceof File) {
        formData.append("imagen", this.imagenProductoActual.imagen);
      } else {
        formData.append("url_imagen", this.imagenProductoActual.url_imagen);
      }

      axios
        .put(`/api/imagenesProducto/${this.imagenProductoActual.id}`, formData)
        .then(() => {
          this.fetchImagenProductos();
          this.cerrarModal("myModal");
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Imagen de producto actualizada correctamente",
          });
        })
        .catch((error) => {
          console.error("Error al actualizar la imagen de producto:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al actualizar la imagen de producto. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    confirmarEliminar(imagenProductoId) {
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
          this.eliminarImagenProducto(imagenProductoId);
        }
      });
    },
    eliminarImagenProducto(imagenProductoId) {
      axios
        .delete(`/api/imagenesProducto/${imagenProductoId}`)
        .then(() => {
          this.fetchImagenProductos();
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Imagen de producto eliminada correctamente",
          });
        })
        .catch((error) => {
          console.error("Error al eliminar la imagen de producto:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar la imagen de producto. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
  },
};
</script>

<style scoped>
@import "../../../assets/styles/views/sidebar/otros/imagen-producto.css";
</style>
