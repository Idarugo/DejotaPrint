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
        <tr v-for="imagenProducto in imagenProductos" :key="imagenProducto.id">
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
              @click="verDetalles(imagenProducto)"
              class="btn btn-sm btn-info"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Ver Detalles
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

      <button
        @click="resetModal"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modalAgregar"
      >
        Agregar Imagen
      </button>

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
                Detalles del imagen producto
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
                <p>
                  <strong>Producto:</strong>
                  {{ imagenProductoActual.nombre_producto }}
                </p>
                <p>
                  <strong>Imagen:</strong> {{ imagenProductoActual.url_imagen }}
                </p>
              </template>
              <template v-else>
                <p>No se ha seleccionado ningún imagen producto.</p>
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
                    @change="onFileChange"
                    required
                  />
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-success">Agregar</button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                </div>
              </form>
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
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

export default {
  name: "imagenProductoAdmin",
  data() {
    return {
      imagenProductos: [],
      productos: [],
      modalTitle: "Detalles del imagenProducto",
      imagenProductoActual: null,
      nuevoProducto: {
        producto_id: "",
        url_imagen: "",
      },
      selectedFile: null,
    };
  },
  created() {
    this.fetchImagenProductos();
    this.fetchProductos();
  },
  methods: {
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
    onFileChange(e) {
      this.selectedFile = e.target.files[0];
    },
    verDetalles(imagenProducto) {
      this.imagenProductoActual = imagenProducto;
    },
    agregarImagen() {
      if (!this.selectedFile) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Debe seleccionar una imagen antes de agregar.",
        });
        return;
      }

      const formData = new FormData();
      formData.append("producto_id", this.nuevoProducto.producto_id);
      formData.append("imagen", this.selectedFile);

      console.log("Producto ID:", this.nuevoProducto.producto_id);
      console.log("Selected File:", this.selectedFile);

      axios
        .post("/api/imagenesProducto", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Response:", response.data);
          this.imagenProductos.push(response.data);
          this.resetModal();
          const modalElement = document.getElementById("modalAgregar");
          const modal = new bootstrap.Modal(modalElement);
          modal.hide();
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Imagen producto agregada exitosamente",
          });
        })
        .catch((error) => {
          console.error("Error al agregar la imagen producto:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al agregar la imagen producto. Por favor, intenta de nuevo más tarde.",
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
          const index = this.imagenProductos.findIndex(
            (imagenProducto) => imagenProducto.id === imagenProductoId
          );
          if (index !== -1) {
            this.imagenProductos.splice(index, 1);
            Swal.fire(
              "Eliminado",
              "La imagen producto ha sido eliminada.",
              "success"
            );
          }
        })
        .catch((error) => {
          console.error("Error al eliminar la imagen producto:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar la imagen producto. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    resetModal() {
      this.nuevoProducto = {
        producto_id: "",
        url_imagen: "",
      };
      this.selectedFile = null;
    },
  },
};
</script>

<style scoped>
@import "../../../assets/styles/views/sidebar/otros/imagen-producto.css";
</style>
