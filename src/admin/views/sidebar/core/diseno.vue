<template>
  <main>
    <div class="container">
      <h1>Administrar diseños</h1>
      <table class="table table-striped">
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
        <tr v-for="diseno in paginatedData" :key="diseno.id">
          <td>{{ diseno.nombre }}</td>
          <td>{{ diseno.descripcion }}</td>
          <td>
            <button
              @click="verDetalles(diseno)"
              class="btn btn-sm btn-info"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Ver Detalles
            </button>
            <button
              @click="prepararModificacion(diseno)"
              class="btn btn-sm btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#modalModificar"
            >
              Modificar
            </button>
            <button
              @click="confirmarEliminar(diseno.id)"
              class="btn btn-sm btn-danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </table>
      <Pagination
        :currentPage="currentPage"
        :totalItems="disenos.length"
        :pageSize="pageSize"
        @page-changed="onPageChange"
      />
      <button
        @click="resetModal"
        class="btn btn-agregar"
        data-bs-toggle="modal"
        data-bs-target="#modalAgregar"
      >
        Agregar diseño
      </button>

      <!-- Modal para agregar nuevos elementos -->
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
              <h5 class="modal-title" id="modalAgregarLabel">Agregar diseño</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="agregarDiseno">
                <div class="form-group">
                  <label for="title">Nombre:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="nuevoDiseno.nombre"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="content">Descripción:</label>
                  <textarea
                    class="form-control"
                    id="content"
                    v-model="nuevoDiseno.descripcion"
                    required
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="subcategoria" class="form-label"
                    >Tipo de diseño:</label
                  >
                  <select
                    class="form-select"
                    id="subcategoria"
                    v-model="nuevoDiseno.subcategoria"
                    required
                  >
                    <option value="" disabled selected>
                      Seleccione un tipo de diseño
                    </option>
                    <option
                      v-for="subcategoria in subcategorias"
                      :key="subcategoria.id"
                      :value="subcategoria.id"
                    >
                      {{ subcategoria.nombre }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="imagen" class="form-label">Imagen</label>
                  <input
                    type="file"
                    class="form-control"
                    id="imagen"
                    @change="onFileChange"
                    required
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

      <!-- Modal para modificar diseño -->
      <div
        class="modal fade"
        id="modalModificar"
        tabindex="-1"
        aria-labelledby="modalModificarLabel"
        aria-hidden="true"
        ref="myModalModificarRef"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalModificarLabel">
                Modificar diseño
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form v-if="disenoActual" @submit.prevent="modificarDiseno">
                <div class="form-group">
                  <label for="titleModificar">Nombre:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="titleModificar"
                    v-model="disenoActual.nombre"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="contentModificar">Descripción:</label>
                  <textarea
                    class="form-control"
                    id="contentModificar"
                    v-model="disenoActual.descripcion"
                    required
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="subcategoriaModificar" class="form-label"
                    >Tipo de diseño:</label
                  >
                  <select
                    class="form-select"
                    id="subcategoriaModificar"
                    v-model="disenoActual.subcategoria"
                    required
                  >
                    <option value="" disabled selected>
                      Seleccione un tipo de diseño
                    </option>
                    <option
                      v-for="subcategoria in subcategorias"
                      :key="subcategoria.id"
                      :value="subcategoria.id"
                    >
                      {{ subcategoria.nombre }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="imagenModificar" class="form-label">Imagen</label>
                  <input
                    type="file"
                    class="form-control"
                    id="imagenModificar"
                    @change="onFileChangeModificar"
                  />
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">
                    Guardar cambios
                  </button>
                </div>
              </form>
              <div v-else>
                <p>No se ha seleccionado ningún diseño para modificar.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal para ver detalles del diseño -->
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
                Detalles del diseño
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <template v-if="disenoActual">
                <p><strong>Nombre:</strong> {{ disenoActual.nombre }}</p>
                <p>
                  <strong>Descripción:</strong> {{ disenoActual.descripcion }}
                </p>
                <p>
                  <strong>Tipo de diseño:</strong>
                  {{ disenoActual.nombre_subcategoria }}
                </p>
                <p><strong>Imagen:</strong></p>
                <img :src="disenoActual.imagen" alt="Imagen del diseño" />
              </template>
              <template v-else>
                <p>No se ha seleccionado ningún diseño.</p>
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
import { Modal } from "bootstrap";
import Pagination from "../../../components/Pagination.vue"; // Asegúrate de la ruta correcta del componente

export default {
  components: { Pagination },
  data() {
    return {
      disenos: [],
      paginatedData: [],
      currentPage: 1,
      pageSize: 5,
      subcategorias: [],
      disenoActual: null,
      nuevoDiseno: {
        nombre: "",
        descripcion: "",
        subcategoria: "",
        imagen: null,
      },
    };
  },
  created() {
    this.fetchDisenos();
    this.fetchSubcategorias();
  },
  watch: {
    disenos() {
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
      return this.disenos.slice(start, end);
    },
    fetchDisenos() {
      axios
        .get("/api/disenos/admin")
        .then((response) => {
          this.disenos = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los disenos:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener los disenos. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    fetchSubcategorias() {
      axios
        .get("/api/subcategorias")
        .then((response) => {
          this.subcategorias = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los tipos de disenos:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener los tipos de disenos. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    onFileChange(event) {
      const file = event.target.files[0];
      this.nuevoDiseno.imagen = file;
    },
    onFileChangeModificar(event) {
      const file = event.target.files[0];
      this.disenoActual.imagen = file;
    },
    agregarDiseno() {
      const formData = new FormData();
      formData.append("nombre", this.nuevoDiseno.nombre);
      formData.append("descripcion", this.nuevoDiseno.descripcion);
      formData.append("subcategoria", this.nuevoDiseno.subcategoria);
      formData.append("imagen", this.nuevoDiseno.imagen);

      axios
        .post("/api/disenos", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const nuevoDiseno = { ...this.nuevoDiseno, id: response.data.id };
          this.disenos.push(nuevoDiseno);
          this.resetModal();
          this.paginatedData = this.getPaginatedData(); // Actualiza la tabla
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Diseño agregado exitosamente",
          });

          // Elimina manualmente el backdrop
          document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
            backdrop.parentNode.removeChild(backdrop);
          });
          document.body.classList.remove("modal-open");
          document.body.style.paddingRight = "";
        })
        .catch((error) => {
          console.error("Error al agregar el diseño:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al agregar el diseño. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    prepararModificacion(diseno) {
      this.disenoActual = diseno;
    },
    modificarDiseno() {
      const formData = new FormData();
      formData.append("nombre", this.disenoActual.nombre);
      formData.append("descripcion", this.disenoActual.descripcion);
      formData.append("subcategoria", this.disenoActual.subcategoria);
      if (this.disenoActual.imagen instanceof File) {
        formData.append("imagen", this.disenoActual.imagen);
      } else {
        formData.append("url_imagen", this.disenoActual.imagen);
      }

      axios
        .put(`/api/disenos/${this.disenoActual.id}`, formData)
        .then(() => {
          const modal = document.getElementById("modalModificar");
          const bootstrapModal = Modal.getInstance(modal);
          bootstrapModal.hide();
          this.fetchDisenos(); // Vuelve a cargar la lista de diseños
          this.paginatedData = this.getPaginatedData(); // Actualiza la tabla
          Swal.fire("Modificado", "El diseño ha sido modificado.", "success");
        })
        .catch((error) => {
          console.error("Error al modificar el diseño:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al modificar el diseño. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    verDetalles(diseno) {
      this.disenoActual = diseno;
    },
    confirmarEliminar(disenoId) {
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
          this.eliminarDiseno(disenoId);
        }
      });
    },
    eliminarDiseno(disenoId) {
      axios
        .delete(`/api/disenos/${disenoId}`)
        .then(() => {
          const index = this.disenos.findIndex(
            (diseno) => diseno.id === disenoId
          );
          if (index !== -1) {
            this.disenos.splice(index, 1);
            this.paginatedData = this.getPaginatedData(); // Actualiza la tabla
            Swal.fire("Eliminado", "El diseño ha sido eliminado.", "success");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar el diseño:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar el diseño. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    resetModal() {
      this.nuevoDiseno = {
        nombre: "",
        descripcion: "",
        subcategoria: "",
        imagen: null,
      };
      const modal = document.getElementById("modalAgregar");
      const bootstrapModal = Modal.getInstance(modal);
      bootstrapModal.hide();
    },
  },
};
</script>

<style scoped>
@import "../../../assets/styles/components/sidebar.css";
@import "../../../assets/styles/views/sidebar/core/diseno.css";
</style>
