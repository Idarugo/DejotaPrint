<template>
  <main>
    <div class="container">
      <h1>Administrar Reseñas</h1>
      <table>
        <!-- Encabezados de la tabla -->
        <tr>
          <th>Producto</th>
          <th>Clasificacion</th>
          <th>Mensaje</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
        <!-- Filas de la tabla -->
        <tr v-for="reseña in reseñas" :key="reseña.id">
          <td>{{ reseña.nombre_producto }}</td>
          <td>{{ reseña.clasificacion }}</td>
          <td>{{ reseña.mensaje }}</td>
          <td>{{ reseña.nombre }}</td>
          <td>{{ reseña.correo }}</td>
          <td>{{ reseña.mensaje }}</td>
          <td>{{ new Date(reseña.fecha).toLocaleDateString() }}</td>
          <td>
            <!-- Botón para ver detalles -->
            <button
              @click="verDetalles(reseña)"
              class="btn btn-sm btn-info"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Ver Detalles
            </button>
            <!-- Botón para eliminar -->
            <button
              @click="confirmarEliminar(reseña.id)"
              class="btn btn-sm btn-danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </table>
      <!-- Modal para ver detalles del reseña -->
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
                Detalles de reseña
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
              <template v-if="reseñaActual">
                <p><strong>Nombre:</strong> {{ reseñaActual.nombre }}</p>
                <p>
                  <strong>Correo Electrónico:</strong>
                  {{ reseñaActual.correo }}
                </p>
                <p><strong>Mensaje:</strong> {{ reseñaActual.mensaje }}</p>
                <p>
                  <strong>Fecha:</strong>
                  {{ new Date(reseñaActual.fecha).toLocaleDateString() }}
                </p>
              </template>
              <template v-else>
                <p>No se ha seleccionado ningún reseña.</p>
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

export default {
  name: "reseñaAdmin",
  data() {
    return {
      reseñas: [],
      modalTitle: "Detalles Reseña",
      reseñaActual: null, // Variable para almacenar el reseña actual
    };
  },
  created() {
    this.fetchReseñas();
  },
  methods: {
    fetchReseñas() {
      axios
        .get("/api/resenas")
        .then((response) => {
          this.reseñas = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener las reseñas:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener las reseñas. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    verDetalles(reseña) {
      this.reseñaActual = reseña; // Cambio "reseñasActual" a "reseñaActual"
    },

    confirmarEliminar(reseñaId) {
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
          this.eliminarReseña(reseñaId);
        }
      });
    },
    eliminarReseña(reseñaId) {
      axios
        .delete(`/api/resenas/${reseñaId}`)
        .then(() => {
          // Eliminar el reseña de la lista localmente
          const index = this.reseñas.findIndex(
            (reseña) => reseña.id === reseñaId
          );
          if (index !== -1) {
            this.reseñas.splice(index, 1);
            Swal.fire("Eliminado", "Reseña ha sido eliminado.", "success");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar  reseña:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar reseña. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    resetModal() {
      this.reseñaActual = null;
      this.$refs.myModalRef.hide();
    },
  },
};
</script>
  
  
<style scoped>
@import "../../../assets/styles/views/sidebar/otros/resena.css";
</style>
  