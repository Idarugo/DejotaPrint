<template>
  <main>
    <div class="container">
      <h1>Administrar Trabajadores</h1>
      <table>
        <!-- Encabezados de la tabla -->
        <tr>
          <th>Rut</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Correo</th>
          <th>Posición</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
        <!-- Filas de la tabla -->
        <tr v-for="trabajador in paginatedData" :key="trabajador.rut">
          <td>{{ trabajador.rut }}</td>
          <td>{{ trabajador.nombre }}</td>
          <td>{{ trabajador.apellido }}</td>
          <td>{{ trabajador.correo }}</td>
          <td>{{ trabajador.posicion }}</td>
          <td>{{ estadoTrabajador(trabajador.estado) }}</td>
          <td>
            <!-- Botón para ver detalles -->
            <button
              @click="verDetalles(trabajador)"
              class="btn btn-sm btn-info"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Ver Detalles
            </button>
            <!-- Botón para bloquear/desbloquear -->
            <button
              @click="
                cambiarEstado(trabajador.rut, trabajador.estado === 1 ? 0 : 1)
              "
              class="btn btn-sm btn-warning"
            >
              {{ trabajador.estado === 1 ? "Bloquear" : "Desbloquear" }}
            </button>
            <!-- Botón para eliminar -->
            <button
              @click="confirmarEliminar(trabajador.rut)"
              class="btn btn-sm btn-danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </table>
      <Pagination
        :currentPage="currentPage"
        :totalItems="trabajadors.length"
        :pageSize="pageSize"
        @page-changed="onPageChange"
      />
      <!-- Botón para abrir el modal de agregar trabajador -->
      <button
        @click="resetModal"
        class="btn btn-agregar"
        data-bs-toggle="modal"
        data-bs-target="#modalAgregar"
      >
        Agregar Trabajador
      </button>

      <!-- Modal para agregar nuevos trabajadores -->
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
                Agregar Trabajador
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!-- Formulario para agregar nuevo trabajador -->
              <form @submit.prevent="agregarTrabajador">
                <div class="mb-3">
                  <label for="rut" class="form-label">Rut</label>
                  <input
                    type="text"
                    class="form-control"
                    id="rut"
                    @input="formatRUT"
                    v-model="nuevoTrabajador.rut"
                    maxlength="12"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nombre"
                    v-model="nuevoTrabajador.nombre"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="apellido" class="form-label">Apellido</label>
                  <input
                    type="text"
                    class="form-control"
                    id="apellido"
                    v-model="nuevoTrabajador.apellido"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="correo" class="form-label">Correo</label>
                  <input
                    type="email"
                    class="form-control"
                    id="correo"
                    v-model="nuevoTrabajador.correo"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="posicion">Posición</label>
                  <select
                    v-model="nuevoTrabajador.posicion"
                    id="posicion"
                    class="form-select"
                    required
                  >
                    <option value="" disabled>Seleccione Posición</option>
                    <option
                      v-for="posicion in posiciones"
                      :key="posicion.id"
                      :value="posicion.id"
                    >
                      {{ posicion.posicion }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="telefono" class="form-label">Teléfono</label>
                  <input
                    type="text"
                    class="form-control"
                    id="telefono"
                    v-model="nuevoTrabajador.telefono"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Contraseña</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="nuevoTrabajador.password"
                    required
                  />
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-agregar">Agregar</button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal para ver detalles del trabajador -->
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
                Detalles del trabajador
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
              <template v-if="trabajadorActual">
                <p><strong>Nombre:</strong> {{ trabajadorActual.nombre }}</p>
                <p>
                  <strong>Apellido:</strong> {{ trabajadorActual.apellido }}
                </p>
                <p>
                  <strong>Teléfono:</strong> {{ trabajadorActual.telefono }}
                </p>
                <p>
                  <strong>Correo Electrónico:</strong>
                  {{ trabajadorActual.correo }}
                </p>
                <p>
                  <strong>Posición:</strong> {{ trabajadorActual.posicion }}
                </p>
                <p><strong>Estado:</strong> {{ trabajadorActual.estado }}</p>
              </template>
              <template v-else>
                <p>No se ha seleccionado ningún trabajador.</p>
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
import { Modal } from "bootstrap";

export default {
  components: { Pagination },
  name: "trabajadorAdmin",
  data() {
    return {
      trabajadors: [],
      posiciones: [], // Variable para almacenar posiciones
      trabajadorActual: null, // Variable para almacenar el trabajador actual
      nuevoTrabajador: {
        rut: "",
        nombre: "",
        apellido: "",
        telefono: "",
        correo: "",
        posicion: "",
        estado: 1,
        password: "",
      },
      paginatedData: [],
      currentPage: 1,
      pageSize: 5,
    };
  },
  created() {
    this.fetchTrabajadores();
    this.fetchPosiciones();
  },
  watch: {
    trabajadors() {
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
      return this.trabajadors.slice(start, end);
    },
    fetchTrabajadores() {
      axios
        .get("/api/trabajadores")
        .then((response) => {
          this.trabajadors = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los trabajadores:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener los trabajadores. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    async fetchPosiciones() {
      try {
        const response = await axios.get("/api/posicions");
        this.posiciones = response.data;
      } catch (error) {
        console.error("Error al obtener las posiciones:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al obtener las posiciones. Por favor, intenta de nuevo más tarde.",
        });
      }
    },
    verDetalles(trabajador) {
      this.trabajadorActual = trabajador;
    },
    confirmarEliminar(trabajadorRut) {
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
          this.eliminarTrabajador(trabajadorRut);
        }
      });
    },
    eliminarTrabajador(trabajadorRut) {
      axios
        .delete(`/api/trabajadores/${trabajadorRut}`)
        .then(() => {
          // Eliminar el trabajador de la lista localmente
          const index = this.trabajadors.findIndex(
            (trabajador) => trabajador.rut === trabajadorRut
          );
          if (index !== -1) {
            this.trabajadors.splice(index, 1);
            this.paginatedData = this.getPaginatedData();
            Swal.fire(
              "Eliminado",
              "El trabajador ha sido eliminado.",
              "success"
            );
          }
        })
        .catch((error) => {
          console.error("Error al eliminar el trabajador:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar el trabajador. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    resetModal() {
      this.trabajadorActual = null;
      this.nuevoTrabajador = {
        rut: "",
        nombre: "",
        apellido: "",
        telefono: "",
        correo: "",
        posicion: "",
        estado: 1,
        password: "",
      };
      const modalElement = document.getElementById("modalAgregar");
      const modal = Modal.getOrCreateInstance(modalElement);
      modal.hide();
    },
    agregarTrabajador() {
      axios
        .post("/api/trabajadores", this.nuevoTrabajador)
        .then((response) => {
          const nuevoTrabajador = {
            ...this.nuevoTrabajador,
            rut: response.data.rut,
          };
          this.trabajadors.push(nuevoTrabajador);
          this.resetModal();
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Trabajador agregado exitosamente",
          });

          // Elimina manualmente el backdrop
          document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
            backdrop.parentNode.removeChild(backdrop);
          });
          document.body.classList.remove("modal-open");
          document.body.style.paddingRight = "";
        })
        .catch((error) => {
          console.error("Error al agregar el trabajador:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al agregar el trabajador. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    formatRUT(event) {
      let value = event.target.value.replace(/\./g, "").replace(/-/g, "");
      if (value.length > 1) {
        value = value.slice(0, -1) + "-" + value.slice(-1);
      }
      if (value.length > 5) {
        value = value.slice(0, -5) + "." + value.slice(-5);
      }
      if (value.length > 9) {
        value = value.slice(0, -9) + "." + value.slice(-9);
      }
      this.nuevoTrabajador.rut = value;
    },
    estadoTrabajador(estado) {
      return estado === 1 ? "Habilitado" : "Deshabilitado";
    },
    cambiarEstado(trabajadoreRut, nuevoEstado) {
      axios
        .put(`/api/trabajadores/${trabajadoreRut}/estado`, {
          estado: nuevoEstado,
        })
        .then(() => {
          // Actualizar el estado del trabajador localmente
          const trabajador = this.trabajadors.find(
            (t) => t.rut === trabajadoreRut
          );
          if (trabajador) {
            trabajador.estado = nuevoEstado;
          }
          Swal.fire(
            "Estado actualizado",
            "El estado del trabajador ha sido actualizado correctamente.",
            "success"
          );
        })
        .catch((error) => {
          console.error("Error al actualizar el estado del trabajador:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al actualizar el estado del trabajador. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
  },
};
</script>

<style scoped>
@import "../../../assets/styles/views/sidebar/core/trabajadore.css";
</style>
