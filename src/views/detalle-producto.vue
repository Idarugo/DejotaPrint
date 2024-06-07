<template>
  <div class="main-content">
    <div class="container mt-2">
      <h2 class="text-center">Detalle Producto</h2>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/productos">Productos</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ product.nombre }}
          </li>
        </ol>
      </nav>
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <div id="carousel" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img
                    v-if="product.imagenes && product.imagenes.length"
                    :src="product.imagenes[0].url_imagen"
                    :alt="product.nombre"
                    class="product-image img-fluid"
                  />
                  <img
                    v-else
                    src="http://localhost:3000/uploads/productos/default.jpg"
                    alt="Imagen predeterminada"
                    class="product-image img-fluid"
                  />
                </div>
                <template
                  v-if="product.imagenes && product.imagenes.length > 1"
                >
                  <div
                    v-for="(imagen, index) in product.imagenes.slice(1)"
                    :key="index"
                    class="carousel-item"
                  >
                    <img
                      :src="imagen.url_imagen"
                      :alt="product.nombre"
                      class="product-image img-fluid"
                    />
                  </div>
                </template>
              </div>
              <a
                class="carousel-control-prev"
                href="#carousel"
                role="button"
                data-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="carousel-control-next"
                href="#carousel"
                role="button"
                data-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
            <div class="clearfix mt-2">
              <div
                id="thumbcarousel"
                class="carousel slide"
                data-interval="false"
              >
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <div class="thumbs-wrapper">
                      <template
                        v-if="product.imagenes && product.imagenes.length"
                      >
                        <div
                          v-for="(imagen, index) in product.imagenes"
                          :key="index"
                          data-target="#carousel"
                          :data-slide-to="index"
                          class="thumb"
                        >
                          <img
                            :src="imagen.url_imagen"
                            class="thumbnail-image img-fluid"
                          />
                        </div>
                      </template>
                      <template v-else>
                        <img
                          src="http://localhost:3000/uploads/productos/default.jpg"
                          class="thumbnail-image img-fluid"
                        />
                      </template>
                    </div>
                  </div>
                </div>
                <a
                  class="carousel-control-prev"
                  href="#thumbcarousel"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a
                  class="carousel-control-next"
                  href="#thumbcarousel"
                  role="button"
                  data-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="product-name mt-3">{{ product.nombre }}</div>
            <div class="rate">
              <input
                type="radio"
                :id="'star5-' + product.id"
                name="rate"
                value="5"
                v-model="productRating"
                @change="updateProductRating"
              />
              <label :for="'star5-' + product.id"
                ><i
                  class="fas fa-star"
                  :class="{ filled: productRating >= 5 }"
                ></i
              ></label>
            </div>
            <span
              >{{ product.reviews ? product.reviews.length : 0 }} Reviews</span
            >
            <div class="product-price-discount">
              <template
                v-if="product.oferta && product.oferta.precio_descuento"
              >
                <span class="original-price">$ {{ product.precio }}</span>
                <span class="discounted-price"
                  >$ {{ product.oferta.precio_descuento }}</span
                >
              </template>
              <template v-else>
                <span>$ {{ product.precio }}</span>
              </template>
            </div>
            <p>{{ product.descripcion }}</p>
            <div class="product-count">
              <label for="cantidad">Cantidad</label>
              <div class="qty-controls">
                <div class="qtyminus" @click="decrementarCantidad">-</div>
                <input
                  type="text"
                  name="cantidad"
                  :value="cantidad"
                  class="qty"
                  disabled
                />
                <div class="qtyplus" @click="incrementarCantidad">+</div>
              </div>
              <button class="round-black-btn" @click="agregarAlCarro">
                Agregar al Carro
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container product-info-tabs">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            id="description-tab"
            data-toggle="tab"
            href="#descripcion"
            role="tab"
            aria-controls="descripcion"
            aria-selected="true"
            >Descripción</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="review-tab"
            data-toggle="tab"
            href="#review"
            role="tab"
            aria-controls="review"
            aria-selected="false"
            >Reseñas ({{
              product.reviews && product.reviews.length
                ? product.reviews.length
                : 0
            }})</a
          >
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="descripcion"
          role="tabpanel"
          aria-labelledby="description-tab"
        >
          {{ product.descripcion }}
        </div>
        <div
          class="tab-pane fade"
          id="review"
          role="tabpanel"
          aria-labelledby="review-tab"
        >
          <div class="review-heading">RESEÑAS</div>
          <template v-if="product.reviews && product.reviews.length > 0">
            <div class="reviews-container">
              <div
                v-for="(review, index) in product.reviews"
                :key="index"
                class="review"
              >
                <div class="review-header">
                  <div class="review-author">{{ review.nombre }}</div>
                  <div class="review-rating">
                    <div class="rate">
                      <input
                        type="radio"
                        :id="'star' + index + '5'"
                        value="5"
                        :checked="review.clasificacion === 5"
                      />
                      <label :for="'star' + index + '5'"></label>
                      <input
                        type="radio"
                        :id="'star' + index + '4'"
                        value="4"
                        :checked="review.clasificacion === 4"
                      />
                      <label :for="'star' + index + '4'"></label>
                      <input
                        type="radio"
                        :id="'star' + index + '3'"
                        value="3"
                        :checked="review.clasificacion === 3"
                      />
                      <label :for="'star' + index + '3'"></label>
                      <input
                        type="radio"
                        :id="'star' + index + '2'"
                        value="2"
                        :checked="review.clasificacion === 2"
                      />
                      <label :for="'star' + index + '2'"></label>
                      <input
                        type="radio"
                        :id="'star' + index + '1'"
                        value="1"
                        :checked="review.clasificacion === 1"
                      />
                      <label :for="'star' + index + '1'"></label>
                    </div>
                    <span class="review-rating-text"
                      >Clasificación: {{ review.clasificacion }}</span
                    >
                  </div>
                </div>
                <div class="review-message">{{ review.mensaje }}</div>
                <div class="review-date">Fecha: {{ review.fecha }}</div>
              </div>
            </div>
          </template>
          <template v-else>
            <p class="mb-20">Aún no hay reseñas.</p>
          </template>
          <form @submit.prevent="enviarOpinion">
            <div class="form-group">
              <div class="form-group" style="display: none">
                <label for="productoId">ID del Producto</label>
                <input
                  type="text"
                  id="productoId"
                  class="form-control"
                  disabled
                  v-model="producto_id"
                />
              </div>
              <label>Tu clasificación</label>
              <div class="reviews-counter">
                <div class="rate">
                  <input
                    type="radio"
                    id="star5"
                    name="rate"
                    value="5"
                    v-model="clasificacion"
                    @change="mostrarSeleccion"
                  />
                  <label for="star5"><i class="fas fa-star"></i></label>
                  <input
                    type="radio"
                    id="star4"
                    name="rate"
                    value="4"
                    v-model="clasificacion"
                    @change="mostrarSeleccion"
                  />
                  <label for="star4"><i class="fas fa-star"></i></label>
                  <input
                    type="radio"
                    id="star3"
                    name="rate"
                    value="3"
                    v-model="clasificacion"
                    @change="mostrarSeleccion"
                  />
                  <label for="star3"><i class="fas fa-star"></i></label>
                  <input
                    type="radio"
                    id="star2"
                    name="rate"
                    value="2"
                    v-model="clasificacion"
                    @change="mostrarSeleccion"
                  />
                  <label for="star2"><i class="fas fa-star"></i></label>
                  <input
                    type="radio"
                    id="star1"
                    name="rate"
                    value="1"
                    v-model="clasificacion"
                    @change="mostrarSeleccion"
                  />
                  <label for="star1"><i class="fas fa-star"></i></label>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>Tu mensaje</label>
              <textarea
                class="form-control"
                rows="10"
                v-model="mensaje"
              ></textarea>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <input
                    type="text"
                    name="nombre"
                    class="form-control"
                    placeholder="Nombre*"
                    v-model="nombre"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <input
                    type="text"
                    name="correo"
                    class="form-control"
                    placeholder="Correo*"
                    v-model="correo"
                  />
                </div>
              </div>
            </div>
            <button class="round-black-btn">Enviar opinión</button>
          </form>
        </div>
      </div>
    </div>
    <div class="container product-info-tabs">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active">También te puede interesar</a>
        </li>
      </ul>
      <div class="row mt-3">
        <template v-if="productosRelacionados.length > 0">
          <div
            v-for="producto in productosRelacionados"
            :key="producto.id"
            class="col-md-3"
          >
            <div class="card">
              <img
                :src="producto.url_imagen"
                :alt="producto.nombre"
                class="product-image"
              />
              <div class="card-body">
                <h5 class="card-title">{{ producto.nombre }}</h5>
                <p v-if="producto.oferta">
                  <span class="original-price">{{
                    precioChileno(producto.precio)
                  }}</span>
                  <span class="discounted-price">{{
                    precioChileno(producto.oferta.precio_descuento)
                  }}</span>
                </p>
                <p v-else>{{ precioChileno(producto.precio) }}</p>
                <button
                  @click="navigateToProduct(producto.id)"
                  class="round-black-btn"
                >
                  Ver Producto
                </button>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <p>No hay productos relacionados.</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      product: {
        id: 1,
        nombre: "",
        rating: 0,
        reviews: [],
        precio: 0,
        precio_descuento: 0,
        cantidad: null,
        imagenes: [],
        oferta: null,
        subcategoria: null, // Asegúrate de que subcategoria esté definida
      },
      cantidad: 1,
      producto_id: null,
      productRating: 0,
      clasificacion: null,
      mensaje: "",
      nombre: "",
      correo: "",
      fecha: "",
      productosRelacionados: [],
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
    async getLastProductosByCategoria(categoriaId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/productos/categoria/${categoriaId}/ultimos`
        );
        const productos = response.data;

        // Para cada producto, obtenemos la oferta
        const productosConOfertas = await Promise.all(
          productos.map(async (producto) => {
            try {
              const ofertaResponse = await axios.get(
                `http://localhost:3000/api/ofertas/producto/${producto.id}`
              );
              const oferta = ofertaResponse.data;
              return {
                ...producto,
                url_imagen: producto.url_imagen
                  ? `http://localhost:3000${producto.url_imagen}`
                  : "http://localhost:3000/uploads/productos/default.jpg",
                oferta: oferta ? oferta : null,
              };
            } catch (error) {
              console.error(
                `Error al obtener la oferta del producto ${producto.id}:`,
                error
              );
              return {
                ...producto,
                url_imagen: producto.url_imagen
                  ? `http://localhost:3000${producto.url_imagen}`
                  : "http://localhost:3000/uploads/productos/default.jpg",
                oferta: null,
              };
            }
          })
        );

        this.productosRelacionados = productosConOfertas;
      } catch (error) {
        console.error(
          "Error al obtener los últimos productos por categoría:",
          error
        );
        this.productosRelacionados = [];
      }
    },
    fetchProductDetails() {
      axios
        .get(`http://localhost:3000/api/productos/${this.producto_id}`)
        .then((response) => {
          this.product = response.data;
          this.getReseñas();

          axios
            .get(
              `http://localhost:3000/api/imagenesProducto/${this.producto_id}`
            )
            .then((response) => {
              const imagenesProducto = response.data.map((imagen) => ({
                ...imagen,
                url_imagen: imagen.url_imagen
                  ? `http://localhost:3000${imagen.url_imagen}`
                  : "http://localhost:3000/uploads/productos/default.jpg",
              }));
              this.product.imagenes = imagenesProducto;

              axios
                .get(
                  `http://localhost:3000/api/ofertas/producto/${this.producto_id}`
                )
                .then((response) => {
                  if (response.data) {
                    this.product.oferta = response.data;
                  } else {
                    this.product.oferta = null;
                  }

                  if (this.product.subcategoria) {
                    console.log(
                      "Subcategoría del producto:",
                      this.product.subcategoria
                    );
                    axios
                      .get(
                        `http://localhost:3000/api/subcategorias/${this.product.subcategoria}`
                      )
                      .then((subcategoriaResponse) => {
                        const categoriaId = subcategoriaResponse.data.categoria;
                        console.log(
                          "Categoría ID de la subcategoría:",
                          categoriaId
                        );
                        this.getLastProductosByCategoria(categoriaId);
                      })
                      .catch((error) => {
                        console.error(
                          "Error al obtener la categoría de la subcategoría:",
                          error
                        );
                      });
                  } else {
                    console.error("Subcategoría no definida para el producto.");
                  }
                })
                .catch((error) => {
                  console.error(
                    "Error al obtener la oferta del producto:",
                    error
                  );
                });
            })
            .catch((error) => {
              console.error(
                "Error al obtener las imágenes del producto:",
                error
              );
              this.product.imagenes = [];
            });
        })
        .catch((error) => {
          console.error("Error al obtener el detalle del producto:", error);
        });
    },
    incrementarCantidad() {
      if (this.cantidad < this.product.cantidad) {
        this.cantidad++;
      } else {
        Swal.fire({
          title: "Cantidad máxima alcanzada",
          text: "Ya has alcanzado la cantidad máxima disponible.",
          icon: "info",
          confirmButtonText: "Aceptar",
        });
      }
    },
    decrementarCantidad() {
      if (this.cantidad > 1) {
        this.cantidad--;
      }
    },
    enviarOpinion() {
      if (
        this.producto_id &&
        this.clasificacion &&
        this.mensaje &&
        this.nombre &&
        this.correo
      ) {
        const ahora = new Date();
        const dia = ahora.getDate().toString().padStart(2, "0");
        const mes = (ahora.getMonth() + 1).toString().padStart(2, "0");
        const año = ahora.getFullYear();
        const fecha = `${año}-${mes}-${dia}`;

        const formData = {
          producto_id: this.producto_id,
          clasificacion: this.clasificacion,
          mensaje: this.mensaje,
          nombre: this.nombre,
          correo: this.correo,
          fecha: fecha,
        };

        axios
          .post("http://localhost:3000/api/resenas", formData)
          .then((response) => {
            Swal.fire({
              title: "Opinión enviada correctamente",
              text: response.data.message,
              icon: "success",
              confirmButtonText: "Aceptar",
            });

            this.producto_id = null;
            this.clasificacion = null;
            this.mensaje = "";
            this.nombre = "";
            this.correo = "";

            this.getReseñas();
          })
          .catch((error) => {
            Swal.fire({
              title: "Error al enviar opinión",
              text: error.message,
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          });
      } else {
        Swal.fire({
          title: "Por favor completa todos los campos",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    },
    getReseñas() {
      axios
        .get(`http://localhost:3000/api/resenas/${this.producto_id}`)
        .then((response) => {
          this.product.reviews = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener las reseñas:", error);
        });
    },
    agregarAlCarro() {
      const precioFinal = this.product.oferta
        ? this.product.oferta.precio_descuento
        : this.product.precio;

      const imagenProducto = this.product.imagenes.length
        ? this.product.imagenes[0].url_imagen
        : "http://localhost:3000/uploads/productos/default.jpg";

      if (this.cantidad <= this.product.cantidad) {
        this.product.cantidad = this.cantidad;

        this.$emit("productoAgregado", { ...this.product });

        this.$store.commit("agregarProductoAlCarro", {
          ...this.product,
          precio: precioFinal,
        });

        Swal.fire({
          title: "¡Producto agregado al carro!",
          html: `
          <div>
            <p><strong>${
              this.product.nombre
            }</strong> ha sido agregado al carro de compras.</p>
            <img src="${imagenProducto}" style="max-width: 200px; max-height: 200px;" alt="${
            this.product.nombre
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
    navigateToProduct(productoId) {
      this.$router
        .push({ path: `/detalle-producto/${productoId}` })
        .then(() => {
          this.producto_id = productoId;
          this.fetchProductDetails();
        });
    },
  },
  mounted() {
    this.producto_id = this.$route.params.id;
    this.fetchProductDetails();

    const reviewTab = document.getElementById("review-tab");

    reviewTab.addEventListener("click", function (event) {
      event.preventDefault();
      const reviewPanel = document.getElementById("review");
      reviewTab.classList.add("active");
      reviewPanel.classList.add("show", "active");

      const descriptionTab = document.getElementById("description-tab");
      const descriptionPanel = document.getElementById("descripcion");
      descriptionTab.classList.remove("active");
      descriptionPanel.classList.remove("show", "active");
    });

    const descriptionTab = document.getElementById("description-tab");

    descriptionTab.addEventListener("click", function (event) {
      event.preventDefault();
      const descriptionPanel = document.getElementById("descripcion");
      descriptionTab.classList.add("active");
      descriptionPanel.classList.add("show", "active");

      const reviewTab = document.getElementById("review-tab");
      const reviewPanel = document.getElementById("review");
      reviewTab.classList.remove("active");
      reviewPanel.classList.remove("show", "active");
    });
  },
};
</script>

<style scoped>
@import "../assets/styles/views/detalle-producto.css";
.product-image {
  display: block;
  max-width: 100%;
  max-height: 500px;
  margin: 0 auto;
  object-fit: cover;
}

.thumbnail-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin: 5px;
  cursor: pointer;
}

.thumbs-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-control-prev,
.carousel-control-next {
  width: 5%;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-size: 100%, 100%;
  background-color: black;
}

.round-black-btn {
  background-color: black;
  color: white;
  border-radius: 25px;
  padding: 10px 20px;
  border: none;
}

.qty-controls {
  display: flex;
  align-items: center;
}

.qtyminus,
.qtyplus {
  background-color: black;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
}

.qty {
  width: 50px;
  text-align: center;
  margin: 0 10px;
}

.original-price {
  text-decoration: line-through;
  color: red;
}

.discounted-price {
  color: green;
  font-weight: bold;
}

.original-price {
  text-decoration: line-through;
  color: red;
}

.discounted-price {
  color: green;
  font-weight: bold;
}
</style>
