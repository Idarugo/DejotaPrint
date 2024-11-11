<template>
  <main>
    <div class="container">
      <h1>Administrar Cotizaciones</h1>
      <table class="table table-striped">
        <tr>
          <th>Producto</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Cantidad</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
        <tr v-for="cotizacion in paginatedData" :key="cotizacion.id">
          <td>{{ cotizacion.nombre_producto }}</td>
          <td>{{ cotizacion.nombre }}</td>
          <td>{{ cotizacion.email }}</td>
          <td>{{ cotizacion.telefono }}</td>
          <td>{{ cotizacion.cantidad }}</td>
          <td>{{ cotizacion.descripcion }}</td>
          <td>
            <!-- Botón para ver detalles -->
            <button
              @click="verDetalles(cotizacion)"
              class="btn btn-sm btn-info"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Ver Detalles
            </button>
            <!-- Botón para eliminar -->
            <button
              @click="confirmarEliminar(cotizacion.id)"
              class="btn btn-sm btn-danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </table>
      <Pagination
        :currentPage="currentPage"
        :totalItems="cotizaciones.length"
        :pageSize="pageSize"
        @page-changed="onPageChange"
      />
      <!-- Modal para ver detalles de la cotización -->
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
                Detalles de la Cotización
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
              <template v-if="cotizacionActual">
                <p>
                  <strong>Producto:</strong>
                  {{ cotizacionActual.nombre_producto }}
                </p>
                <p><strong>Nombre:</strong> {{ cotizacionActual.nombre }}</p>
                <p><strong>Email:</strong> {{ cotizacionActual.email }}</p>
                <p>
                  <strong>Teléfono:</strong> {{ cotizacionActual.telefono }}
                </p>
                <p>
                  <strong>Cantidad:</strong> {{ cotizacionActual.cantidad }}
                </p>
                <p>
                  <strong>Descripción:</strong>
                  {{ cotizacionActual.descripcion }}
                </p>
              </template>
              <template v-else>
                <p>No se ha seleccionado ninguna cotización.</p>
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

export default {
  components: { Pagination },
  name: "CotizacionAdmin",
  data() {
    return {
      cotizaciones: [],
      cotizacionActual: null,
      paginatedData: [],
      currentPage: 1,
      pageSize: 5,
    };
  },
  created() {
    this.fetchCotizaciones();
  },
  watch: {
    cotizaciones() {
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
      return this.cotizaciones.slice(start, end);
    },
    fetchCotizaciones() {
      axios
        .get("/api/cotizacion")
        .then((response) => {
          this.cotizaciones = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener las cotizaciones:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener las cotizaciones. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    verDetalles(cotizacion) {
      this.cotizacionActual = cotizacion;
    },
    confirmarEliminar(cotizacionId) {
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
          this.eliminarCotizacion(cotizacionId);
        }
      });
    },
    eliminarCotizacion(cotizacionId) {
      axios
        .delete(`/api/cotizaciones/${cotizacionId}`)
        .then(() => {
          const index = this.cotizaciones.findIndex(
            (cotizacion) => cotizacion.id === cotizacionId
          );
          if (index !== -1) {
            this.cotizaciones.splice(index, 1);
            this.paginatedData = this.getPaginatedData();
            Swal.fire(
              "Eliminado",
              "La cotización ha sido eliminada.",
              "success"
            );
          }
        })
        .catch((error) => {
          console.error("Error al eliminar la cotización:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar la cotización. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
  },
};
</script>
  
<style scoped>
@import "../../../assets/styles/components/sidebar.css";
@import "../../../assets/styles/views/sidebar/core/cotizacion.css";
</style>
  