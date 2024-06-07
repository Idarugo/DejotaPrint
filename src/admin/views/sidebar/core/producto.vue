<template>
  <main>
    <div class="container">
      <h1>Administrar productos</h1>
      <table>
        <!-- Encabezados de la tabla -->
        <tr>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Acciones</th>
        </tr>
        <!-- Filas de la tabla -->
        <tr v-for="producto in productos" :key="producto.id">
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.descripcion }}</td>
          <td>{{ precioChileno(producto.precio) }}</td>
          <td>{{ producto.cantidad }}</td>
          <td>
            <!-- Botón para ver detalles -->
            <button
              @click="verDetalles(producto)"
              class="btn btn-sm btn-info"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Ver Detalles
            </button>
            <!-- Botón para modificar -->
            <button
              @click="prepararModificacion(producto)"
              class="btn btn-sm btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#modalModificar"
            >
              Modificar
            </button>
            <!-- Botón para eliminar -->
            <button
              @click="confirmarEliminar(producto.id)"
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
              <!-- Formulario para agregar nuevos elementos -->
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
                  <label for="content">Descripcion:</label>
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
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">Agregar</button>
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
              <!-- Formulario para modificar producto -->
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
                  <label for="contentModificar">Descripcion:</label>
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
              <!-- Contenido del modal -->
              <template v-if="productoActual">
                <p><strong>Nombre:</strong> {{ productoActual.nombre }}</p>
                <p>
                  <strong>Descripcion:</strong>
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

export default {
  data() {
    return {
      productos: [],
      subcategorias: [],
      productoActual: null, // Almacena el producto actual para ver detalles o modificar
      nuevoProducto: {
        nombre: "",
        descripcion: "",
        subcategoria: "",
        precio: 0,
        cantidad: 0,
      },
    };
  },
  created() {
    this.fetchproductos();
    this.fetchsubcategorias();
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
    fetchproductos() {
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
    fetchsubcategorias() {
      axios
        .get("/api/subcategorias") // Ruta del endpoint para obtener todos los productos
        .then((response) => {
          this.subcategorias = response.data; // Almacenamos los productos en la propiedad productos
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
      // Envía la solicitud POST para agregar el nuevo producto
      axios
        .post("/api/productos", this.nuevoProducto)
        .then((response) => {
          // Crea el nuevo producto con los datos de la respuesta
          const nuevoProducto = {
            ...this.nuevoProducto,
            id: response.data.id,
          };
          // Agrega el nuevo producto a la lista localmente
          this.productos.push(nuevoProducto);
          // Reinicia el formulario y cierra el modal
          this.resetModal();
          // Muestra un mensaje de éxito
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Producto agregado exitosamente",
          });
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
    prepararModificacion(producto) {
      this.productoActual = producto;
    },
    modificarProducto() {
      axios
        .put(`/api/productos/${this.productoActual.id}`, this.productoActual)
        .then(() => {
          // Cierra el modal de modificación
          const modal = document.getElementById("modalModificar");
          const bootstrapModal = Modal.getInstance(modal); // Usa el objeto Modal de Bootstrap
          bootstrapModal.hide();
          // Muestra un mensaje de éxito
          Swal.fire("Modificado", "El producto ha sido modificado.", "success");
          // Actualiza la lista de productos
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
          // Eliminar el productoo de la lista localmente
          const index = this.productos.findIndex(
            (producto) => producto.id === productoId
          );
          if (index !== -1) {
            this.productos.splice(index, 1);
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
      const bootstrapModal = Modal.getInstance(modal); // Usa el objeto Modal de Bootstrap
      bootstrapModal.hide();
    },
  },
};
</script>

<style scoped>
@import "../../../assets/styles/components/sidebar.css";
@import "../../../assets/styles/views/sidebar/core/producto.css";
</style>
