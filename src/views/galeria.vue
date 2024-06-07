<template>
  <div class="container">
    <section class="galeria">
      <h2>Galería de Productos</h2>
      <p>
        Explora nuestra amplia variedad de productos personalizados y encuentra
        la solución perfecta para tu marca.
      </p>
      <div class="galeria-container">
        <div
          class="producto"
          v-for="(imagen, index) in imagenesUnicas"
          :key="index"
        >
          <div class="imagen-placeholder">
            <img
              :src="`http://localhost:3000${imagen.url_imagen}`"
              alt="Imagen del producto"
            />
          </div>
          <div class="producto-detalles">
            <h3>{{ imagen.nombre_producto }}</h3>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

  
  <script>
export default {
  data() {
    return {
      imagenes: [], // Array para almacenar las imágenes
      mostrarImagen: false,
      imagenActual: "",
    };
  },
  computed: {
    imagenesUnicas() {
      const imagenesFiltradas = {};
      this.imagenes.forEach((imagen) => {
        if (!imagenesFiltradas[imagen.nombre_producto]) {
          imagenesFiltradas[imagen.nombre_producto] = imagen;
        }
      });
      return Object.values(imagenesFiltradas);
    },
  },
  mounted() {
    // Llamada a la API para obtener las imágenes
    fetch("http://localhost:3000/api/imagenesProducto")
      .then((response) => response.json()) // Convertir la respuesta a JSON
      .then((data) => {
        this.imagenes = data; // Asignar los datos de la API a imagenes
      })
      .catch((error) => console.error("Error al obtener las imágenes:", error));
  },
  methods: {
    aparecerImagen(imagen) {
      this.imagenActual = `http://localhost:3000${imagen}`;
      this.mostrarImagen = true;
    },
    ocultarImagen(e) {
      if (e.target.classList.contains("imagen-light")) {
        this.mostrarImagen = false;
      }
    },
  },
};
</script>
  
<style scoped>
@import "../assets/styles/views/galeria.css";
</style>
  