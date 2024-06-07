<template>
  <div class="main-content">
    <div class="carro-compras-container">
      <div class="carro-compras">
        <h2>Carro de Compras</h2>
        <div class="productos-lista" v-if="productosEnCarro.length > 0">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(producto, index) in productosEnCarro" :key="index">
                <td>{{ producto.nombre }}</td>
                <td>{{ producto.cantidad }}</td>
                <td>
                  {{ precioChileno(producto.precio * producto.cantidad) }}
                </td>
                <td>
                  <button @click="eliminarProducto(index)" class="btn-eliminar">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="acciones-carro">
            <button @click="vaciarCarro" class="btn-vaciar">
              Vaciar Carro
            </button>
          </div>
        </div>
        <div class="mensaje-vacio-container" v-else>
          <p class="mensaje-vacio">
            El carrito de compras está actualmente vacío. Puede regresar y
            comenzar a agregar productos.
          </p>
          <router-link :to="{ name: 'Inicio' }" class="btn-volver">
            Volver atrás y seguir comprando
          </router-link>
        </div>
      </div>
      <div class="revision-pedido" v-if="productosEnCarro.length > 0">
        <h3>Revisión del Pedido</h3>
        <hr class="separator" />
        <p class="total">Total: {{ precioChileno(totalCarro) }}</p>
        <router-link :to="{ name: 'ConfirmacionPago' }" class="btn-pagar">
          Proceder al Pago
        </router-link>
        <router-link :to="{ name: 'Inicio' }" class="btn-continuar">
          Seguir comprando
        </router-link>
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
  },
};
</script>

<style scoped>
@import "../assets/styles/views/CarroCompras.css";

.carro-compras-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
}

.carro-compras,
.revision-pedido {
  width: 48%;
}

.carro-compras {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.revision-pedido {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

td {
  text-align: center;
}

.btn-eliminar {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
}

.btn-eliminar i {
  font-size: 1.2em;
}

.revision-pedido h3 {
  margin-bottom: 10px;
  font-size: 1.5em;
  text-align: center;
}

.separator {
  border: 0;
  height: 1px;
  background: #ddd;
  margin: 10px 0;
}

.revision-pedido p.total {
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.btn-pagar,
.btn-continuar,
.btn-volver {
  display: block;
  width: 100%;
  margin-top: 10px;
  padding: 10px 0;
  font-size: 1em;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
}

.btn-pagar {
  background-color: #28a745;
  color: white;
  border: none;
}

.btn-continuar,
.btn-volver {
  background-color: #007bff;
  color: white;
  text-decoration: none;
}

.btn-continuar:hover,
.btn-volver:hover {
  background-color: #0056b3;
}

.mensaje-vacio-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.mensaje-vacio {
  margin: 20px 0;
  font-size: 1.2em;
}
</style>
