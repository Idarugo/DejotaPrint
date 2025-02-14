<template>
  <main>
    <div class="container">
      <h1>Administrar ofertas</h1>
      <table>
        <!-- Encabezados de la tabla -->
        <tr>
          <th>Producto</th>
          <th>Precio Descuento</th>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
        <!-- Filas de la tabla -->
        <tr v-for="oferta in paginatedData" :key="oferta.id">
          <td>{{ oferta.nombre_producto }}</td>
          <td>{{ precioChileno(oferta.precio_descuento) }}</td>
          <td>{{ new Date(oferta.fecha_inicio).toLocaleDateString() }}</td>
          <td>{{ new Date(oferta.fecha_fin).toLocaleDateString() }}</td>
          <td>{{ estadoOferta(oferta.estado) }}</td>
          <td>
            <!-- Botón para ver detalles -->
            <button
              @click="verDetalles(oferta)"
              class="btn btn-sm btn-info"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Ver Detalles
            </button>
            <!-- Botón para bloquear/desbloquear -->
            <button
              @click="cambiarEstado(oferta.id, oferta.estado === 1 ? 0 : 1)"
              class="btn btn-sm btn-warning"
            >
              {{ oferta.estado === 1 ? "Bloquear" : "Desbloquear" }}
            </button>
            <!-- Botón para eliminar -->
            <button
              @click="confirmarEliminar(oferta.id)"
              class="btn btn-sm btn-danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </table>
      <Pagination
        :currentPage="currentPage"
        :totalItems="ofertas.length"
        :pageSize="pageSize"
        @page-changed="onPageChange"
      />
      <!-- Botón para agregar oferta -->
      <button
        type="button"
        class="btn btn-agregar"
        data-bs-toggle="modal"
        data-bs-target="#modalAgregar"
      >
        Agregar Oferta
      </button>

      <!-- Agregar modal para agregar oferta -->
      <div
        class="modal fade"
        id="modalAgregar"
        tabindex="-1"
        aria-labelledby="modalAgregarOfertaLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalAgregarOfertaLabel">
                Agregar nueva oferta
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!-- Formulario para agregar oferta -->
              <form @submit.prevent="agregarOferta">
                <!-- Campos del formulario -->
                <div class="mb-3">
                  <label for="productoId" class="form-label">Producto:</label>
                  <select
                    class="form-select"
                    id="productoId"
                    v-model="createOferta.producto_id"
                    required
                  >
                    <!-- Opción por defecto -->
                    <option value="" disabled selected>
                      Seleccione un producto
                    </option>
                    <!-- Iterar sobre los productos -->
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
                  <label for="precioDescuento" class="form-label"
                    >Precio Descuento:</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="precioDescuento"
                    v-model="createOferta.precio_descuento"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="fechaInicio" class="form-label"
                    >Fecha Inicio:</label
                  >
                  <input
                    type="date"
                    class="form-control"
                    id="fechaInicio"
                    v-model="createOferta.fecha_inicio"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="fechaFin" class="form-label">Fecha Fin:</label>
                  <input
                    type="date"
                    class="form-control"
                    id="fechaFin"
                    v-model="createOferta.fecha_fin"
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

      <!-- Modal para ver detalles del oferta -->
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
                Detalles del oferta
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!-- Contenido del modal -->
              <template v-if="ofertaActual">
                <p>
                  <strong>Producto:</strong> {{ ofertaActual.nombre_producto }}
                </p>
                <p>
                  <strong>Precio descuento:</strong>
                  {{ ofertaActual.precio_descuento }}
                </p>
                <p>
                  <strong>Fecha Inicio:</strong>
                  {{ new Date(ofertaActual.fecha_inicio).toLocaleDateString() }}
                </p>
                <p>
                  <strong>Fecha Fin:</strong>
                  {{ new Date(ofertaActual.fecha_fin).toLocaleDateString() }}
                </p>
              </template>
              <template v-else>
                <p>No se ha seleccionado ningún oferta.</p>
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
import Pagination from "../../../components/Pagination.vue";
import { Modal } from "bootstrap"; // Asegúrate de importar Bootstrap Modal

