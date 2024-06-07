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
          <button @click="personalizarProducto('Personalizado')">
            Personalizar
          </button>
        </div>
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
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
          <div class="carousel-inner">
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
      <div class="disenos-container">
        <div class="diseno" v-for="(producto, index) in productos" :key="index">
          <div class="imagen-placeholder">
            <img :src="producto.imagen" alt="" />
          </div>
          <h3>{{ producto.nombre }}</h3>
          <p>{{ producto.descripcion }}</p>
        </div>
      </div>
    </section>

    <!-- Sección de Servicios -->
    <section class="servicios">
      <h2>Nuestros servicios</h2>
      <div class="servicios-container">
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
          <img src="path/to/your/image.jpg" alt="Sobre nosotros imagen" />
        </div>
      </div>
    </section>

    <!-- Sección de Productos -->
    <section class="productos">
      <h2>Nuestros Productos</h2>
      <p>Explora nuestra selección de tarjetas y llaveros personalizados.</p>
      <div class="productos-container">
        <div
          class="producto"
          v-for="producto in productos"
          :key="producto.titulo"
        >
          <div class="imagen-placeholder">
            <img :src="producto.imagen" alt="" />
          </div>
          <h3>{{ producto.titulo }}</h3>
          <p>{{ producto.descripcion }}</p>
          <button @click="personalizarProducto(producto.titulo)">
            Personalizar
          </button>
        </div>
      </div>
    </section>

    <!-- Sección de Ofertas Especiales -->
    <section class="productos">
      <h2>Ofertas Especiales</h2>
      <p>
        Explora nuestra selección de lanyards, llaveros y porta credenciales
        personalizados.
      </p>
      <div class="productos-container">
        <div class="producto" v-for="oferta in ofertas" :key="oferta.id">
          <div class="imagen-placeholder">
            <img :src="oferta.imagen" alt="" />
          </div>
          <h3>{{ oferta.nombre_producto }}</h3>
          <p>{{ oferta.descripcion_producto }}</p>
          <div class="precios">
            <span class="precio-descuento">{{
              precioChileno(oferta.precio_descuento)
            }}</span>
            <span class="precio-original" v-if="oferta.precio_producto">{{
              precioChileno(oferta.precio_producto)
            }}</span>
          </div>
          <button @click="personalizarProducto(oferta.nombre_producto)">
            Personalizar
          </button>
        </div>
      </div>
    </section>

    <section class="horario text-center my-5">
      <h2 class="mb-4">Horario de Atención</h2>
      <p>Lunes a Viernes, 9 AM - 6 PM</p>
    </section>

    <!-- Testimonios -->
    <section class="testimonios">
      <h2>Lo que dicen nuestros clientes</h2>
      <p>Escucha las experiencias de nuestros clientes satisfechos.</p>
      <div class="testimonios-container">
        <carousel
          v-if="testimoniosAprobados.length"
          :autoplay="true"
          :autoplayTimeout="5000"
        >
          <slide
            v-for="(testimonio, index) in testimoniosAprobados"
            :key="index"
          >
            <div class="testimonio">
              <p>{{ testimonio.comentario }}</p>
              <div class="cliente-info">
                <img
                  :src="`http://localhost:3000${testimonio.imagen_url}`"
                  alt="Foto de {{ testimonio.nombre }}"
                  class="cliente-foto"
                />
                <div class="cliente-detalles">
                  <strong>{{ testimonio.nombre }}</strong>
                  <span>{{ testimonio.titulo }}, {{ testimonio.empresa }}</span>
                </div>
              </div>
            </div>
          </slide>
        </carousel>
        <div v-else class="no-testimonios">
          <p>No hay clientes satisfechos en este momento.</p>
        </div>
      </div>
    </section>

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
      </div>
    </section>
  </main>
</template>

<script>
import Carousel from "@chenfengyuan/vue-carousel";
import axios from "axios"; // Importa Axios
import Swal from "sweetalert2";

export default {
  data() {
    return {
      marcasActivas: [],
      testimoniosAprobados: [], // Aquí almacenaremos los testimonios aprobados obtenidos del servidor
      carruselItems: [], // Almacenar los elementos del carrusel obtenidos del servidor
      productos: [],
      ofertas: [],

      servicios: [
        {
          titulo: "Impresión de tarjetas",
          descripcion:
            "Imprimimos tus tarjetas de presentación en alta calidad.",
          icono: "fas fa-print", // Usa las clases de FontAwesome para los íconos
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
    async fetchCarruselItems() {
      try {
        const response = await axios.get("http://localhost:3000/api/carrusel"); // Cambia la URL según tu configuración
        this.carruselItems = response.data; // Asigna los datos de la respuesta a carruselItems
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
        const response = await axios.get("/api/marcas/activas"); // Utiliza Axios para hacer la solicitud GET
        this.marcasActivas = response.data; // Asigna los datos de la respuesta a la variable marcasActivas
      } catch (error) {
        console.error("Error al obtener las marcas activas:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron obtener las marcas activas.",
        });
      }
    },
    async fetchProductos() {
      try {
        const response = await axios.get("/api/productos"); // Cambia la URL según tu configuración
        this.productos = response.data;
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
        const response = await axios.get("/api/ofertas/especiales"); // Cambia la URL según tu configuración
        this.ofertas = response.data;
      } catch (error) {
        console.error("Error al obtener las ofertas:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron obtener las ofertas.",
        });
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/testimonios/aprobados")
      .then((response) => {
        this.testimoniosAprobados = response.data;
      })
      .catch((error) => {
        console.error("Error al obtener los testimonios aprobados:", error);
        // Manejar el error según sea necesario
      });
    this.fetchProductos(); // Obtener productos al cargar el componente
    this.fetchOfertas(); // Obtener ofertas al cargar el componente
    this.fetchMarcasActivas();
    this.fetchCarruselItems(); // Llamar al método para obtener los elementos del carrusel

    // Inserta el script proporcionado por Elfsight para cargar el widget
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.setAttribute("data-use-service-core", "");
    script.defer = true;
    document.body.appendChild(script);
  },
};
</script>

<style>
@import "./assets/styles/main.css";
</style>
