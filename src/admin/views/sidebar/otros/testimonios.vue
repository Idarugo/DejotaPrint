<template>
  <main>
    <div class="container">
      <h1>Administrar Testimonios</h1>

      <!-- Generar Token -->
      <div class="token-generator">
        <button class="btn btn-agregar" @click="generateToken">
          Generar Token
        </button>
        <div v-if="generatedToken">
          <p>Token generado:</p>
          <pre>{{ generatedToken }}</pre>
        </div>
      </div>

      <table>
        <!-- Encabezados de la tabla -->
        <tr>
          <th>Nombre</th>
          <th>Título</th>
          <th>Empresa</th>
          <th>Imagen</th>
          <th>Mensaje</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
        <!-- Filas de la tabla -->
        <tr v-for="testimonio in paginatedData" :key="testimonio.id">
          <td>{{ testimonio.nombre }}</td>
          <td>{{ testimonio.titulo }}</td>
          <td>{{ testimonio.empresa }}</td>
          <td>
            <img
              :src="'http://localhost:3000' + testimonio.imagen_url"
              alt="Imagen del testimonio"
              width="50"
            />
          </td>
          <td>{{ testimonio.mensaje }}</td>
          <td>{{ estadoTestimonio(testimonio.estado) }}</td>
          <td>
            <!-- Botón para ver detalles -->
            <button
              @click="verDetalles(testimonio)"
              class="btn btn-sm btn-info"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Ver Detalles
            </button>
            <!-- Botón para cambiar estado -->
            <button
              @click="
                cambiarEstado(testimonio.id, testimonio.estado === 1 ? 0 : 1)
              "
              class="btn btn-sm"
              :class="testimonio.estado === 1 ? 'btn-warning' : 'btn-success'"
            >
              {{ testimonio.estado === 1 ? "Deshabilitar" : "Habilitar" }}
            </button>
            <!-- Botón para eliminar -->
            <button
              @click="confirmarEliminar(testimonio.id)"
              class="btn btn-sm btn-danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </table>
      <Pagination
        :currentPage="currentPage"
        :totalItems="testimonios.length"
        :pageSize="pageSize"
        @page-changed="onPageChange"
      />
      <!-- Modal para ver detalles del testimonio -->
      <div
        class="modal fade"
        id="myModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Detalles del testimonio
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!-- Contenido del modal -->
              <template v-if="testimonioActual">
                <p><strong>Nombre:</strong> {{ testimonioActual.nombre }}</p>
                <p><strong>Título:</strong> {{ testimonioActual.titulo }}</p>
                <p><strong>Empresa:</strong> {{ testimonioActual.empresa }}</p>
                <p>
                  <strong>Imagen:</strong>
                  <img
                    :src="'http://localhost:3000' + testimonioActual.imagen_url"
                    alt="Imagen del testimonio"
                    width="100"
                  />
                </p>
                <p><strong>Mensaje:</strong> {{ testimonioActual.mensaje }}</p>
                <p>
                  <strong>Estado:</strong>
                  {{ estadoTestimonio(testimonioActual.estado) }}
                </p>
              </template>
              <template v-else>
                <p>No se ha seleccionado ningún testimonio.</p>
              </template>
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
    </div>
  </main>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Pagination from "../../../components/Pagination.vue";

