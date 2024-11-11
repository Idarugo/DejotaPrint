<template>
  <div class="container">
    <section class="galeria">
      <h2>Galería de Productos</h2>
      <p>
        Explora nuestra amplia variedad de productos personalizados y encuentra
        la solución perfecta para tu marca.
      </p>
      <transition name="fade" mode="out-in">
        <div>
          <div v-if="cargando" class="spinner-container">
            <div class="spinner"></div>
          </div>
          <div v-else class="">
            <div v-if="imagenesUnicas.length > 0" class="row">
              <div
                class="col-md-4 col-sm-6"
                v-for="(imagen, index) in imagenesUnicas"
                :key="index"
              >
                <div class="card mb-4 shadow-sm">
                  <div class="imagen-placeholder">
                    <img
                      class="bd-placeholder-img card-img-top"
                      :src="`http://localhost:3000${imagen.url_imagen}`"
                      alt="Imagen del producto"
                    />
                  </div>
                  <div class="card-body">
                    <h3>{{ imagen.nombre_producto }}</h3>
                    <p class="card-text">
                      Descripción de la imagen {{ index + 1 }}
                    </p>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <button
                        class="btn btn-sm btn-outline-secondary"
                        @click="ampliarImagen(imagen.url_imagen)"
                      >
                        Ampliar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="no-datos">
              <p>No hay galería disponible en este momento.</p>
            </div>
          </div>
        </div>
      </transition>
      <div class="paginacion">
        <button @click="prevPage" :disabled="pagina === 1">Anterior</button>
        <span>{{ pagina }}</span>
        <button @click="nextPage" :disabled="pagina === totalPaginas">
          Siguiente
        </button>
      </div>
    </section>
    <transition name="fade" mode="out-in">
      <div v-if="mostrarImagen" class="imagen-light" @click="ocultarImagen">
        <img :src="imagenActual" alt="Imagen ampliada" />
      </div>
    </transition>
  </div>
</template>


<script>
export default {
  data() {
    return {
      imagenes: [], // Array para almacenar las imágenes
      mostrarImagen: false,
      imagenActual: "",
      pagina: 1,
      porPagina: 6, // Número de productos por página
      cargando: true, // Estado de carga
    };
  },
  computed: {
    imagenesUnicas() {
      const start = (this.pagina - 1) * this.porPagina;
      const end = start + this.porPagina;
      return this.imagenes.slice(start, end);
    },
    totalPaginas() {
      return Math.ceil(this.imagenes.length / this.porPagina);
    },
  },
  mounted() {
    // Llamada a la API para obtener las imágenes
    fetch("http://localhost:3000/api/imagenesProducto")
      .then((response) => response.json()) // Convertir la respuesta a JSON
      .then((data) => {
        this.imagenes = data; // Asignar los datos de la API a imagenes
        this.cargando = false; // Desactivar el estado de carga
      })
      .catch((error) => {
        console.error("Error al obtener las imágenes:", error);
        this.cargando = false; // Desactivar el estado de carga incluso si hay un error
      });
  },
  methods: {
    ampliarImagen(imagen) {
      this.imagenActual = `http://localhost:3000${imagen}`;
      this.mostrarImagen = true;
    },
    ocultarImagen(e) {
      if (e.target.classList.contains("imagen-light")) {
        this.mostrarImagen = false;
      }
    },
    nextPage() {
      if (this.pagina < this.totalPaginas) {
        this.pagina++;
      }
    },
    prevPage() {
      if (this.pagina > 1) {
        this.pagina--;
      }
    },
  },
};
</script>
<style scoped>
.galeria {
  text-align: center;
}

.galeria-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.imagen-placeholder {
  width: 100%;
  height: 200px; /* Ajustar esto según el tamaño deseado */
  padding-bottom: 0; /* Eliminar el padding-bottom */
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Para asegurar que la imagen no se salga del contenedor */
}

.imagen-placeholder img {
  width: auto;
  height: 100%;
  object-fit: cover; /* Ajusta la imagen para que cubra completamente el contenedor */
  transition: transform 0.2s, opacity 0.5s ease-in-out;
}

.card {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, opacity 0.5s ease-in-out;
  margin-bottom: 20px; /* Ajuste para espacio entre tarjetas */
}

.card:hover {
  transform: scale(1.05);
}

.card-body {
  padding: 15px;
}

.card-text {
  font-size: 14px;
  color: #666;
}

.btn-outline-secondary {
  color: #000;
  border-color: #000;
  transition: background-color 0.2s, color 0.2s;
}

.btn-outline-secondary:hover {
  background-color: #000;
  color: #fff;
}

.paginacion {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.paginacion button {
  margin: 0 10px;
  padding: 10px 20px;
  transition: background-color 0.2s, color 0.2s;
}

.imagen-light {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.imagen-light img {
  max-width: 80%;
  max-height: 80%;
  transition: opacity 0.5s ease-in-out;
}

/* Spinner de carga */
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; /* Altura del contenedor del spinner */
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #000;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Reglas de media query para móviles */
@media (max-width: 768px) {
  .card {
    margin-bottom: 20px;
  }

  .paginacion button {
    padding: 5px 10px;
  }

  .card-body h3 {
    font-size: 18px;
  }

  .card-text {
    font-size: 12px;
  }
}

/* Transiciones de Vue.js */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
