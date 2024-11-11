<template>
  <main>
    <div class="container">
      <h1>Administrar Plantillas</h1>
      <table>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Tipo</th>
          <th>Ruta archivo</th>
          <th>Etiquetas</th>
          <th>Acciones</th>
        </tr>
        <tr v-for="plantilla in paginatedData" :key="plantilla.id">
          <td>{{ plantilla.nombre }}</td>
          <td>{{ plantilla.descripcion }}</td>
          <td>{{ plantilla.tipo }}</td>
          <td>{{ plantilla.ruta_archivo }}</td>
          <td>{{ plantilla.etiquetas }}</td>
          <td>
            <button
              @click="prepararModificacion(plantilla)"
              class="btn btn-sm btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#modalModificar"
            >
              Modificar
            </button>
            <button
              @click="confirmarEliminar(plantilla.id)"
              class="btn btn-sm btn-danger"
            >
              Eliminar
            </button>
            <a
              :href="`http://localhost:3000${plantilla.ruta_archivo}`"
              download
              class="btn btn-sm btn-primary"
            >
              Descargar
            </a>
          </td>
        </tr>
      </table>
      <Pagination
        :currentPage="currentPage"
        :totalItems="plantillas.length"
        :pageSize="pageSize"
        @page-changed="onPageChange"
      />
      <button
        @click="prepararAgregar"
        class="btn btn-agregar"
        data-bs-toggle="modal"
        data-bs-target="#modalAgregar"
      >
        Agregar Plantilla
      </button>

      <!-- Modal para agregar plantilla -->
      <div
        class="modal fade"
        id="modalAgregar"
        tabindex="-1"
        aria-labelledby="modalAgregarLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalAgregarLabel">
                Agregar Plantilla
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form
                @submit.prevent="agregarPlantilla"
                enctype="multipart/form-data"
              >
                <div class="form-group">
                  <label for="nombreAgregar">Nombre:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nombreAgregar"
                    v-model="nuevaPlantilla.nombre"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="descripcionAgregar">Descripción:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="descripcionAgregar"
                    v-model="nuevaPlantilla.descripcion"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="tipoAgregar">Tipo:</label>
                  <select
                    class="form-control"
                    id="tipoAgregar"
                    v-model="nuevaPlantilla.tipo"
                    required
                  >
                    <option value="" disabled selected>
                      Seleccione un tipo de plantilla
                    </option>
                    <option value="Adobe Illustrator">Adobe Illustrator</option>
                    <option value="Excel">Excel</option>
                    <option value="Word">Word</option>
                    <option value="PDF">PDF</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="rutaArchivoAgregar">Archivo:</label>
                  <input
                    type="file"
                    class="form-control"
                    id="rutaArchivoAgregar"
                    @change="handleFileUpload"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="etiquetasAgregar">Etiquetas:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="etiquetasAgregar"
                    v-model="nuevaPlantilla.etiquetas"
                    required
                  />
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">Agregar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal para modificar plantilla -->
      <div
        class="modal fade"
        id="modalModificar"
        tabindex="-1"
        aria-labelledby="modalModificarLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalModificarLabel">
                Modificar Plantilla
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form v-if="plantillaActual" @submit.prevent="modificarPlantilla">
                <div class="form-group">
                  <label for="nombreModificar">Nombre:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nombreModificar"
                    v-model="plantillaActual.nombre"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="descripcionModificar">Descripción:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="descripcionModificar"
                    v-model="plantillaActual.descripcion"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="tipoModificar">Tipo:</label>
                  <select
                    class="form-control"
                    id="tipoModificar"
                    v-model="plantillaActual.tipo"
                    required
                  >
                    <option value="" disabled selected>
                      Seleccione un tipo de plantilla
                    </option>
                    <option value="Adobe Illustrator">Adobe Illustrator</option>
                    <option value="Excel">Excel</option>
                    <option value="Word">Word</option>
                    <option value="PDF">PDF</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="rutaArchivoModificar">Ruta Archivo:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="rutaArchivoModificar"
                    v-model="plantillaActual.ruta_archivo"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="etiquetasModificar">Etiquetas:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="etiquetasModificar"
                    v-model="plantillaActual.etiquetas"
                    required
                  />
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">
                    Guardar cambios
                  </button>
                </div>
              </form>
              <div v-else>
                <p>No se ha seleccionado ninguna plantilla para modificar.</p>
              </div>
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
import Pagination from "../../../components/Pagination.vue";

