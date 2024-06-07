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
        <tr v-for="oferta in ofertas" :key="oferta.id">
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
      <!-- Botón para agregar oferta -->
      <button
        type="button"
        class="btn btn-primary mb-3"
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
      <!-- Modal para ver detalles del ofertao -->
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
                Detalles del ofertao
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
import $ from "jquery";

export default {
  name: "ofertaAdmin",
  data() {
    return {
      ofertas: [],
      modalTitle: "Detalles del oferta",
      ofertaActual: null,
      createOferta: {
        producto_id: "",
        precio_descuento: "",
        fecha_inicio: "",
        fecha_fin: "",
        estado: 1,
      },
    };
  },

  created() {
    this.fetchofertas();
    this.fetchProductos();
  },
  methods: {
    fetchofertas() {
      axios
        .get("/api/ofertas")
        .then((response) => {
          this.ofertas = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los ofertas:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener los ofertas. Por favor, intenta de nuevo más tarde.",
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
        .then(() => {
          // Limpiar el formulario
          this.createOferta = {
            producto_id: "",
            precio_descuento: "",
            fecha_inicio: "",
            fecha_fin: "",
            estado: 1,
          };
          // Cerrar el modal
          $("#modalAgregar").modal("hide");
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
          // Eliminar el oferta de la lista localmente
          const index = this.ofertas.findIndex(
            (oferta) => oferta.id === ofertaId
          );
          if (index !== -1) {
            this.ofertas.splice(index, 1);
            Swal.fire("Eliminado", "El oferta ha sido eliminado.", "success");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar el oferta:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar el oferta. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    resetModal() {
      this.ofertaActual = null;
      this.$refs.myModalRef.hide();
    },
    estadoOferta(estado) {
      return estado === 1 ? "Habilitado" : "Deshabilitado";
    },
    cambiarEstado(ofertaId, nuevoEstado) {
      axios
        .put(`/api/ofertas/${ofertaId}/estado`, { estado: nuevoEstado })
        .then(() => {
          // Actualizar el estado del oferta localmente
          const oferta = this.ofertas.find((t) => t.id === ofertaId);
          if (oferta) {
            oferta.estado = nuevoEstado;
          }
          Swal.fire(
            "Estado actualizado",
            "El estado del oferta ha sido actualizado correctamente.",
            "success"
          );
        })
        .catch((error) => {
          console.error("Error al actualizar el estado del oferta:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al actualizar el estado del oferta. Por favor, intenta de nuevo más tarde.",
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
  