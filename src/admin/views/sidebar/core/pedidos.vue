<template>
  <main>
    <div class="container">
      <h1>Administrar Pedidos</h1>
      <table>
        <!-- Encabezados de la tabla -->
        <tr>
          <th>Nº Pedido</th>
          <th>Fecha</th>
          <th>Método de Envío</th>
          <th>Total</th>
          <th>Acciones</th>
        </tr>
        <!-- Filas de la tabla -->
        <tr v-for="pedido in pedidos" :key="pedido.id">
          <td>{{ pedido.id }}</td>
          <td>{{ new Date(pedido.fecha).toLocaleDateString() }}</td>
          <td>{{ pedido.metodo_envio }}</td>
          <td>{{ precioChileno(pedido.total) }}</td>
          <td>
            <!-- Botón para ver detalles -->
            <button
              @click="verDetalles(pedido.id)"
              class="btn btn-sm btn-info"
              data-bs-toggle="modal"
              data-bs-target="#detalleModal"
            >
              Ver Detalles
            </button>
            <!-- Botón para eliminar -->
            <button
              @click="confirmarEliminar(pedido.id)"
              class="btn btn-sm btn-danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </table>

      <!-- Modal para ver detalles del pedido -->
      <div
        class="modal fade"
        id="detalleModal"
        tabindex="-1"
        aria-labelledby="detalleModalLabel"
        aria-hidden="true"
        ref="detalleModal"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="detalleModalLabel">
                Detalles del Pedido
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
              <template v-if="pedidoActual">
                <div class="row">
                  <div class="col-md-6">
                    <div class="card mb-3">
                      <div class="card-header">
                        <h5>Detalles del Pedido</h5>
                      </div>
                      <div class="card-body">
                        <p><strong>ID Pedido:</strong> {{ pedidoActual.id }}</p>
                        <p>
                          <strong>Fecha:</strong>
                          {{
                            new Date(pedidoActual.fecha).toLocaleDateString()
                          }}
                        </p>
                        <p>
                          <strong>Método de Envío:</strong>
                          {{ pedidoActual.metodo_envio }}
                        </p>
                        <p>
                          <strong>Total:</strong>
                          {{ precioChileno(pedidoActual.total) }}
                        </p>
                        <ul>
                          <li
                            v-for="detalle in pedidoActual.detalles"
                            :key="detalle.id"
                          >
                            Producto ID: {{ detalle.producto_id }} - Cantidad:
                            {{ detalle.cantidad }} - Precio:
                            {{ precioChileno(detalle.precio) }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="card mb-3">
                      <div class="card-header">
                        <h5>Información de Contacto</h5>
                      </div>
                      <div class="card-body">
                        <p>
                          <strong>Nombre:</strong>
                          {{ pedidoActual.contacto.nombre }}
                        </p>
                        <p>
                          <strong>Apellido:</strong>
                          {{ pedidoActual.contacto.apellido }}
                        </p>
                        <p>
                          <strong>Email:</strong>
                          {{ pedidoActual.contacto.email }}
                        </p>
                      </div>
                    </div>
                    <div class="card mb-3">
                      <div class="card-header">
                        <h5>Información de Factura</h5>
                      </div>
                      <div class="card-body">
                        <p>
                          <strong>Nombre:</strong>
                          {{ pedidoActual.factura.nombre }}
                        </p>
                        <p>
                          <strong>Apellido:</strong>
                          {{ pedidoActual.factura.apellido }}
                        </p>
                        <p>
                          <strong>RUT:</strong> {{ pedidoActual.factura.rut }}
                        </p>
                        <p>
                          <strong>Dirección:</strong>
                          {{ pedidoActual.factura.direccion }}
                        </p>
                        <p>
                          <strong>Teléfono:</strong>
                          {{ pedidoActual.factura.telefono }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <p>No se ha seleccionado ningún pedido.</p>
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

export default {
  name: "pedidoAdmin",
  data() {
    return {
      pedidos: [],
      pedidoActual: null,
    };
  },
  created() {
    this.fetchPedidos();
  },
  methods: {
    fetchPedidos() {
      axios
        .get("/api/pedidos")
        .then((response) => {
          this.pedidos = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los pedidos:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener los pedidos. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    verDetalles(pedidoId) {
      axios
        .get(`/api/pedidos/${pedidoId}`)
        .then((response) => {
          this.pedidoActual = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los detalles del pedido:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener los detalles del pedido. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    confirmarEliminar(pedidoId) {
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
          this.eliminarPedido(pedidoId);
        }
      });
    },
    eliminarPedido(pedidoId) {
      axios
        .delete(`/api/pedidos/${pedidoId}`)
        .then(() => {
          const index = this.pedidos.findIndex(
            (pedido) => pedido.id === pedidoId
          );
          if (index !== -1) {
            this.pedidos.splice(index, 1);
            Swal.fire("Eliminado", "El pedido ha sido eliminado.", "success");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar el pedido:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar el pedido. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    precioChileno(precio) {
      return "$ " + precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>
  
  <style scoped>
@import "../../../assets/styles/views/sidebar/core/pedidos.css";

.modal-lg {
  max-width: 80% !important;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.col-md-6 {
  flex: 0 0 50%;
  max-width: 50%;
}

.card {
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.card-body {
  padding: 1rem;
}

@media (max-width: 768px) {
  .col-md-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
  