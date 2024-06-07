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
        <tr v-for="faq in faqs" :key="faq.id">
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
      <button
        type="button"
        class="btn btn-primary mb-3"
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
                    id="fecha_creacion"
                    v-model="createFaq.fecha_creacion"
                    disabled
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
                  <button type="submit" class="btn btn-primary">
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
import * as bootstrap from "bootstrap"; // Importa bootstrap aquí

export default {
  data() {
    return {
      faqs: [],
      cat_faqs: [], // Inicializamos cat_faqs
      modalTitle: "Detalles de Pregunta",
      faqActual: null, // Variable para almacenar el faq actual
      createFaq: {
        pregunta: "",
        respuesta: "",
        subcat_id: "",
        fecha_creacion: "",
      },
      fechaActual: new Date().toISOString().slice(0, 10), // Fecha actual
    };
  },
  created() {
    this.fetchfaqs();
    this.fetchCatfaq();
  },
  methods: {
    fetchCatfaq() {
      axios
        .get("/api/cat_faq") // Ruta del endpoint para obtener todos los productos
        .then((response) => {
          this.cat_faqs = response.data; // Almacenamos los productos en la propiedad cat_faqs
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
          console.log("Datos recibidos:", response.data); // Verificar los datos recibidos
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
      // Validación del formulario
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

      // Asignar la fecha actual
      const fechaActual = new Date().toISOString().slice(0, 10);
      this.createFaq.fecha_creacion = fechaActual;

      // Enviar solicitud al servidor para agregar el faq
      axios
        .post("/api/faqs", this.createFaq)
        .then(() => {
          // Limpiar el formulario
          this.createFaq = {
            pregunta: "",
            respuesta: "",
            subcat_id: "",
            fecha_creacion: "",
          };
          // Cerrar el modal
          const modalAgregar = bootstrap.Modal.getInstance(
            document.getElementById("modalAgregar")
          );
          modalAgregar.hide();
          // Actualizar la lista de FAQs
          this.fetchfaqs();
          // Mostrar mensaje de éxito
          Swal.fire(
            "Pregunta agregada",
            "La Pregunta ha sido agregada correctamente.",
            "success"
          );
        })
        .catch((error) => {
          console.error("Error al agregar pregunta:", error);
          // Mostrar mensaje de error
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
          // Eliminar el faq de la lista localmente
          const index = this.faqs.findIndex((faq) => faq.id === faqId);
          if (index !== -1) {
            this.faqs.splice(index, 1);
            Swal.fire("Eliminado", "Pregunta ha sido eliminada.", "success");
          }
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
          const modalModificar = bootstrap.Modal.getInstance(
            document.getElementById("modalModificar")
          );
          modalModificar.hide();
          this.fetchfaqs();
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
  },
  mounted() {
    this.createFaq.fecha_creacion = this.fechaActual;
  },
};
</script>

<style scoped>
@import "../../../assets/styles/views/sidebar/otros/faqs.css";
</style>