export default {
  components: { Pagination },
  name: "ofertaAdmin",
  data() {
    return {
      ofertas: [],
      productos: [], // Asegúrate de definir la propiedad productos
      ofertaActual: null,
      createOferta: {
        producto_id: "",
        precio_descuento: "",
        fecha_inicio: "",
        fecha_fin: "",
        estado: 1,
      },
      paginatedData: [],
      currentPage: 1,
      pageSize: 5,
    };
  },

  created() {
    this.fetchofertas();
    this.fetchProductos();
  },
  watch: {
    ofertas() {
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
      return this.ofertas.slice(start, end);
    },
    fetchofertas() {
      axios
        .get("/api/ofertas")
        .then((response) => {
          this.ofertas = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener las ofertas:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener las ofertas. Por favor, intenta de nuevo más tarde.",
          });
        });
    },

    fetchProductos() {
      axios
        .get("/api/productos") // Ruta del endpoint para obtener todos los productos
        .then((response) => {
          this.productos = response.data; // Almacenamos los productos en la propiedad productos
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
    agregarOferta() {
      // Validación del formulario
      if (
        !this.createOferta.producto_id ||
        !this.createOferta.precio_descuento ||
        !this.createOferta.fecha_inicio ||
        !this.createOferta.fecha_fin
      ) {
        Swal.fire(
          "Campos incompletos",
          "Por favor completa todos los campos.",
          "warning"
        );
        return;
      }

      // Enviar solicitud al servidor para agregar la oferta
      axios
        .post("/api/ofertas", this.createOferta)
        .then((response) => {
          // Limpiar el formulario
          this.createOferta = {
            producto_id: "",
            precio_descuento: "",
            fecha_inicio: "",
            fecha_fin: "",
            estado: 1,
          };

          // Cierra el modal utilizando Bootstrap
          const modalElement = document.getElementById("modalAgregar");
          if (modalElement) {
            const modal = Modal.getInstance(modalElement);
            if (modal) {
              modal.hide();
            }
          }

          // Elimina manualmente el backdrop
          document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
            backdrop.parentNode.removeChild(backdrop);
          });
          document.body.classList.remove("modal-open");
          document.body.style.paddingRight = "";

          // Actualizar la lista de ofertas
          this.fetchofertas();

          // Mostrar mensaje de éxito
          Swal.fire(
            "Oferta agregada",
            "La oferta ha sido agregada correctamente.",
            "success"
          );
        })
        .catch((error) => {
          console.error("Error al agregar oferta:", error);
          // Mostrar mensaje de error
          Swal.fire(
            "Error",
            "Hubo un error al agregar la oferta. Por favor, intenta de nuevo más tarde.",
            "error"
          );
        });
    },

    verDetalles(oferta) {
      this.ofertaActual = oferta;
    },
    confirmarEliminar(ofertaId) {
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
          this.eliminaroferta(ofertaId);
        }
      });
    },
    eliminaroferta(ofertaId) {
      axios
        .delete(`/api/ofertas/${ofertaId}`)
        .then(() => {
          // Eliminar la oferta de la lista localmente
          const index = this.ofertas.findIndex(
            (oferta) => oferta.id === ofertaId
          );
          if (index !== -1) {
            this.ofertas.splice(index, 1);

            // Actualizar la paginación
            this.paginatedData = this.getPaginatedData();

            Swal.fire("Eliminado", "La oferta ha sido eliminada.", "success");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar la oferta:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar la oferta. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    estadoOferta(estado) {
      return estado === 1 ? "Habilitado" : "Deshabilitado";
    },
    cambiarEstado(ofertaId, nuevoEstado) {
      axios
        .put(`/api/ofertas/${ofertaId}/estado`, { estado: nuevoEstado })
        .then(() => {
          // Actualizar el estado de la oferta localmente
          const oferta = this.ofertas.find((t) => t.id === ofertaId);
          if (oferta) {
            oferta.estado = nuevoEstado;
          }
          Swal.fire(
            "Estado actualizado",
            "El estado de la oferta ha sido actualizado correctamente.",
            "success"
          );
        })
        .catch((error) => {
          console.error("Error al actualizar el estado de la oferta:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al actualizar el estado de la oferta. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
  },
  computed: {
    precioChileno() {
      return (precio) => {
        return "$ " + precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
    },
  },
};
</script>

<style scoped>
@import "../../../assets/styles/components/sidebar.css";
@import "../../../assets/styles/views/sidebar/core/oferta.css";
</style>
