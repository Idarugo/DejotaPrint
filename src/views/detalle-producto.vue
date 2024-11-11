<template>
  <div class="main-content">
    <div class="container">
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
            <div class="main-image-container">
              <img
                v-if="product.imagenes && product.imagenes.length > 0"
                :src="product.imagenes[activeImageIndex].url_imagen"
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
            <div class="clearfix mt-2">
              <div class="thumbs-wrapper">
                <div
                  v-for="(imagen, index) in product.imagenes || []"
                  :key="index"
                  class="thumb"
                  @click="setActiveImage(index)"
                >
                  <img
                    :src="imagen.url_imagen"
                    class="thumbnail-image img-fluid"
                    :class="{ 'thumb-active': index === activeImageIndex }"
                  />
                </div>
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
              <label :for="'star5-' + product.id">
                <i
                  class="fas fa-star"
                  :class="{ filled: productRating >= 5 }"
                ></i>
              </label>
            </div>
            <span
              >{{ product.reviews ? product.reviews.length : 0 }} Reviews</span
            >
            <div
              v-if="product.es_personalizado === 0"
              class="product-price-discount"
            >
              <template
                v-if="product.oferta && product.oferta.precio_descuento"
              >
                <span class="original-price">{{
                  precioChileno(product.precio)
                }}</span>
                <span class="px-2 discounted-price">
                  {{ precioChileno(product.oferta.precio_descuento) }}
                </span>
              </template>
              <template v-else>
                <span>{{ precioChileno(product.precio) }}</span>
              </template>
            </div>
            <p>{{ truncatedDescripcion }}</p>

            <!-- Mostrar si el producto NO es personalizado -->
            <div v-if="product.es_personalizado === 0" class="product-count">
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

            <!-- Mostrar si el producto es personalizado -->
            <div v-else>
              <button class="round-black-btn" @click="mostrarModalCotizacion">
                Solicitar un Presupuesto
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
            <div class="form-group">
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
                  <span class="px-2 discounted-price">{{
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
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { Modal } from "bootstrap"; // Importa Modal desde Bootstrap

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
        subcategoria: null,
        es_personalizado: 0,
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
      activeImageIndex: 0,
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
    precioChileno() {
      return (precio) => {
        return "$" + precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
    },
    truncatedDescripcion() {
      if (this.product.descripcion && this.product.descripcion.length > 10) {
        return this.product.descripcion.substring(0, 14) + "...";
      }
      return this.product.descripcion;
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

        // Eliminar duplicados basados en producto.id
        const productosSinDuplicados = [];
        const idsUnicos = new Set();

        productosConOfertas.forEach((producto) => {
          if (!idsUnicos.has(producto.id)) {
            idsUnicos.add(producto.id);
            productosSinDuplicados.push(producto);
          }
        });

        this.productosRelacionados = productosSinDuplicados;
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
          if (response.data && response.data.id) {
            this.product = response.data;
            this.cotizacion.producto_id = this.product.id;
            console.log("Producto obtenido:", this.product); // Depuración
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
                          const categoriaId =
                            subcategoriaResponse.data.categoria;
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
                      console.error(
                        "Subcategoría no definida para el producto."
                      );
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
          } else {
            // Producto no encontrado, redirigir a la página de error 404
            this.$router.push({ name: "error-404" });
          }
        })
        .catch((error) => {
          console.error("Error al obtener el detalle del producto:", error);
          // En caso de error, redirigir a la página de error 404
          this.$router.push({ name: "error-404" });
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
      // Validación para campos vacíos
      if (!this.clasificacion) {
        Swal.fire({
          title: "Error",
          text: "Por favor selecciona una clasificación.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }
      if (!this.mensaje.trim()) {
        Swal.fire({
          title: "Error",
          text: "Por favor escribe un mensaje.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }
      if (!this.nombre.trim()) {
        Swal.fire({
          title: "Error",
          text: "Por favor escribe tu nombre.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }
      if (!this.correo.trim() || !this.validateEmail(this.correo)) {
        Swal.fire({
          title: "Error",
          text: "Por favor escribe un correo válido.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }

      const ahora = new Date();
      const dia = ahora.getDate().toString().padStart(2, "0");
      const mes = (ahora.getMonth() + 1).toString().padStart(2, "0");
      const año = ahora.getFullYear();
      const fecha = `${año}-${mes}-${dia}`;

      const formData = {
        producto_id: this.producto_id,
        clasificacion: this.clasificacion,
        mensaje: this.mensaje.trim(),
        nombre: this.nombre.trim(),
        correo: this.correo.trim(),
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
    },
    enviarCotizacion() {
      // Validación para campos vacíos en Solicitar Presupuesto
      if (
        !this.cotizacion.nombre.trim() ||
        !this.cotizacion.email.trim() ||
        !this.cotizacion.telefono.trim() ||
        !this.cotizacion.cantidad ||
        !this.cotizacion.descripcion.trim()
      ) {
        Swal.fire({
          title: "Error",
          text: "Por favor completa todos los campos.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }
      if (!this.validateEmail(this.cotizacion.email)) {
        Swal.fire({
          title: "Error",
          text: "Por favor escribe un correo válido.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }

      const cotizacionData = {
        producto_id: this.product.id,
        nombre: this.cotizacion.nombre.trim(),
        email: this.cotizacion.email.trim(),
        telefono: this.cotizacion.telefono.trim(),
        cantidad: this.cotizacion.cantidad,
        descripcion: this.cotizacion.descripcion.trim(),
      };

      console.log("Enviando datos de cotización:", cotizacionData); // Depuración

      // Mostrar el SweetAlert2 de cargando
      Swal.fire({
        title: "Procesando solicitud",
        text: "Por favor, espera...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      axios
        .post("http://localhost:3000/api/cotizacion", cotizacionData)
        .then((response) => {
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
        })
        .catch((error) => {
          console.log("Error al enviar cotización:", error.response.data); // Depuración
          Swal.fire({
            title: "Error al enviar cotización",
            text: error.message,
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        });
    },
    validateEmail(email) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.[^<>()[\]\\.,;:\s@"]{2,}))$/i;
      return re.test(email);
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
    setActiveImage(index) {
      this.activeImageIndex = index;
    },
    mostrarModalCotizacion() {
      console.log("Producto ID antes de abrir el modal:", this.product.id); // Depuración
      const cotizacionModal = new Modal(
        document.getElementById("cotizacionModal")
      );
      cotizacionModal.show();
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

.container {
  margin-top: 60px;
}

.main-image-container {
  width: 100%;
  max-width: 500px; /* Establece un ancho máximo para el contenedor principal de la imagen */
  max-height: 500px; /* Establece una altura máxima para el contenedor principal de la imagen */
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ajusta la imagen para cubrir el contenedor sin distorsionarse */
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
  cursor: pointer;
}

.qty {
  width: 50px;
  text-align: center;
  margin: 0 10px;
}

.original-price {
  color: #6c757d;
  text-decoration: line-through;
}

.discounted-price {
  color: #212529;
  font-weight: bold;
}

.thumb-active {
  border: 2px solid black;
}

.btn-presupuesto {
  background-color: #333;
  color: white;
}

.btn-presupuesto:hover {
  background-color: #555;
  color: white;
}
</style>