export default {
  components: { Pagination },
  name: "PlantillaAdmin",
  data() {
    return {
      plantillas: [],
      plantillaActual: null,
      nuevaPlantilla: {
        nombre: "",
        descripcion: "",
        tipo: "",
        ruta_archivo: "",
        etiquetas: "",
      },
      paginatedData: [],
      currentPage: 1,
      pageSize: 5,
    };
  },
  created() {
    this.fetchPlantillas();
  },
  watch: {
    plantillas() {
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
      return this.plantillas.slice(start, end);
    },
    fetchPlantillas() {
      axios
        .get("/api/plantillas")
        .then((response) => {
          this.plantillas = response.data;
          this.paginatedData = this.getPaginatedData();
        })
        .catch((error) => {
          console.error("Error al obtener las plantillas:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener las plantillas. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    prepararAgregar() {
      this.nuevaPlantilla = {
        nombre: "",
        descripcion: "",
        tipo: "",
        ruta_archivo: "",
        etiquetas: "",
      };
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.nuevaPlantilla.ruta_archivo = file;
    },
    agregarPlantilla() {
      const formData = new FormData();
      formData.append("nombre", this.nuevaPlantilla.nombre);
      formData.append("descripcion", this.nuevaPlantilla.descripcion);
      formData.append("tipo", this.nuevaPlantilla.tipo);
      formData.append("ruta_archivo", this.nuevaPlantilla.ruta_archivo);
      formData.append("etiquetas", this.nuevaPlantilla.etiquetas);

      axios
        .post("/api/plantillas", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.plantillas.push({
            ...this.nuevaPlantilla,
            id: response.data.id,
            ruta_archivo: `/uploads/plantillas/${response.data.filename}`, // Actualiza la ruta de archivo
          });
          this.resetModal("modalAgregar");
          this.paginatedData = this.getPaginatedData(); // Actualiza la tabla
          Swal.fire("Agregado", "La plantilla ha sido agregada.", "success");
        })
        .catch((error) => {
          console.error("Error al agregar la plantilla:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al agregar la plantilla. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    prepararModificacion(plantilla) {
      this.plantillaActual = plantilla;
    },
    modificarPlantilla() {
      axios
        .put(`/api/plantillas/${this.plantillaActual.id}`, this.plantillaActual)
        .then(() => {
          this.resetModal("modalModificar");
          this.fetchPlantillas();
          Swal.fire(
            "Modificado",
            "La plantilla ha sido modificada.",
            "success"
          );
        })
        .catch((error) => {
          console.error("Error al modificar la plantilla:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al modificar la plantilla. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    confirmarEliminar(plantillaId) {
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
          this.eliminarPlantilla(plantillaId);
        }
      });
    },
    eliminarPlantilla(plantillaId) {
      axios
        .delete(`/api/plantillas/${plantillaId}`)
        .then(() => {
          const index = this.plantillas.findIndex(
            (plantilla) => plantilla.id === plantillaId
          );
          if (index !== -1) {
            this.plantillas.splice(index, 1);
            this.paginatedData = this.getPaginatedData();
            Swal.fire(
              "Eliminado",
              "La plantilla ha sido eliminada.",
              "success"
            );
          }
        })
        .catch((error) => {
          console.error("Error al eliminar la plantilla:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar la plantilla. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    resetModal(modalId) {
      const modal = document.getElementById(modalId);
      const bootstrapModal = Modal.getOrCreateInstance(modal);
      bootstrapModal.hide();

      document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
        backdrop.parentNode.removeChild(backdrop);
      });
      document.body.classList.remove("modal-open");
      document.body.style.paddingRight = "";
    },
  },
};
</script>

<style scoped>
@import "../../../assets/styles/views/sidebar/core/plantilla.css";
</style>
