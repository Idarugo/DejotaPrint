<template>
  <main class="container">
    <section class="hero">
      <div class="hero-content">
        <div class="text-content">
          <h1>Acme Lanyards: Personalizando tu imagen de marca</h1>
          <p>
            Somos una empresa dedicada a la fabricación y personalización de
            lanyards, llaveros y porta credenciales. Ofrecemos una amplia
            variedad de diseños y materiales para que puedas crear productos
            únicos que reflejen la imagen de tu marca.
          </p>
          <div class="hero-buttons">
            <button @click="solicitarPresupuesto" class="btn btn-primary">
              Solicitar Presupuesto
            </button>
            <button @click="verProductos" class="btn btn-secondary">
              Ver Productos
            </button>
          </div>
        </div>
        <div class="image-placeholder">
          <img src="path/to/your/image.jpg" alt="Hero Image" />
        </div>
      </div>

      <!-- Sección de Diseños Personalizados -->
      <section class="disenos-personalizados">
        <h2>Diseños Personalizados</h2>
        <p>
          Explora nuestra amplia variedad de diseños y personaliza tus lanyards,
          llaveros y porta credenciales para que reflejen la imagen de tu marca.
        </p>
        <div class="disenos-container">
          <div
            class="diseno"
            v-for="(producto, index) in productos"
            :key="index"
          >
            <div class="imagen-placeholder">
              <img :src="producto.imagen" alt="" />
            </div>
            <h3>{{ producto.nombre }}</h3>
          </div>
        </div>
      </section>
    </section>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      productos: [],
    };
  },
  methods: {
    solicitarPresupuesto() {
      this.$router.push("/contacto");
    },
    verProductos() {
      this.$router.push("/productos");
    },
    async fetchDisenos() {
      try {
        const response = await axios.get("http://localhost:3000/api/disenos");
        this.productos = response.data.map((diseno) => ({
          nombre: diseno.nombre,
          descripcion: diseno.descripcion,
          imagen: diseno.imagen
            ? `http://localhost:3000${diseno.imagen}`
            : "http://localhost:3000/uploads/disenos/default.jpg",
        }));
      } catch (error) {
        console.error("Error al obtener los diseños:", error);
      }
    },
  },
  mounted() {
    this.fetchDisenos();
  },
};
</script>

<style scoped>
@import "../../assets/styles/views/info/quienes-somos.css";
</style>
