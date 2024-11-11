<template>
  <main class="container">
    <!-- Nueva Sección -->
    <section class="nueva-seccion">
      <div class="contenido">
        <div class="texto">
          <h2>Lanyards, llaveros y porta credenciales personalizados</h2>
          <p>
            Personaliza tus accesorios con tu logo, diseño o mensaje. Entrega
            rápida y calidad garantizada.
          </p>
          <button @click="mostrarModalCotizacion">Solicitar Presupuesto</button>
        </div>
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators" v-if="carruselItems.length">
            <button
              v-for="(item, index) in carruselItems"
              :key="index"
              type="button"
              :data-bs-target="'#carouselExampleIndicators'"
              :data-bs-slide-to="index"
              :class="{ active: index === 0 }"
              aria-current="index === 0 ? 'true' : undefined"
              :aria-label="'Slide ' + (index + 1)"
            ></button>
          </div>
          <div class="carousel-inner" v-if="carruselItems.length">
            <div
              v-for="(item, index) in carruselItems"
              :key="index"
              :class="['carousel-item', { active: index === 0 }]"
            >
              <img
                :src="`http://localhost:3000${item.imagen_url}`"
                class="d-block w-100"
                :alt="item.titulo"
              />
            </div>
          </div>
          <div v-else class="no-datos">
            <p>No hay carrusel en este momento.</p>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Sección de Diseños -->
    <section class="disenos">
      <h2>Nuestros Diseños</h2>
      <div
        id="disenosCarousel"
        class="carousel carousel-productos slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div
            v-for="(designGroup, index) in groupedDisenos"
            :key="index"
            :class="['carousel-item', { active: index === 0 }]"
          >
            <div class="row">
              <div
                v-for="design in designGroup"
                :key="design.id"
                class="design-card col-12 col-md-3"
              >
                <div class="image-placeholder" @click="verDetalles(design)">
                  <img
                    :src="
                      design.imagen
                        ? 'http://localhost:3000' + design.imagen
                        : 'http://localhost:3000/uploads/disenos/default.jpg'
                    "
                    :alt="design.nombre"
                    class="design-image d-block w-100"
                  />
                </div>
                <h4 class="text-center mt-2">{{ design.nombre }}</h4>
                <button @click="verDetalles(design)" class="btn btn-detalle">
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
          <div v-if="disenos.length === 0" class="no-datos">
            <p>No hay diseños disponibles en este momento.</p>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#disenosCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#disenosCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </section>

    <!-- Modal de Detalles -->
    <div
      class="modal fade"
      id="detallesModal"
      tabindex="-1"
      aria-labelledby="detallesModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="detallesModalLabel">
              {{ diseñoSeleccionado.nombre }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>{{ diseñoSeleccionado.descripcion }}</p>
            <img
              :src="
                diseñoSeleccionado.imagen
                  ? `http://localhost:3000${diseñoSeleccionado.imagen}`
                  : 'http://localhost:3000/uploads/productos/default.jpg'
              "
              :alt="diseñoSeleccionado.nombre"
              class="img-fluid"
            />
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

    <!-- Sección de Servicios -->
    <section class="servicios">
      <h2>Nuestros servicios</h2>
      <div class="servicios-container">
        <template v-if="servicios.length">
          <div
            class="servicio"
            v-for="servicio in servicios"
            :key="servicio.titulo"
          >
            <div class="icono">
              <i :class="servicio.icono"></i>
            </div>
            <h3>{{ servicio.titulo }}</h3>
            <p>{{ servicio.descripcion }}</p>
          </div>
        </template>
        <div v-else class="no-datos">
          <p>No hay servicios disponibles en este momento.</p>
        </div>
      </div>
    </section>

    <!-- Sección Sobre Nosotros -->
    <section class="sobre-nosotros">
      <div class="contenido">
        <div class="texto">
          <h2>Sobre nosotros</h2>
          <p>
            Somos una empresa dedicada a la creación de tarjetas de presentación
            y artículos personalizados de alta calidad. Nuestro objetivo es
            ayudarte a crear una imagen profesional y memorable para tu negocio.
          </p>
          <p>
            Contamos con un equipo de diseñadores y expertos en impresión que se
            encargan de cada detalle de tus productos, desde el diseño hasta la
            entrega final. Trabajamos con los mejores materiales y tecnologías
            para asegurarnos de que tus tarjetas y artículos sean de la más alta
            calidad.
          </p>
          <p>
            Nuestro compromiso es brindar un servicio excepcional a cada uno de
            nuestros clientes. Nos esforzamos por entender tus necesidades y
            crear soluciones a la medida de tu negocio.
          </p>
        </div>
        <div class="imagen-placeholder">
          <img
            src="./assets/img/sobre-nosotro.jpg"
            alt="Sobre nosotros imagen"
          />
        </div>
      </div>
    </section>

    <!-- Sección de Productos -->
    <section class="productos">
      <h2>Nuestros Productos</h2>
      <p>Explora nuestra selección de tarjetas y llaveros personalizados.</p>
      <div
        id="productosCarousel"
        class="carousel carousel-productos slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div
            v-for="(product, index) in groupedProductos"
            :key="index"
            :class="['carousel-item', { active: index === 0 }]"
          >
            <div class="row">
              <div
                v-for="producto in product"
                :key="producto.id"
                class="product-card col-12 col-md-3"
              >
                <div class="image-placeholder" @click="goToDetail(producto.id)">
                  <img
                    :src="
                      producto.url_imagen
                        ? 'http://localhost:3000' + producto.url_imagen
                        : 'http://localhost:3000/uploads/productos/default.jpg'
                    "
                    :alt="producto.nombre"
                    class="product-image d-block w-100"
                  />
                </div>
                <h4 class="text-center mt-2">
                  {{ truncatedText(producto.nombre, 18) }}
                </h4>
                <p>{{ truncatedText(producto.descripcion, 25) }}</p>
                <p v-if="!producto.es_personalizado">
                  {{ precioChileno(producto.precio) }}
                </p>
                <button
                  v-if="!producto.es_personalizado"
                  @click="agregarAlCarro(producto)"
                  class="btn btn-agregar"
                >
                  Agregar al carrito
                </button>
                <button
                  v-else
                  @click="mostrarModalCotizacion(producto)"
                  class="btn btn-agregar"
                >
                  Solicitar Presupuesto
                </button>
              </div>
            </div>
          </div>
          <div v-if="sortedAndFilteredProducts.length === 0" class="no-datos">
            <p>No hay productos disponibles en este momento.</p>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#productosCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#productosCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </section>

    <!-- Modal de Cotización -->
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

    <!-- Sección de Ofertas Especiales -->
    <section class="ofertas">
      <h2>Ofertas Especiales</h2>
      <p>
        Explora nuestra selección de lanyards, llaveros y porta credenciales
        personalizados.
      </p>
      <div
        id="ofertasCarousel"
        class="carousel carousel-productos slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div
            v-for="(offerGroup, index) in groupedOfertas"
            :key="index"
            :class="['carousel-item', { active: index === 0 }]"
          >
            <div class="row">
              <div
                v-for="oferta in offerGroup"
                :key="oferta.id"
                class="product-card col-12 col-md-3"
              >
                <div
                  class="image-placeholder"
                  @click="goToDetail(oferta.producto_id)"
                >
                  <img
                    :src="
                      oferta.url_imagen
                        ? 'http://localhost:3000' + oferta.url_imagen
                        : 'http://localhost:3000/uploads/productos/default.jpg'
                    "
                    :alt="oferta.nombre_producto"
                    class="product-image d-block w-100"
                  />
                </div>
                <h4 class="text-center mt-2">
                  {{ truncatedText(oferta.nombre_producto, 18) }}
                </h4>
                <p>{{ truncatedText(oferta.descripcion_producto, 25) }}</p>
                <p v-if="!oferta.es_personalizado">
                  <span class="original-price">{{
                    precioChileno(oferta.precio_producto)
                  }}</span>
                  <span class="px-2 discounted-price">{{
                    precioChileno(oferta.precio_descuento)
                  }}</span>
                </p>
                <button
                  v-if="!oferta.es_personalizado"
                  @click="agregarAlCarro(oferta)"
                  class="btn btn-agregar"
                >
                  Agregar al carrito
                </button>
                <button
                  v-else
                  @click="mostrarModalCotizacion(oferta)"
                  class="btn btn-agregar"
                >
                  Solicitar Presupuesto
                </button>
              </div>
            </div>
          </div>

          <div v-if="ofertas.length === 0" class="no-datos">
            <p>No hay ofertas disponibles en este momento.</p>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#ofertasCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#ofertasCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </section>

    <!-- Horario de Atención -->
    <section class="horario text-center my-5" v-if="horarios.length">
      <h2 class="mb-4">Horario de Atención</h2>
      <ul class="horarios-lista">
        <li v-for="horario in horarios" :key="horario.id">
          <span class="dia">{{ horario.dia }}:</span>
          <span class="hora">{{ horario.horario }}</span>
        </li>
      </ul>
    </section>

    <!-- Testimonios -->
    <section class="testimonios">
      <h2>Lo que dicen nuestros clientes</h2>
      <p>Escucha las experiencias de nuestros clientes satisfechos.</p>
      <div class="testimonios-carousel-container d-flex justify-content-center">
        <div
          id="testimoniosCarousel"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div v-if="testimoniosAprobados.length">
              <div
                v-for="(testimonio, index) in testimoniosAprobados"
                :key="index"
                :class="['carousel-item', { active: index === 0 }]"
              >
                <div class="testimonio text-center">
                  <p>{{ testimonio.mensaje }}</p>
                  <div
                    class="cliente-info d-flex justify-content-center align-items-center"
                  >
                    <img
                      :src="
                        testimonio.imagen_url.startsWith('http')
                          ? testimonio.imagen_url
                          : 'http://localhost:3000' + testimonio.imagen_url
                      "
                      :alt="testimonio.nombre"
                      class="cliente-foto"
                      @error="handleImageError($event)"
                    />
                    <div class="cliente-detalles text-left">
                      <strong>{{ testimonio.nombre }}</strong>
                      <span
                        >{{ testimonio.titulo }}, {{ testimonio.empresa }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="no-datos">
              <p>No hay testimonios disponibles en este momento.</p>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#testimoniosCarousel"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#testimoniosCarousel"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Ubicación -->
    <section class="ubicacion text-center my-5">
      <h2 class="mb-4">Ubicación</h2>
      <p>34°03'24.8"S 70°43'46.6"W</p>
      <div id="mapa" class="w-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d1919.7257232181692!2d-70.7295010471347!3d-34.0567602597495!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzTCsDAzJzI0LjgiUyA3MMKwNDMnNDYuNiJX!5e0!3m2!1ses!2scl!4v1716490683333!5m2!1ses!2scl"
          width="100%"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>

    <!-- Instagram -->
    <section class="instagram text-center my-5">
      <h2 class="mb-4">Síguenos en Instagram</h2>
      <div
        class="elfsight-app-719a605b-01d9-45ca-abb4-c1325d75d703"
        data-elfsight-app-lazy
      ></div>
    </section>

    <!-- Sección de Clientes -->
    <section class="clientes">
      <h2>Nuestros Clientes</h2>
      <div class="clientes-container">
        <template v-if="marcasActivas.length">
          <div
            class="cliente"
            v-for="(marca, index) in marcasActivas"
            :class="{ active: index === 0 }"
            :key="index"
          >
            <div class="imagen-placeholder">
              <img :src="`http://localhost:3000${marca.imagen}`" />
            </div>
          </div>
        </template>
        <div v-else class="no-datos">
          <p>No hay clientes disponibles en este momento.</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Carousel from "@chenfengyuan/vue-carousel";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";

export default {
  components: {
    Carousel,
  },
  data() {
    return {
      marcasActivas: [],
      testimoniosAprobados: [],
      carruselItems: [],
      disenos: [],
      productos: [],
      ofertas: [],
      horarios: [],
      servicios: [
        {
          titulo: "Impresión de tarjetas",
          descripcion:
            "Imprimimos tus tarjetas de presentación en alta calidad.",
          icono: "fas fa-print",
        },
        {
          titulo: "Corte y acabado",
          descripcion:
            "Cortamos y acabamos tus tarjetas de presentación con precisión.",
          icono: "fas fa-cut",
        },
        {
          titulo: "Diseño personalizado",
          descripcion:
            "Diseñamos tarjetas de presentación y artículos personalizados a tu medida.",
          icono: "fas fa-pen",
        },
      ],
      selectedCategoria: null,
      selectedSubcategoria: null,
      filteredProducts: [],
      filteredSubcategorias: [],
      sortBy: "featured",
      cotizacion: {
        nombre: "",
        email: "",
        telefono: "",
        cantidad: 1,
        descripcion: "",
        producto_id: null,
      },
      diseñoSeleccionado: {},
    };
  },
  computed: {
    precioChileno() {
      return (precio) => {
        if (precio !== undefined && precio !== null) {
          return "$" + precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
        return "$0";
      };
    },
    groupedProductos() {
      const groups = [];
      for (let i = 0; i < this.productos.length; i += 4) {
        groups.push(this.productos.slice(i, i + 4));
      }
      return groups;
    },
    groupedDisenos() {
      const groups = [];
      for (let i = 0; i < this.disenos.length; i += 4) {
        groups.push(this.disenos.slice(i, i + 4));
      }
      return groups;
    },
    groupedOfertas() {
      const groups = [];
      for (let i = 0; i < this.ofertas.length; i += 4) {
        groups.push(this.ofertas.slice(i, i + 4));
      }
      return groups;
    },
    sortedAndFilteredProducts() {
      let filteredProducts = this.filteredProducts;

      if (this.sortBy === "lowToHigh") {
        filteredProducts.sort((a, b) => a.precio - b.precio);
      } else if (this.sortBy === "highToLow") {
        filteredProducts.sort((a, b) => b.precio - a.precio);
      }

      return filteredProducts;
    },
  },
  methods: {
    handleImageError(event) {
      event.target.src =
        "http://localhost:3000/uploads/testimonios/default.jpg";
    },
    async fetchHorarios() {
      try {
        const response = await axios.get("http://localhost:3000/api/horarios");
        this.horarios = response.data;
      } catch (error) {
        console.error("Error al obtener los horarios:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron obtener los horarios de atención.",
        });
      }
    },
    async fetchTestimoniosAprobados() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/testimonios/aprobados"
        );
        this.testimoniosAprobados = response.data.map((testimonio) => ({
          ...testimonio,
          imagen_url:
            testimonio.imagen_url || "/uploads/testimonios/default.jpg",
        }));
      } catch (error) {
        console.error("Error al obtener los testimonios aprobados:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron obtener los testimonios aprobados.",
        });
      }
    },
    truncatedText(text, length) {
      if (text.length > length) {
        return text.slice(0, length) + "...";
      }
      return text;
    },
    async fetchCarruselItems() {
      try {
        const response = await axios.get("http://localhost:3000/api/carrusel");
        this.carruselItems = response.data;
      } catch (error) {
        console.error("Error al obtener los elementos del carrusel:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron obtener los elementos del carrusel.",
        });
      }
    },
    async fetchMarcasActivas() {
      try {
        const response = await axios.get("/api/marcas/activas");
        this.marcasActivas = response.data;
      } catch (error) {
        console.error("Error al obtener las marcas activas:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron obtener las marcas activas.",
        });
      }
    },
    async fetchDisenos() {
      try {
        const response = await axios.get("http://localhost:3000/api/disenos");
        this.disenos = response.data.map((diseno) => ({
          ...diseno,
          imagen: diseno.imagen || "/uploads/disenos/default.jpg",
        }));
      } catch (error) {
        console.error("Error al obtener los diseños:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron obtener los diseños.",
        });
      }
    },
    async fetchProductos() {
      try {
        const response = await axios.get("http://localhost:3000/api/productos");
        this.productos = response.data.map((producto) => ({
          ...producto,
          cantidadSeleccionada: 1, // Inicializar cantidadSeleccionada
          imagen: producto.url_imagen || "/uploads/productos/default.jpg",
          oferta:
            this.ofertas.find((oferta) => oferta.producto_id === producto.id) ||
            null, // Asignar oferta
        }));
        this.filteredProducts = this.productos;
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron obtener los productos.",
        });
      }
    },
    async fetchOfertas() {
      try {
        const response = await axios.get("/api/ofertas/especiales");
        const ofertasData = response.data;

        // Agrupar ofertas por producto_id
        const ofertasMap = new Map();
        ofertasData.forEach((oferta) => {
          if (!ofertasMap.has(oferta.producto_id)) {
            ofertasMap.set(oferta.producto_id, {
              ...oferta,
              cantidadSeleccionada: 1, // Inicializar cantidadSeleccionada
              cantidad: oferta.cantidad || 10, // Ajusta esta cantidad según tu lógica de inventario
              nombre: oferta.nombre_producto, // Asegúrate de que el nombre del producto esté presente
              precio: oferta.precio_producto, // Asegúrate de que el precio del producto esté presente
              url_imagen: oferta.imagen, // Asegúrate de que la URL de la imagen esté presente
              es_personalizado: oferta.es_personalizado, // Incluir es_personalizado
            });
          }
        });

        // Convertir el mapa de ofertas a una lista
        this.ofertas = Array.from(ofertasMap.values());
      } catch (error) {
        console.error("Error al obtener las ofertas:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron obtener las ofertas.",
        });
      }
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
    agregarAlCarro(item) {
      // Asumimos que `item` es un objeto de oferta cuando tiene la propiedad `precio_descuento`
      const producto = item.precio_descuento
        ? {
            id: item.producto_id,
            nombre: item.nombre_producto,
            descripcion: item.descripcion_producto,
            precio: item.precio_producto,
            precio_descuento: item.precio_descuento,
            url_imagen: item.url_imagen || item.imagen,
            es_personalizado: item.es_personalizado,
            cantidadSeleccionada: item.cantidadSeleccionada || 1,
          }
        : item;

      if (!producto || !producto.nombre || !producto.precio) {
        Swal.fire({
          title: "Producto no válido",
          text: "El producto no tiene todos los datos necesarios.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }

      const precioFinal = producto.precio_descuento || producto.precio;

      const imagenProducto = producto.url_imagen
        ? `http://localhost:3000${producto.url_imagen}`
        : "http://localhost:3000/uploads/productos/default.jpg";

      if (producto.cantidadSeleccionada <= (producto.cantidad || 10)) {
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
    verDetalles(diseno) {
      this.diseñoSeleccionado = diseno;
      const detallesModal = new Modal(document.getElementById("detallesModal"));
      detallesModal.show();
    },
    personalizarProducto() {
      // Aquí puedes definir lo que debe hacer esta función
      // Por ejemplo, redirigir a una página de personalización
      this.$router.push("/personalizar");
    },
  },
  mounted() {
    this.fetchTestimoniosAprobados();
    this.fetchHorarios();
    this.fetchCarruselItems();
    this.fetchProductos();
    this.fetchOfertas();
    this.fetchMarcasActivas();
    this.fetchDisenos(); // Asegúrate de llamar a esta función también

    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.setAttribute("data-use-service-core", "");
    script.defer = true;
    document.body.appendChild(script);
  },
};
</script>

<style scoped>
@import "./assets/styles/main.css";

/* Estilos para los mensajes de no datos */
.no-datos {
  text-align: center;
  padding: 20px;
  font-style: italic;
  color: #666;
}

.carousel-productos {
  width: 100%;
}

.btn-agregar {
  background-color: #333;
  color: white;
}

.btn-agregar:hover {
  background-color: #555;
  color: white;
}

.btn-presupuesto {
  background-color: #333;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 1rem;
  width: 100%;
}

.btn-presupuesto:hover {
  background-color: #555;
  color: white;
}

.btn-detalle {
  background-color: #333;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 1rem;
  width: 100%;
}

.btn-detalle:hover {
  background-color: #555;
  color: white;
}

.horarios-lista {
  list-style-type: none;
  padding: 0;
}

.horarios-lista li {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}

.horarios-lista .dia {
  font-weight: bold;
}

.horarios-lista .hora {
  font-style: italic;
}

.horarios-lista li.cerrado {
  color: #999;
  font-style: italic;
}

.carousel .testimonio {
  text-align: center;
  padding: 20px;
}

.carousel .cliente-info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.carousel .cliente-foto {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.carousel .cliente-detalles {
  text-align: left;
}
</style>
