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
          @change="filterOffers"
        >
          <option value="" disabled selected>
            Seleccione un tipo de producto
          </option>
          <option
            v-for="subcategoria in subcategorias"
            :key="subcategoria.id"
            :value="subcategoria.id"
          >
            {{ subcategoria.nombre }}
          </option>
          <option value="">Mostrar todos</option>
        </select>
      </div>

      <div class="products">
        <h2>Ofertas</h2>
        <ul>
          <li
            v-for="oferta in filteredOffers"
            :key="oferta.id"
            class="product-item"
            @click="goToDetail(oferta.producto_id)"
          >
            <h3>{{ oferta.producto.nombre }}</h3>
            <p>{{ oferta.producto.descripcion }}</p>
            <p class="price">
              <span class="original-price">${{ oferta.producto.precio }}</span>
              <span class="discounted-price">{{
                precioChileno(oferta.precio_descuento)
              }}</span>
            </p>
            <p>Cantidad: {{ oferta.producto.cantidad }}</p>
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
      filteredOffers: [],
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
            this.subcategorias = data;
            this.selectedSubcategoria = null;
            this.filterOffers();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.message,
            });
          });
      } else {
        this.subcategorias = [];
        this.selectedSubcategoria = null;
        this.filterOffers();
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
          this.productos = data;
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
      fetch("http://localhost:3000/api/ofertas/especiales")
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
      this.ofertas.forEach((oferta) => {
        const producto = this.productos.find(
          (producto) => producto.id === oferta.producto_id
        );
        if (producto) {
          oferta.producto = producto;
        }
      });
      this.filterOffers();
    },
    filterOffers() {
      if (!this.selectedCategoria && !this.selectedSubcategoria) {
        // Si no se ha seleccionado ninguna categoría ni subcategoría, mostrar todas las ofertas
        this.filteredOffers = this.ofertas;
      } else {
        // Filtrar ofertas según la categoría y subcategoría seleccionadas
        this.filteredOffers = this.ofertas.filter((oferta) => {
          return (
            (!this.selectedSubcategoria ||
              oferta.producto.subcategoria === this.selectedSubcategoria) &&
            (!this.selectedCategoria ||
              this.subcategorias.some(
                (sub) =>
                  sub.id === oferta.producto.subcategoria &&
                  sub.categoria === this.selectedCategoria
              ))
          );
        });
      }
    },
    goToDetail(productId) {
      this.$router.push(`/detalle-producto/${productId}`);
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
body {
  margin: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.filters-and-products {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  flex-wrap: nowrap; /* Ensure that the filters and products stay side by side on larger screens */
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

/* Responsive Styles */
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
    width: calc(50% - 10px); /* Two items per row */
  }
}

@media (max-width: 768px) {
  .filters {
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
  }

  .product-item {
    width: 100%; /* One item per row */
  }
}
</style>
  