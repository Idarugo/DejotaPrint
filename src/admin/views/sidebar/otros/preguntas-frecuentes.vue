<template>
  <main>
    <div class="container">
      <h1>Administrar Preguntas</h1>
      <table>
        <!-- Encabezados de la tabla -->
        <tr>
          <th>Pregunta</th>
          <th>Respuesta</th>
          <th>Tipo de pregunta</th>
          <th>Acciones</th>
        </tr>
        <!-- Filas de la tabla -->
        <tr v-for="faq in paginatedData" :key="faq.id">
          <td>{{ faq.pregunta }}</td>
          <td>{{ faq.respuesta }}</td>
          <td>{{ faq.nombre_subcategoria }}</td>
          <td>
            <!-- Botón para ver detalles -->
            <button
              @click="verDetalles(faq)"
              class="btn btn-sm btn-info"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Ver Detalles
            </button>
            <!-- Botón para eliminar -->
            <button
              @click="confirmarEliminar(faq.id)"
              class="btn btn-sm btn-danger"
            >
              Eliminar
            </button>
            <!-- Botón para modificar -->
            <button
              @click="setFaqActual(faq)"
              class="btn btn-sm btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#modalModificar"
            >
              Modificar
            </button>
          </td>
        </tr>
      </table>
      <Pagination
        :currentPage="currentPage"
        :totalItems="faqs.length"
        :pageSize="pageSize"
        @page-changed="onPageChange"
      />
      <button
        type="button"
        class="btn btn-agregar"
        data-bs-toggle="modal"
        data-bs-target="#modalAgregar"
      >
        Agregar Pregunta
      </button>

      <!-- Modal para agregar -->
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
                Agregar nueva pregunta
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!-- Formulario para agregar -->
              <form @submit.prevent="agregarFaq">
                <div class="mb-3">
                  <label for="pregunta" class="form-label">Pregunta:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="pregunta"
                    v-model="createFaq.pregunta"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="respuesta" class="form-label">Respuesta:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="respuesta"
                    v-model="createFaq.respuesta"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="subcat_id" class="form-label"
                    >Tipo de Pregunta:</label
                  >
                  <select
                    class="form-select"
                    id="subcat_id"
                    v-model="createFaq.subcat_id"
                    required
                  >
                    <option value="" disabled>
                      Seleccione un tipo de pregunta
                    </option>
                    <option
                      v-for="cat_faq in cat_faqs"
                      :key="cat_faq.id"
                      :value="cat_faq.id"
                    >
                      {{ cat_faq.nombre }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="fecha_creacion" class="form-label"
                    >Fecha Creacion:</label
                  >
                  <input
                    class="form-control"
                    id="fecha_creacion"
                    v-model="createFaq.fecha_creacion"
                    disabled
                  />
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-agregar">Agregar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal para modificar -->
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
                Modificar pregunta
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!-- Formulario para modificar -->
              <form @submit.prevent="modificarFaq" v-if="faqActual">
                <div class="mb-3">
                  <label for="pregunta" class="form-label">Pregunta:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="pregunta"
                    v-model="faqActual.pregunta"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="respuesta" class="form-label">Respuesta:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="respuesta"
                    v-model="faqActual.respuesta"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="subcat_id" class="form-label"
                    >Tipo de Pregunta:</label
                  >
                  <select
                    class="form-select"
                    id="subcat_id"
                    v-model="faqActual.subcat_id"
                  >
                    <option
                      v-for="cat_faq in cat_faqs"
                      :key="cat_faq.id"
                      :value="cat_faq.id"
                    >
                      {{ cat_faq.nombre }}
                    </option>
                  </select>
                </div>
                <input type="hidden" v-model="faqActual.fecha_creacion" />
                <div class="mb-3">
                  <label for="fecha_actualizacion" class="form-label"
                    >Fecha Actualizacion:</label
                  >
                  <input
                    type="date"
                    class="form-control"
                    id="fecha_actualizacion"
                    v-model="fechaActual"
                    disabled
                  />
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-agregar">
                    Guardar Cambios
                  </button>
                </div>
              </form>
              <p v-else>
                No se ha seleccionado ninguna pregunta para modificar.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal para ver detalles del faq -->
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
                Detalles de Pregunta
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <template v-if="faqActual">
                <p><strong>Pregunta:</strong> {{ faqActual.pregunta }}</p>
                <p><strong>Respuesta:</strong> {{ faqActual.respuesta }}</p>
                <p>
                  <strong>Tipo de Pregunta:</strong>
                  {{ faqActual.nombre_subcategoria }}
                </p>
                <p>
                  <strong>Fecha Creacion:</strong>
                  {{ new Date(faqActual.fecha_creacion).toLocaleDateString() }}
                </p>
                <p>
                  <strong>Fecha Actualizacion:</strong>
                  {{
                    new Date(faqActual.fecha_actualizacion).toLocaleDateString()
                  }}
                </p>
              </template>
              <template v-else>
                <p>No se ha seleccionado ninguna pregunta.</p>
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
import * as bootstrap from "bootstrap";
import Pagination from "../../../components/Pagination.vue";

export default {
  components: { Pagination },
  data() {
    return {
      faqs: [],
      cat_faqs: [],
      modalTitle: "Detalles de Pregunta",
      faqActual: null,
      createFaq: {
        pregunta: "",
        respuesta: "",
        subcat_id: "",
        fecha_creacion: "",
      },
      fechaActual: new Date().toISOString().slice(0, 10),
      paginatedData: [],
      currentPage: 1,
      pageSize: 5,
    };
  },
  created() {
    this.fetchfaqs();
    this.fetchCatfaq();
  },
  watch: {
    faqs() {
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
      return this.faqs.slice(start, end);
    },
    fetchCatfaq() {
      axios
        .get("/api/cat_faq")
        .then((response) => {
          this.cat_faqs = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los tipo de preguntas:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener los tipos de preguntas. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    fetchfaqs() {
      axios
        .get("/api/faqs")
        .then((response) => {
          console.log("Datos recibidos:", response.data);
          this.faqs = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener las Preguntas:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener las Preguntas. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    agregarFaq() {
      if (
        !this.createFaq.pregunta ||
        !this.createFaq.respuesta ||
        !this.createFaq.subcat_id
      ) {
        Swal.fire(
          "Campos incompletos",
          "Por favor completa todos los campos.",
          "warning"
        );
        return;
      }

      const fechaActual = new Date().toISOString().slice(0, 10);
      this.createFaq.fecha_creacion = fechaActual;

      axios
        .post("/api/faqs", this.createFaq)
        .then(() => {
          this.createFaq = {
            pregunta: "",
            respuesta: "",
            subcat_id: "",
            fecha_creacion: "",
          };

          this.fetchfaqs();
          this.resetModal("modalAgregar");

          Swal.fire(
            "Pregunta agregada",
            "La Pregunta ha sido agregada correctamente.",
            "success"
          );
        })
        .catch((error) => {
          console.error("Error al agregar pregunta:", error);
          Swal.fire(
            "Error",
            "Hubo un error al agregar la pregunta. Por favor, intenta de nuevo más tarde.",
            "error"
          );
        });
    },
    verDetalles(faq) {
      this.faqActual = faq;
    },
    confirmarEliminar(faqId) {
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
          this.eliminarfaq(faqId);
        }
      });
    },
    eliminarfaq(faqId) {
      axios
        .delete(`/api/faqs/${faqId}`)
        .then(() => {
          this.fetchfaqs();
          Swal.fire("Eliminado", "Pregunta ha sido eliminada.", "success");
        })
        .catch((error) => {
          console.error("Error al eliminar la Pregunta:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar la Pregunta. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    setFaqActual(faq) {
      this.faqActual = {
        ...faq,
        fecha_actualizacion: new Date().toISOString().slice(0, 10),
      };
    },
    modificarFaq() {
      if (!this.faqActual.pregunta || !this.faqActual.respuesta) {
        Swal.fire(
          "Campos incompletos",
          "Por favor completa todos los campos.",
          "warning"
        );
        return;
      }

      axios
        .put(`/api/faqs/${this.faqActual.id}`, this.faqActual)
        .then(() => {
          this.fetchfaqs();
          this.resetModal("modalModificar");

          Swal.fire(
            "Pregunta modificada",
            "La Pregunta ha sido modificada correctamente.",
            "success"
          );
        })
        .catch((error) => {
          console.error("Error al modificar la pregunta:", error);
          Swal.fire(
            "Error",
            "Hubo un error al modificar la pregunta. Por favor, intenta de nuevo más tarde.",
            "error"
          );
        });
    },
    resetModal(modalId) {
      this.faqActual = null;
      this.createFaq = {
        pregunta: "",
        respuesta: "",
        subcat_id: "",
        fecha_creacion: "",
      };
      const modal = document.getElementById(modalId);
      const bootstrapModal = bootstrap.Modal.getOrCreateInstance(modal);
      bootstrapModal.hide();

      const backdrops = document.querySelectorAll(".modal-backdrop");
      backdrops.forEach((backdrop) => backdrop.remove());
      document.body.classList.remove("modal-open");
      document.body.style.paddingRight = "";
    },
  },
  mounted() {
    this.createFaq.fecha_creacion = this.fechaActual;
  },
};
</script>

<style scoped>
@import "../../../assets/styles/views/sidebar/otros/faqs.css";
</style>
