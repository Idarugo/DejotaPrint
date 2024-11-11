<template>
  <main>
    <div class="container">
      <h1>Administrar Descuentos</h1>
      <table class="table table-striped">
        <tr>
          <th>Código</th>
          <th>Descuento (%)</th>
          <th>Fecha de Expiración</th>
          <th>Productos Válidos</th>
          <th>Acciones</th>
        </tr>
        <tr v-for="descuento in paginatedData" :key="descuento.id">
          <td>{{ descuento.codigo }}</td>
          <td>{{ descuento.descuento }}</td>
          <td>{{ descuento.fecha_expiracion || "N/A" }}</td>
          <td>
            {{
              descuento.productos_validos ? descuento.productos_validos : "N/A"
            }}
          </td>
          <td>
            <button
              @click="prepararModificacion(descuento)"
              class="btn btn-sm btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#modalModificarDescuento"
            >
              Modificar
            </button>
            <button
              @click="confirmarEliminar(descuento.id)"
              class="btn btn-sm btn-danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </table>
      <Pagination
        :currentPage="currentPage"
        :totalItems="descuentos.length"
        :pageSize="pageSize"
        @page-changed="onPageChange"
      />
      <button
        @click="prepararAgregar"
        class="btn btn-agregar"
        data-bs-toggle="modal"
        data-bs-target="#modalAgregarDescuento"
      >
        Agregar Descuento
      </button>

      <!-- Modal para agregar nuevos descuentos -->
      <div
        class="modal fade"
        id="modalAgregarDescuento"
        tabindex="-1"
        aria-labelledby="modalAgregarDescuentoLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalAgregarDescuentoLabel">
                Agregar Descuento
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="agregarDescuento">
                <div class="form-group">
                  <label for="codigo">Código:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="codigo"
                    v-model="nuevoDescuento.codigo"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="descuento">Descuento (%):</label>
                  <input
                    type="number"
                    class="form-control"
                    id="descuento"
                    v-model="nuevoDescuento.descuento"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="fechaExpiracion">Fecha de Expiración:</label>
                  <input
                    type="date"
                    class="form-control"
                    id="fechaExpiracion"
                    v-model="nuevoDescuento.fecha_expiracion"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="productosValidos">Productos Válidos:</label>
                  <select
                    class="form-select"
                    id="productosValidos"
                    v-model="nuevoDescuento.productos_validos"
                    multiple
                    required
                  >
                    <option
                      v-for="producto in productos"
                      :key="producto.id"
                      :value="producto.id"
                    >
                      {{ producto.nombre }}
                    </option>
                  </select>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-agregar">Agregar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal para modificar descuento -->
      <div
        class="modal fade"
        id="modalModificarDescuento"
        tabindex="-1"
        aria-labelledby="modalModificarDescuentoLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalModificarDescuentoLabel">
                Modificar Descuento
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form v-if="descuentoActual" @submit.prevent="modificarDescuento">
                <div class="form-group">
                  <label for="codigoModificar">Código:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="codigoModificar"
                    v-model="descuentoActual.codigo"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="descuentoModificar">Descuento (%):</label>
                  <input
                    type="number"
                    class="form-control"
                    id="descuentoModificar"
                    v-model="descuentoActual.descuento"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="fechaExpiracionModificar"
                    >Fecha de Expiración:</label
                  >
                  <input
                    type="date"
                    class="form-control"
                    id="fechaExpiracionModificar"
                    v-model="descuentoActual.fecha_expiracion"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="productosValidosModificar"
                    >Productos Válidos:</label
                  >
                  <select
                    class="form-select"
                    id="productosValidosModificar"
                    v-model="descuentoActual.productos_validos"
                    multiple
                    required
                  >
                    <option
                      v-for="producto in productos"
                      :key="producto.id"
                      :value="producto.id"
                    >
                      {{ producto.nombre }}
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
                <p>No se ha seleccionado ningún descuento para modificar.</p>
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
import Pagination from "../../../components/Pagination.vue"; // Asegúrate de la ruta correcta del componente

export default {
  components: { Pagination },
  data() {
    return {
      descuentos: [],
      productos: [],
      descuentoActual: null,
      nuevoDescuento: {
        codigo: "",
        descuento: 0,
        fecha_expiracion: "",
        productos_validos: [],
      },
      paginatedData: [],
      currentPage: 1,
      pageSize: 5,
    };
  },
  created() {
    this.fetchDescuentos();
    this.fetchProductos();
  },
  watch: {
    descuentos() {
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
      return this.descuentos.slice(start, end);
    },
    fetchDescuentos() {
      axios
        .get("/api/descuentos")
        .then((response) => {
          this.descuentos = response.data;
          this.paginatedData = this.getPaginatedData(); // Actualiza la tabla
        })
        .catch((error) => {
          console.error("Error al obtener los descuentos:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener los descuentos. Por favor, intenta de nuevo más tarde.",
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
    agregarDescuento() {
      axios
        .post("/api/descuentos", this.nuevoDescuento)
        .then((response) => {
          const nuevoDescuento = {
            ...this.nuevoDescuento,
            id: response.data.id,
          };
          this.descuentos.push(nuevoDescuento);
          this.resetModal("modalAgregarDescuento");
          this.paginatedData = this.getPaginatedData(); // Actualiza la tabla
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Descuento agregado exitosamente",
          });
        })
        .catch((error) => {
          console.error("Error al agregar el descuento:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al agregar el descuento. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    prepararModificacion(descuento) {
      this.descuentoActual = { ...descuento };
    },
    modificarDescuento() {
      axios
        .put(`/api/descuentos/${this.descuentoActual.id}`, this.descuentoActual)
        .then(() => {
          const index = this.descuentos.findIndex(
            (descuento) => descuento.id === this.descuentoActual.id
          );
          if (index !== -1) {
            this.descuentos.splice(index, 1, this.descuentoActual);
            this.paginatedData = this.getPaginatedData(); // Actualiza la tabla
            this.resetModal("modalModificarDescuento");
            Swal.fire(
              "Modificado",
              "El descuento ha sido modificado.",
              "success"
            );
          }
        })
        .catch((error) => {
          console.error("Error al modificar el descuento:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al modificar el descuento. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    confirmarEliminar(descuentoId) {
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
          this.eliminarDescuento(descuentoId);
        }
      });
    },
    eliminarDescuento(descuentoId) {
      axios
        .delete(`/api/descuentos/${descuentoId}`)
        .then(() => {
          const index = this.descuentos.findIndex(
            (descuento) => descuento.id === descuentoId
          );
          if (index !== -1) {
            this.descuentos.splice(index, 1);
            this.paginatedData = this.getPaginatedData();
            Swal.fire(
              "Eliminado",
              "El descuento ha sido eliminado.",
              "success"
            );
          }
        })
        .catch((error) => {
          console.error("Error al eliminar el descuento:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar el descuento. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    resetModal(modalId) {
      this.descuentoActual = null;
      this.nuevoDescuento = {
        codigo: "",
        descuento: 0,
        fecha_expiracion: "",
        productos_validos: [],
      };
      const modal = document.getElementById(modalId);
      const bootstrapModal = Modal.getOrCreateInstance(modal);
      bootstrapModal.hide();

      // Eliminar manualmente el backdrop
      const backdrops = document.querySelectorAll(".modal-backdrop");
      backdrops.forEach((backdrop) => backdrop.remove());
      document.body.classList.remove("modal-open");
      document.body.style.paddingRight = "";
    },
  },
};
</script>

<style scoped>
@import "../../../assets/styles/components/sidebar.css";
@import "../../../assets/styles/views/sidebar/core/descuento.css";
</style>
