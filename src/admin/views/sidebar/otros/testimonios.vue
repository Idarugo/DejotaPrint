<template>
  <main>
    <div class="container">
      <h1>Administrar Testimonios</h1>
      <table>
        <!-- Encabezados de la tabla -->
        <tr>
          <th>Nombre</th>
          <th>Imagen</th>
          <th>Mensaje</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
        <!-- Filas de la tabla -->
        <tr v-for="testimonio in testimonios" :key="testimonio.id">
          <td>{{ testimonio.nombre }}</td>
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
                <p>
                  <strong>Imagen:</strong>
                  <img
                    :src="testimonioActual.imagen_url"
                    alt="Imagen del testimonio"
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

export default {
  name: "testimonioAdmin",
  data() {
    return {
      testimonios: [],
      modalTitle: "Detalles del testimonio",
      testimonioActual: null,
      imagen: null,
    };
  },
  created() {
    this.fetchTestimonios();
  },
  methods: {
    handleFileUpload(event) {
      this.imagen = event.target.files[0];
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
          this.fetchTestimonios(); // Asegúrate de actualizar la lista de testimonios
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
    resetModal() {
      this.testimonioActual = null;
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
  },
};
</script>

  <style scoped>
@import "../../../assets/styles/views/sidebar/otros/testimonios.css";
</style>
  