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
            <p>{{ producto.descripcion }}</p>
          </div>
        </div>
      </section>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      productos: [
        {
          nombre: "Diseño 1",
          descripcion: "Lanyard de poliéster con logotipo personalizado.",
          imagen: "path/to/image1.jpg",
        },
        {
          nombre: "Diseño 2",
          descripcion: "Llavero de metal con grabado personalizado.",
          imagen: "path/to/image2.jpg",
        },
        {
          nombre: "Diseño 3",
          descripcion:
            "Porta credenciales de cuero con estampado personalizado.",
          imagen: "path/to/image3.jpg",
        },
      ],
    };
  },
  methods: {
    solicitarPresupuesto() {
      // Lógica para solicitar presupuesto
      console.log("Solicitar Presupuesto");
    },
    verProductos() {
      // Lógica para ver productos
      console.log("Ver Productos");
    },
  },
};
</script>

<style scoped>
@import "../../assets/styles/views/quienes-somos.css";
</style>
