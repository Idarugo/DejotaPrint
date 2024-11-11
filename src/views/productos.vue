<template>
  <main class="container-productos">
    <div class="filters">
      <h3>Filtros</h3>
      <div class="filter-section">
        <h4>Categoría</h4>
        <div v-if="categorias.length > 0">
          <div v-for="categoria in categorias" :key="categoria.id">
            <label>
              <input
                type="radio"
                :value="categoria.id"
                v-model="selectedCategoria"
                @change="fetchSubcategoriasAndFilter"
              />
              {{ categoria.nombre }}
            </label>
          </div>
        </div>
        <div v-else class="no-datos">
          <p>No hay categorías disponibles.</p>
        </div>
      </div>
      <div class="filter-section" v-if="filteredSubcategorias.length > 0">
        <h4>Tipo de Producto</h4>
        <div
          v-for="subcategoria in filteredSubcategorias"
          :key="subcategoria.id"
        >
          <label>
            <input
              type="radio"
              :value="subcategoria.id"
              v-model="selectedSubcategoria"
              @change="filterProducts"
            />
            {{ subcategoria.nombre }}
          </label>
        </div>
      </div>
    </div>
    <div class="product-area">
      <div class="sort-options-wrapper">
        <h3>Productos</h3>
        <div class="sort-options">
          <label for="sort-by">Ordenar por:</label>
          <div class="select-wrapper">
            <select v-model="sortBy" @change="filterProducts">
              <option value="featured">Destacados</option>
              <option value="new">Nuevos</option>
              <option value="lowToHigh">Precio: Bajo a Alto</option>
              <option value="highToLow">Precio: Alto a Bajo</option>
            </select>
            <i class="fas fa-sort"></i>
          </div>
        </div>
      </div>
      <div class="products">
        <div v-if="sortedAndFilteredProducts.length > 0" class="row">
          <div
            v-for="product in sortedAndFilteredProducts"
            :key="product.id"
            class="product-card"
          >
            <div class="image-placeholder" @click="goToDetail(product.id)">
              <img
                :src="
                  product.url_imagen
                    ? 'http://localhost:3000' + product.url_imagen
                    : 'http://localhost:3000/uploads/productos/default.jpg'
                "
                :alt="product.nombre"
                class="product-image"
              />
            </div>
            <h4>{{ truncatedText(product.nombre, 18) }}</h4>
            <p>{{ truncatedText(product.descripcion, 25) }}</p>
            <p v-if="product.oferta">
              <span class="original-price">{{
                precioChileno(product.precio)
              }}</span>
              <span class="px-2 discounted-price">{{
                precioChileno(product.oferta.precio_descuento)
              }}</span>
            </p>
            <p v-else>{{ precioChileno(product.precio) }}</p>
            <button
              v-if="!product.es_personalizado"
              @click="agregarAlCarro(product)"
            >
              Agregar al carrito
            </button>
            <button v-else @click="mostrarModalCotizacion(product)">
              Solicitar Presupuesto
            </button>
          </div>
        </div>
        <div v-else class="no-datos">
          <p>No hay productos disponibles en este momento.</p>
        </div>
      </div>
    </div>

    <!-- Modal de Bootstrap -->
    <div
      class="modal fade"
      id="cotizacionModal"
      tabindex="-1"
      aria-labelledby="cotizacionModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="cotizacionModalLabel">
              Solicitar Presupuesto
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form id="cotizacionForm" @submit.prevent="enviarCotizacion">
              <div class="mb-3">
                <label for="nombre" class="form-label">Tu nombre</label>
                <input
                  type="text"
                  class="form-control"
                  id="nombre"
                  v-model="cotizacion.nombre"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="cotizacion.email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="telefono" class="form-label">Teléfono</label>
                <input
                  type="text"
                  class="form-control"
                  id="telefono"
                  v-model="cotizacion.telefono"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="cantidad" class="form-label"
                  >¿Qué cantidad necesitas?</label
                >
                <select
                  id="cantidad"
                  class="form-control"
                  v-model="cotizacion.cantidad"
                  required
                >
                  <option value="">--Por favor, elige una opción--</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="500">500</option>
                  <option value="1000">1,000</option>
                  <option value="Otra">Otra</option>
                  <option value="Otro servicio">Otro servicio</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="descripcion" class="form-label"
                  >Cuéntanos qué necesitas</label
                >
                <textarea
                  class="form-control"
                  id="descripcion"
                  v-model="cotizacion.descripcion"
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn btn-presupuesto">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Swal from "sweetalert2";
import { Modal } from "bootstrap";

