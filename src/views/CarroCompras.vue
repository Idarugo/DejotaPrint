<template>
  <div class="container">
    <div class="row">
      <!-- Carro de Compras -->
      <div class="col-md-7 ms-2">
        <!-- Añadido margen a la izquierda -->
        <div class="carro-compras card shadow-sm border-0">
          <div class="card-body">
            <h2 class="card-title">Carro de Compras</h2>
            <div class="productos-lista" v-if="productosEnCarro.length > 0">
              <table class="table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(producto, index) in productosEnCarro"
                    :key="index"
                  >
                    <td>{{ producto.nombre }}</td>
                    <td>
                      {{ producto.cantidad }}
                    </td>
                    <td>
                      {{ precioChileno(producto.precio * producto.cantidad) }}
                    </td>
                    <td>
                      <button
                        @click="eliminarProducto(index)"
                        class="btn btn-link text-danger p-0"
                      >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="acciones-carro">
                <button @click="vaciarCarro" class="btn btn-outline-danger">
                  Vaciar Carro
                </button>
              </div>
            </div>
            <div class="mensaje-vacio-container" v-else>
              <p class="mensaje-vacio">
                El carrito de compras está actualmente vacío. Puede regresar y
                comenzar a agregar productos.
              </p>
              <router-link
                :to="{ name: 'productos' }"
                class="btn btn-outline-secondary"
              >
                Volver atrás y seguir comprando
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- Revisión del Pedido -->
      <div class="col-md-4 ms-auto">
        <!-- Ajuste para empujar a la derecha -->
        <div class="revision-pedido card shadow-sm border-0">
          <div class="card-body">
            <h3 class="card-title">Revisión del Pedido</h3>
            <hr class="separator" />
            <p class="total">Total: {{ precioChileno(totalCarro) }}</p>
            <router-link
              :to="{ name: 'ConfirmacionPago' }"
              class="btn btn-dark btn-block btn-pago"
            >
              Proceder al Pago
            </router-link>
            <router-link
              :to="{ name: 'productos' }"
              class="btn btn-outline-secondary btn-block"
            >
              Seguir comprando
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="empty-footer"></div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "CarroCompras",
  computed: {
    productosEnCarro() {
      return this.$store.state.carro;
    },
    totalCarro() {
      return this.productosEnCarro.reduce((total, producto) => {
        return total + producto.precio * producto.cantidad;
      }, 0);
    },
    precioChileno() {
      return (precio) => {
        return "$ " + precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
    },
  },
  methods: {
    eliminarProducto(index) {
      this.$store.commit("eliminarProductoDelCarro", index);
    },
    vaciarCarro() {
      this.$store.commit("vaciarCarro");
    },
    incrementarCantidad(index) {
      const producto = this.productosEnCarro[index];
      if (producto.cantidad < producto.stock) {
        // Asegúrate de que 'stock' sea el atributo correcto
        this.$store.commit("incrementarCantidadProducto", index);
      } else {
        Swal.fire({
          title: "Cantidad máxima alcanzada",
          text: "Ya has alcanzado la cantidad máxima disponible.",
          icon: "info",
          confirmButtonText: "Aceptar",
        });
      }
    },
    decrementarCantidad(index) {
      const producto = this.productosEnCarro[index];
      if (producto.cantidad > 1) {
        this.$store.commit("decrementarCantidadProducto", index);
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/views/CarroCompras.css";
</style>
