<template>
  <main>
    <div class="container">
      <h1>Administrar Contactos</h1>
      <table>
        <!-- Encabezados de la tabla -->
        <tr>
          <th>Nombre</th>
          <th>Correo Electrónico</th>
          <th>Mensaje</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
        <!-- Filas de la tabla -->
        <tr v-for="contact in paginatedData" :key="contact.id">
          <td>{{ contact.nombre }}</td>
          <td>{{ contact.correo }}</td>
          <td>{{ contact.mensaje }}</td>
          <td>{{ new Date(contact.fecha).toLocaleDateString() }}</td>
          <td>
            <!-- Botón para ver detalles -->
            <button
              @click="verDetalles(contact)"
              class="btn btn-sm btn-info"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Ver Detalles
            </button>
            <!-- Botón para eliminar -->
            <button
              @click="confirmarEliminar(contact.id)"
              class="btn btn-sm btn-danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </table>
      <Pagination
        :currentPage="currentPage"
        :totalItems="contacts.length"
        :pageSize="pageSize"
        @page-changed="onPageChange"
      />
      <!-- Modal para ver detalles del contacto -->
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
                Detalles del Contacto
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
              <template v-if="contactoActual">
                <p><strong>Nombre:</strong> {{ contactoActual.nombre }}</p>
                <p>
                  <strong>Correo Electrónico:</strong>
                  {{ contactoActual.correo }}
                </p>
                <p><strong>Mensaje:</strong> {{ contactoActual.mensaje }}</p>
                <p>
                  <strong>Fecha:</strong>
                  {{ new Date(contactoActual.fecha).toLocaleDateString() }}
                </p>
              </template>
              <template v-else>
                <p>No se ha seleccionado ningún contacto.</p>
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
  name: "contactoAdmin",
  data() {
    return {
      contacts: [],
      modalTitle: "Detalles del Contacto",
      contactoActual: null,
      paginatedData: [],
      currentPage: 1,
      pageSize: 5,
    };
  },
  created() {
    this.fetchContactos();
  },
  watch: {
    contacts() {
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
      return this.contacts.slice(start, end);
    },
    fetchContactos() {
      axios
        .get("/api/contactos")
        .then((response) => {
          this.contacts = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los contactos:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener los contactos. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    verDetalles(contacto) {
      this.contactoActual = contacto;
    },

    confirmarEliminar(contactId) {
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
          this.eliminarContacto(contactId);
        }
      });
    },
    eliminarContacto(contactId) {
      axios
        .delete(`/api/contactos/${contactId}`)
        .then(() => {
          // Eliminar el contacto de la lista localmente
          const index = this.contacts.findIndex(
            (contact) => contact.id === contactId
          );
          if (index !== -1) {
            this.contacts.splice(index, 1);
            this.paginatedData = this.getPaginatedData();
            Swal.fire("Eliminado", "El contacto ha sido eliminado.", "success");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar el contacto:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar el contacto. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    resetModal() {
      this.contactoActual = null;
      this.$refs.myModalRef.hide();
    },
  },
};
</script>


<style scoped>
@import "../../../assets/styles/views/sidebar/otros/contacto.css";
</style>
