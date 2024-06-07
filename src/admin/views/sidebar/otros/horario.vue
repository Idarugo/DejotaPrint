<template>
  <main>
    <div class="container">
      <h1>Administrar Horarios</h1>
      <!-- Tabla de horarios -->
      <table>
        <!-- Encabezados de la tabla -->
        <tr>
          <th>Dia</th>
          <th>Horario</th>
          <th>Acciones</th>
        </tr>
        <!-- Filas de la tabla -->
        <tr v-for="horario in horarios" :key="horario.id">
          <td>{{ horario.dia }}</td>
          <td>{{ horario.horario }}</td>
          <td>
            <!-- Botón para modificar -->
            <button
              @click="verDetalles(horario)"
              class="btn btn-sm btn-info"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Modificar
            </button>
          </td>
        </tr>
      </table>
      <!-- Modal para modificar el horario -->
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
                Modificar Horario
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
              <template v-if="horarioActual">
                <div class="mb-3">
                  <label for="inputDia" class="form-label">Día</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputDia"
                    v-model="horarioActual.dia"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="inputHorario" class="form-label">Horario</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputHorario"
                    v-model="horarioActual.horario"
                    required
                  />
                </div>
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
              <button
                type="button"
                class="btn btn-primary"
                @click="actualizarHorario"
              >
                Guardar cambios
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
import { Modal } from "bootstrap";

export default {
  name: "horarioAdmin",
  data() {
    return {
      horarios: [],
      horarioActual: null,
    };
  },
  created() {
    this.fetchHorarios();
  },
  methods: {
    fetchHorarios() {
      axios
        .get("/api/horarios")
        .then((response) => {
          this.horarios = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los horarios:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener los horarios. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    verDetalles(horario) {
      this.horarioActual = { ...horario };
    },
    actualizarHorario() {
      const { id, dia, horario } = this.horarioActual;
      const data = { dia, horario };

      axios
        .put(`/api/horarios/${id}`, data)
        .then(() => {
          this.fetchHorarios();
          this.resetModal();
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Horario actualizado correctamente",
          });
        })
        .catch((error) => {
          console.error("Error al actualizar el horario:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al actualizar el horario. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    resetModal() {
      this.horarioActual = null;
      const modal = document.getElementById("myModal");
      const bootstrapModal = Modal.getOrCreateInstance(modal);
      bootstrapModal.hide();
    },
  },
};
</script>

<style scoped>
@import "../../../assets/styles/views/sidebar/otros/horario.css";
</style>
 