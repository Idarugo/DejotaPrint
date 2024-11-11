<template>
  <main>
    <div class="container">
      <h1>Administrar productos</h1>
      <table class="table table-striped">
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
        <tr v-for="producto in paginatedData" :key="producto.id">
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.descripcion }}</td>
          <td>{{ precioChileno(producto.precio) }}</td>
          <td>{{ producto.cantidad }}</td>
          <td>{{ estadoProducto(producto.estado) }}</td>
          <td>
            <button
              @click="verDetalles(producto)"
              class="btn btn-sm btn-info"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Ver Detalles
            </button>
            <button
              @click="prepararModificacion(producto)"
              class="btn btn-sm btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#modalModificar"
            >
              Modificar
            </button>
            <button
              @click="confirmarEliminar(producto.id)"
              class="btn btn-sm btn-danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </table>
      <Pagination
        :currentPage="currentPage"
        :totalItems="productos.length"
        :pageSize="pageSize"
        @page-changed="onPageChange"
      />
      <button
        @click="resetModal"
        class="btn btn-agregar"
        data-bs-toggle="modal"
        data-bs-target="#modalAgregar"
      >
        Agregar Producto
      </button>

      <!-- Modal para agregar nuevos elementos -->
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
                Agregar Producto
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="agregarProducto">
                <div class="form-group">
                  <label for="title">Nombre:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="nuevoProducto.nombre"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="content">Descripción:</label>
                  <textarea
                    class="form-control"
                    id="content"
                    v-model="nuevoProducto.descripcion"
                    required
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="productoId" class="form-label"
                    >Tipo de producto:</label
                  >
                  <select
                    class="form-select"
                    id="productoId"
                    v-model="nuevoProducto.subcategoria"
                    required
                  >
                    <option value="" disabled selected>
                      Seleccione un Tipo de producto
                    </option>
                    <option
                      v-for="subcategoria in subcategorias"
                      :key="subcategoria.id"
                      :value="subcategoria.id"
                    >
                      {{ subcategoria.nombre }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="precio">Precio:</label>
                  <input
                    type="number"
                    class="form-control"
                    id="precio"
                    v-model="nuevoProducto.precio"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="cantidad">Cantidad:</label>
                  <input
                    type="number"
                    class="form-control"
                    id="cantidad"
                    v-model="nuevoProducto.cantidad"
                    required
                  />
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    class="form-control"
                    id="iva"
                    v-model="nuevoProducto.iva"
                    hidden
                  />
                </div>
                <div class="form-group">
                  <label>Este producto es personalizado?</label>
                  <div>
                    <input
                      type="radio"
                      id="personalizadoSi"
                      value="1"
                      v-model="nuevoProducto.es_personalizado"
                    />
                    <label for="personalizadoSi">Sí</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="personalizadoNo"
                      value="0"
                      v-model="nuevoProducto.es_personalizado"
                    />
                    <label for="personalizadoNo">No</label>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-agregar">Agregar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal para modificar producto -->
      <div
        class="modal fade"
        id="modalModificar"
        tabindex="-1"
        aria-labelledby="modalModificarLabel"
        aria-hidden="true"
        ref="myModalModificarRef"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalModificarLabel">
                Modificar Producto
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form v-if="productoActual" @submit.prevent="modificarProducto">
                <div class="form-group">
                  <label for="titleModificar">Nombre:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="titleModificar"
                    v-model="productoActual.nombre"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="contentModificar">Descripción:</label>
                  <textarea
                    class="form-control"
                    id="contentModificar"
                    v-model="productoActual.descripcion"
                    required
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="productoIdModificar" class="form-label"
                    >Tipo de producto:</label
                  >
                  <select
                    class="form-select"
                    id="productoIdModificar"
                    v-model="productoActual.subcategoria"
                    required
                  >
                    <option value="" disabled selected>
                      Seleccione un Tipo de producto
                    </option>
                    <option
                      v-for="subcategoria in subcategorias"
                      :key="subcategoria.id"
                      :value="subcategoria.id"
                    >
                      {{ subcategoria.nombre }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="precioModificar">Precio:</label>
                  <input
                    type="number"
                    class="form-control"
                    id="precioModificar"
                    v-model="productoActual.precio"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="cantidadModificar">Cantidad:</label>
                  <input
                    type="number"
                    class="form-control"
                    id="cantidadModificar"
                    v-model="productoActual.cantidad"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="ivaModificar">IVA:</label>
                  <input
                    type="number"
                    class="form-control"
                    id="ivaModificar"
                    v-model="productoActual.iva"
                    required
                  />
                </div>
                <div class="form-group">
                  <label>¿Este producto es personalizado?</label>
                  <div>
                    <input
                      type="radio"
                      id="personalizado_si_modificar"
                      value="1"
                      v-model="productoActual.es_personalizado"
                    />
                    <label for="personalizado_si_modificar">Sí</label>
                    <input
                      type="radio"
                      id="personalizado_no_modificar"
                      value="0"
                      v-model="productoActual.es_personalizado"
                    />
                    <label for="personalizado_no_modificar">No</label>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">
                    Guardar cambios
                  </button>
                </div>
              </form>
              <div v-else>
                <p>No se ha seleccionado ningún producto para modificar.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal para ver detalles del producto -->
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
                Detalles del producto
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <template v-if="productoActual">
                <p><strong>Nombre:</strong> {{ productoActual.nombre }}</p>
                <p>
                  <strong>Descripción:</strong>
                  {{ productoActual.descripcion }}
                </p>
                <p>
                  <strong>Categoria:</strong>
                  {{ productoActual.nombre_categoria }}
                </p>
                <p>
                  <strong>Tipo de Producto:</strong>
                  {{ productoActual.nombre_subcategoria }}
                </p>
                <p>
                  <strong>Precio:</strong>
                  {{ precioChileno(productoActual.precio) }}
                </p>
                <p>
                  <strong>Cantidad:</strong>
                  {{ productoActual.cantidad }}
                </p>
                <p>
                  <strong>Personalizado:</strong>
                  {{ productoActual.es_personalizado ? "Sí" : "No" }}
                </p>
              </template>
              <template v-else>
                <p>No se ha seleccionado ningún producto.</p>
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
import { Modal } from "bootstrap";
import Pagination from "../../../components/Pagination.vue"; // Asegúrate de la ruta correcta del componente

export default {
  components: { Pagination },
  data() {
    return {
      productos: [],
      paginatedData: [],
      currentPage: 1,
      pageSize: 5,
      subcategorias: [],
      productoActual: null,
      nuevoProducto: {
        nombre: "",
        descripcion: "",
        subcategoria: "",
        precio: 0,
        cantidad: 0,
        estado: 0,
        iva: 19.0, // Valor predeterminado para el IVA
        es_personalizado: 0, // Valor predeterminado para personalizado
      },
    };
  },
  created() {
    this.fetchproductos();
    this.fetchsubcategorias();
  },
  watch: {
    productos() {
      this.paginatedData = this.getPaginatedData();
    },
    currentPage() {
      this.paginatedData = this.getPaginatedData();
    },
  },
  computed: {
    precioChileno() {
      return (precio) => {
        if (typeof precio !== "undefined") {
          return "$ " + precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        } else {
          return "";
        }
      };
    },
  },
  methods: {
    estadoProducto(estado) {
      return estado === 1 ? "Personalizado" : "Publico";
    },
    onPageChange(page) {
      this.currentPage = page;
      this.paginatedData = this.getPaginatedData();
    },
    getPaginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.productos.slice(start, end);
    },
    fetchproductos() {
      const token = localStorage.getItem("token");
      axios
        .get("/api/productos/admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
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
    fetchsubcategorias() {
      axios
        .get("/api/subcategorias")
        .then((response) => {
          this.subcategorias = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los tipos de productos:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener los tipos de productos. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    agregarProducto() {
      const token = localStorage.getItem("token");

      axios
        .post("/api/productos", this.nuevoProducto, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const nuevoProducto = { ...this.nuevoProducto, id: response.data.id };
          this.productos.push(nuevoProducto);
          this.resetModal();
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Producto agregado exitosamente",
          });

          // Actualiza la paginación
          this.currentPage = Math.ceil(this.productos.length / this.pageSize);
          this.paginatedData = this.getPaginatedData();

          // Cierra el modal utilizando Bootstrap
          const modal = Modal.getInstance(
            document.getElementById("modalAgregar")
          );
          if (modal) {
            modal.hide();
          }

          // Elimina manualmente el backdrop
          document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
            backdrop.parentNode.removeChild(backdrop);
          });
          document.body.classList.remove("modal-open");
          document.body.style.paddingRight = "";
        })
        .catch((error) => {
          console.error("Error al agregar el producto:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al agregar el producto. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    resetModal() {
      this.productoActual = null;
      // Si no usas Bootstrap para cerrar el modal, agrega este código
      const modalElement = document.getElementById("modalAgregar");
      const modal = Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
      modalElement.addEventListener("hidden.bs.modal", () => {
        modalElement.remove();
      });
    },
    prepararModificacion(producto) {
      this.productoActual = producto;
    },
    modificarProducto() {
      this.productoActual.estado = 0;
      axios
        .put(`/api/productos/${this.productoActual.id}`, this.productoActual)
        .then(() => {
          const modal = document.getElementById("modalModificar");
          const bootstrapModal = Modal.getInstance(modal);
          bootstrapModal.hide();
          Swal.fire("Modificado", "El producto ha sido modificado.", "success");
          this.fetchproductos();
        })
        .catch((error) => {
          console.error("Error al modificar el producto:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al modificar el producto. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    verDetalles(producto) {
      this.productoActual = producto;
    },
    confirmarEliminar(productoId) {
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
          this.eliminarproducto(productoId);
        }
      });
    },
    eliminarproducto(productoId) {
      axios
        .delete(`/api/productos/${productoId}`)
        .then(() => {
          const index = this.productos.findIndex(
            (producto) => producto.id === productoId
          );
          if (index !== -1) {
            this.productos.splice(index, 1);
            this.paginatedData = this.getPaginatedData();
            Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar el producto:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar el producto. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    resetModal() {
      this.productoActual = null;
      const modal = document.getElementById("modalAgregar");
      const bootstrapModal = Modal.getInstance(modal);
      bootstrapModal.hide();
    },
  },
};
</script>

<style scoped>
@import "../../../assets/styles/components/sidebar.css";
@import "../../../assets/styles/views/sidebar/core/producto.css";
</style>
