<template>
  <div class="container">
    <div class="filters-and-products">
      <div class="filters">
        <label for="categoria">Categoría:</label>
        <select
          id="categoria"
          v-model="selectedCategoria"
          @change="fetchSubcategoriasAndFilter"
        >
          <option value="" disabled selected>Seleccione una categoría</option>
          <option
            v-for="categoria in categorias"
            :key="categoria.id"
            :value="categoria.id"
          >
            {{ categoria.nombre }}
          </option>
          <option value="">Mostrar todos</option>
        </select>

        <label for="tipoProducto">Tipo de Producto:</label>
        <select
          id="tipoProducto"
          v-model="selectedSubcategoria"
          @change="filterProducts"
          :disabled="!filteredSubcategorias.length"
        >
          <option value="" disabled selected>
            Seleccione un tipo de producto
          </option>
          <option
            v-for="subcategoria in filteredSubcategorias"
            :key="subcategoria.id"
            :value="subcategoria.id"
          >
            {{ subcategoria.nombre }}
          </option>
          <option value="">Mostrar todos</option>
        </select>
      </div>

      <div class="products">
        <h2>Productos</h2>
        <ul>
          <li
            v-for="producto in filteredProducts"
            :key="producto.id"
            class="product-item"
            @click="goToDetail(producto.id)"
          >
            <div class="image-container">
              <img
                :src="
                  producto.url_imagen
                    ? 'http://localhost:3000' + producto.url_imagen
                    : 'http://localhost:3000/uploads/productos/defaul.jpg'
                "
                :alt="producto.nombre"
                class="product-image"
              />
            </div>
            <h3>{{ producto.nombre }}</h3>
            <p>{{ producto.descripcion }}</p>
            <div v-if="producto.oferta">
              <p class="price">
                <span class="original-price">${{ producto.precio }}</span>
                <span class="discounted-price">{{
                  precioChileno(producto.oferta.precio_descuento)
                }}</span>
              </p>
            </div>
            <div v-else>
              <p class="price">Precio: {{ precioChileno(producto.precio) }}</p>
            </div>
            <div class="product-count">
              <div class="qty-controls">
                <div
                  class="qtyminus"
                  @click.stop="decrementarCantidad(producto)"
                >
                  -
                </div>
                <input
                  type="text"
                  name="cantidad"
                  :value="producto.cantidadSeleccionada"
                  class="qty"
                  disabled
                />
                <div
                  class="qtyplus"
                  @click.stop="incrementarCantidad(producto)"
                >
                  +
                </div>
                <div class="cart-btn-container">
                  <button
                    class="round-black-btn cart-btn"
                    @click.stop="agregarAlCarro(producto)"
                  >
                    <i class="fas fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

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
      cart: [],
    };
  },
  computed: {
    precioChileno() {
      return (precio) => {
        return "$ " + precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
    },
  },
  methods: {
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
    goToDetail(productId) {
      this.$router.push(`/detalle-producto/${productId}`);
    },
    incrementarCantidad(producto) {
      if (producto.cantidadSeleccionada < producto.cantidad) {
        producto.cantidadSeleccionada++;
      } else {
        Swal.fire({
          title: "Cantidad máxima alcanzada",
          text: "Ya has alcanzado la cantidad máxima disponible.",
          icon: "info",
          confirmButtonText: "Aceptar",
        });
      }
    },
    decrementarCantidad(producto) {
      if (producto.cantidadSeleccionada > 1) {
        producto.cantidadSeleccionada--;
      }
    },
    agregarAlCarro(producto) {
      const precioFinal = producto.oferta
        ? producto.oferta.precio_descuento
        : producto.precio;

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
          <img src="${
            producto.url_imagen
              ? "http://localhost:3000" + producto.url_imagen
              : "http://localhost:3000/uploads/productos/defaul.jpg"
          }" style="max-width: 200px; max-height: 200px;" alt="${
            producto.nombre
          }" />
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
  },
  mounted() {
    this.fetchCategorias();
    this.fetchProductos();
    this.fetchOfertas();
  },
};
</script>

<style scoped>
@import "../assets/styles/views/producto.css";

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 80px;
}

.filters-and-products {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  flex-wrap: nowrap;
}

.filters {
  width: 250px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 60px;
}

.filters label {
  margin-bottom: 5px;
}

.filters select {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: #fff;
}

.products {
  flex-grow: 1;
}

.products h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
}

.product-item {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px;
  width: calc(33.333% - 20px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-item h3 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #007bff;
}

.product-item p {
  margin: 5px 0;
  color: #555;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.product-image {
  max-width: 150px;
  max-height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.price {
  font-size: 1.2em;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  margin-right: 10px;
}

.discounted-price {
  color: #e91e63;
  font-weight: bold;
}

.product-count {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cart-btn-container {
  display: flex;
  align-items: center;
}

.cart-btn {
  padding: 8px;
  font-size: 14px;
  margin-left: 50px;
}

.qty-controls {
  margin-right: 10px;
}

@media (max-width: 1024px) {
  .filters-and-products {
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  .filters {
    width: 100%;
    margin-bottom: 20px;
    padding: 15px;
  }

  .product-item {
    width: calc(50% - 10px);
  }
}

@media (max-width: 768px) {
  .filters {
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
  }

  .product-item {
    width: 100%;
  }
}
</style>