export default {
  data() {
    return {
      categorias: [],
      subcategorias: [],
      productos: [],
      ofertas: [],
      selectedCategoria: null,
      selectedSubcategoria: null,
      filteredProducts: [],
      filteredSubcategorias: [],
      sortBy: "featured",
      cart: [],
      cotizacion: {
        nombre: "",
        email: "",
        telefono: "",
        cantidad: 1,
        descripcion: "",
        producto_id: null,
      },
    };
  },
  computed: {
    sortedAndFilteredProducts() {
      let filteredProducts = this.filteredProducts;

      if (this.sortBy === "lowToHigh") {
        filteredProducts.sort((a, b) => a.precio - b.precio);
      } else if (this.sortBy === "highToLow") {
        filteredProducts.sort((a, b) => b.precio - a.precio);
      }

      return filteredProducts;
    },
    precioChileno() {
      return (precio) => {
        return "$" + precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
    },
  },
  methods: {
    truncatedText(text, length) {
      if (text.length > length) {
        return text.slice(0, length) + "...";
      }
      return text;
    },
    fetchCategorias() {
      fetch("http://localhost:3000/api/categorias")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener categorías");
          }
          return response.json();
        })
        .then((data) => {
          this.categorias = data;
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
        });
    },
    fetchSubcategoriasAndFilter() {
      if (this.selectedCategoria) {
        fetch(
          `http://localhost:3000/api/subcategorias?categoria=${this.selectedCategoria}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al obtener subcategorías");
            }
            return response.json();
          })
          .then((data) => {
            this.filteredSubcategorias = data.filter(
              (subcategoria) =>
                subcategoria.categoria === this.selectedCategoria
            );
            this.selectedSubcategoria = null;
            this.filterProducts();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.message,
            });
          });
      } else {
        this.filteredSubcategorias = [];
        this.selectedSubcategoria = null;
        this.filterProducts();
      }
    },
    fetchProductos() {
      fetch("http://localhost:3000/api/productos")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener productos");
          }
          return response.json();
        })
        .then((data) => {
          this.productos = data.map((producto) => ({
            ...producto,
            cantidadSeleccionada: 1,
          }));
          this.filteredProducts = this.productos;
          this.applyOffers();
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
        });
    },
    fetchOfertas() {
      fetch("http://localhost:3000/api/ofertas")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener ofertas");
          }
          return response.json();
        })
        .then((data) => {
          this.ofertas = data;
          this.applyOffers();
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
        });
    },
    applyOffers() {
      this.productos.forEach((producto) => {
        const oferta = this.ofertas.find(
          (oferta) => oferta.producto_id === producto.id
        );
        if (oferta) {
          producto.oferta = oferta;
        }
      });
      this.filterProducts();
    },
    filterProducts() {
      if (!this.selectedCategoria && !this.selectedSubcategoria) {
        this.filteredProducts = this.productos;
      } else {
        this.filteredProducts = this.productos.filter((producto) => {
          const matchCategoria =
            !this.selectedCategoria ||
            this.filteredSubcategorias.some(
              (sub) =>
                sub.id === producto.subcategoria &&
                sub.categoria === this.selectedCategoria
            );
          const matchSubcategoria =
            !this.selectedSubcategoria ||
            producto.subcategoria === this.selectedSubcategoria;
          return matchCategoria && matchSubcategoria;
        });
      }
    },
    agregarAlCarro(producto) {
      const precioFinal = producto.oferta
        ? producto.oferta.precio_descuento
        : producto.precio;

      const imagenProducto = producto.url_imagen
        ? `http://localhost:3000${producto.url_imagen}`
        : "http://localhost:3000/uploads/productos/default.jpg";

      if (producto.cantidadSeleccionada <= producto.cantidad) {
        this.$store.commit("agregarProductoAlCarro", {
          ...producto,
          cantidad: producto.cantidadSeleccionada,
          precio: precioFinal,
        });

        Swal.fire({
          title: "¡Producto agregado al carro!",
          html: `
          <div>
            <p><strong>${
              producto.nombre
            }</strong> ha sido agregado al carro de compras.</p>
            <img src="${imagenProducto}" style="max-width: 200px; max-height: 200px;" alt="${
            producto.nombre
          }" />
            <p>Precio: ${this.precioChileno(precioFinal)}</p>
          </div>
        `,
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Ir al carro de compras",
          cancelButtonText: "Seguir comprando",
          reverseButtons: true,
          customClass: {
            cancelButton: "swal-button-cancel",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push("/carro");
          }
        });
      } else {
        Swal.fire({
          title: "Cantidad no válida",
          text: "La cantidad seleccionada es mayor que la cantidad disponible.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    },
    goToDetail(productId) {
      this.$router.push(`/detalle-producto/${productId}`);
    },
    mostrarModalCotizacion(producto) {
      this.cotizacion.producto_id = producto.id;
      const cotizacionModal = new Modal(
        document.getElementById("cotizacionModal")
      );
      cotizacionModal.show();
    },
    async enviarCotizacion() {
      const cotizacionData = {
        producto_id: this.cotizacion.producto_id,
        nombre: this.cotizacion.nombre,
        email: this.cotizacion.email,
        telefono: this.cotizacion.telefono,
        cantidad: this.cotizacion.cantidad,
        descripcion: this.cotizacion.descripcion,
      };

      // Mostrar el SweetAlert2 de cargando
      Swal.fire({
        title: "Procesando solicitud",
        text: "Por favor, espera...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const response = await axios.post(
          "http://localhost:3000/api/cotizacion",
          cotizacionData
        );

        Swal.fire({
          title: "Cotización enviada correctamente",
          text: "Hemos recibido tu mensaje. Te responderemos a la brevedad.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });

        // Limpiar el formulario de cotización
        this.cotizacion = {
          nombre: "",
          email: "",
          telefono: "",
          cantidad: 1,
          descripcion: "",
          producto_id: null,
        };

        // Cerrar el modal después de enviar
        const cotizacionModal = Modal.getInstance(
          document.getElementById("cotizacionModal")
        );
        cotizacionModal.hide();
      } catch (error) {
        Swal.fire({
          title: "Error al enviar cotización",
          text: error.message,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    },
  },
  mounted() {
    this.fetchCategorias();
    this.fetchProductos();
    this.fetchOfertas();
  },
};
</script>

<style scoped>
@import "../assets/styles/views/productos.css";

.personalizado-text {
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
}
</style>