export default {
  components: { Pagination },
  name: "testimonioAdmin",
  data() {
    return {
      testimonios: [],
      modalTitle: "Detalles del testimonio",
      testimonioActual: null,
      imagen: null,
      paginatedData: [],
      currentPage: 1,
      pageSize: 5,
      generatedToken: null, // Añadir el estado para el token generado
    };
  },
  created() {
    this.fetchTestimonios();
  },
  watch: {
    testimonios() {
      this.paginatedData = this.getPaginatedData();
    },
    currentPage() {
      this.paginatedData = this.getPaginatedData();
    },
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page;
    },
    getPaginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.testimonios.slice(start, end);
    },
    fetchTestimonios() {
      axios
        .get("/api/testimonios")
        .then((response) => {
          this.testimonios = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los testimonios:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener los testimonios. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    verDetalles(testimonio) {
      this.testimonioActual = testimonio;
    },
    confirmarEliminar(testimonioId) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.eliminarTestimonio(testimonioId);
        }
      });
    },
    eliminarTestimonio(testimonioId) {
      axios
        .delete(`/api/testimonios/${testimonioId}`)
        .then(() => {
          this.fetchTestimonios();
          this.paginatedData = this.getPaginatedData();
          Swal.fire("Eliminado", "El testimonio ha sido eliminado.", "success");
        })
        .catch((error) => {
          console.error("Error al eliminar el testimonio:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar el testimonio. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    estadoTestimonio(estado) {
      return estado === 1 ? "Habilitado" : "Deshabilitado";
    },
    cambiarEstado(testimonioId, nuevoEstado) {
      axios
        .put(`/api/testimonios/${testimonioId}/estado`, { estado: nuevoEstado })
        .then(() => {
          const testimonio = this.testimonios.find(
            (t) => t.id === testimonioId
          );
          if (testimonio) {
            testimonio.estado = nuevoEstado;
          }
          Swal.fire(
            "Estado actualizado",
            "El estado del testimonio ha sido actualizado correctamente.",
            "success"
          );
        })
        .catch((error) => {
          console.error("Error al actualizar el estado del testimonio:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al actualizar el estado del testimonio. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    async generateToken() {
      try {
        const response = await axios.post("/api/tokens/generate");
        this.generatedToken = response.data.token;
        const tokenUrl = `http://localhost:8080/testimonios?token=${this.generatedToken}`;

        Swal.fire({
          title: "Token generado",
          html: `
          <p>Token generado con éxito:</p>
          <pre>${tokenUrl}</pre>
          <button id="copy-token" class="swal2-confirm swal2-styled">Copiar Token</button>
        `,
          showConfirmButton: false,
          didRender: () => {
            const copyBtn = document.getElementById("copy-token");
            copyBtn.addEventListener("click", () => {
              navigator.clipboard
                .writeText(tokenUrl)
                .then(() => {
                  Swal.fire(
                    "Copiado",
                    "El token ha sido copiado al portapapeles",
                    "success"
                  );
                })
                .catch((err) => {
                  Swal.fire("Error", "No se pudo copiar el token", "error");
                });
            });
          },
        });
      } catch (error) {
        console.error("Error al generar el token:", error);
        Swal.fire(
          "Error",
          "Hubo un error al generar el token. Por favor, inténtelo de nuevo más tarde.",
          "error"
        );
      }
    },
  },
};
</script>

<style scoped>
@import "../../../assets/styles/views/sidebar/otros/testimonios.css";

.token-generator {
  margin-bottom: 20px;
}

pre {
  background-color: #f8f9fa;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: left;
  white-space: pre-wrap;
  word-break: break-all;
}

.btn-agregar {
  background-color: #333;
  color: white;
}

.btn-agregar:hover {
  background-color: #555;
  color: white;
}

.container {
  background-color: var(--sidebar-color);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px auto;
  padding: 50px;
}

.form-control {
  background-color: var(--sidebar-color);
  color: var(--text-color);
}

h1 {
  color: var(--text-color);
  margin-bottom: 20px;
  margin-top: 0;
  text-align: center;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  color: var(--text-color);
  padding: 12px;
  text-align: left;
}

th {
  background-color: var(--sidebar-color);
  color: var(--text-color);
}

.button {
  background-color: #6d7fcc;
  border: none;
  border-radius: 4px;
  color: var(--text-color);
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  padding: 8px 12px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-editar {
  background-color: #4caf50;
  border: none;
  border-radius: 4px;
  color: var(--text-color);
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  padding: 8px 12px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-bloquear {
  background-color: #ff9800;
  border: none;
  border-radius: 4px;
  color: var(--text-color);
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  padding: 8px 12px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-eliminar {
  background-color: #f44336;
  border: none;
  border-radius: 4px;
  color: var(--text-color);
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  padding: 8px 12px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.img-blog {
  aspect-ratio: 1/1;
  background: #dfdfdf;
  border-radius: 50%;
  display: block;
  height: 150px;
  margin: 0 auto;
  overflow: hidden;
  width: 150px;
}

.img-blog img {
  height: 100%;
  object-fit: cover;
  object-position: center center;
  width: 100%;
}

@media (max-width: 767px) {
  body {
    font-size: 16px;
  }

  .container {
    background-color: var(--sidebar-color);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 0;
    max-height: 400px;
    overflow-y: auto;
    padding: 50px;
  }

  table {
    font-size: 14px;
  }

  .button,
  .btn-editar,
  .btn-eliminar {
    font-size: 12px;
    padding: 6px 10px;
  }
}
</style>
