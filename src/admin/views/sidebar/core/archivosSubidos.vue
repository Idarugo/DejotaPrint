<template>
  <main>
    <div class="container">
      <h1>Archivos Subidos</h1>
      <table class="table table-bordered">
        <tr>
          <th>Producto ID</th>
          <th>Color</th>
          <th>Diseño</th>
          <th>Texto Personalizado</th>
          <th>Archivo</th>
          <th>Acciones</th>
        </tr>
        <tr v-for="archivo in archivosSubidos" :key="archivo.id">
          <td>{{ archivo.producto_id }}</td>
          <td>{{ archivo.color }}</td>
          <td>{{ archivo.diseño }}</td>
          <td>{{ archivo.texto_personalizado }}</td>
          <td>
            <a
              v-if="archivo.url_archivo"
              :href="`http://localhost:3000/${archivo.url_archivo}`"
              download
              class="btn btn-sm btn-primary"
            >
              Descargar
            </a>
            <button v-else @click="handleNoFile" class="btn btn-sm btn-warning">
              Sin Archivo
            </button>
          </td>
          <td>
            <button
              @click="confirmarEliminar(archivo.id)"
              class="btn btn-sm btn-danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </table>
    </div>
  </main>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "ArchivosSubidos",
  data() {
    return {
      archivosSubidos: [],
    };
  },
  created() {
    this.fetchArchivosSubidos();
  },
  methods: {
    fetchArchivosSubidos() {
      axios
        .get("/api/archivosSubidos")
        .then((response) => {
          this.archivosSubidos = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los archivos subidos:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener los archivos subidos. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
    handleNoFile() {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "No hay archivo subido para este item.",
      });
    },
    confirmarEliminar(archivoId) {
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
          this.eliminarArchivoSubido(archivoId);
        }
      });
    },
    eliminarArchivoSubido(archivoId) {
      axios
        .delete(`/api/archivosSubidos/${archivoId}`)
        .then(() => {
          this.archivosSubidos = this.archivosSubidos.filter(
            (archivo) => archivo.id !== archivoId
          );
          Swal.fire(
            "Eliminado",
            "El archivo ha sido eliminado correctamente.",
            "success"
          );
        })
        .catch((error) => {
          console.error("Error al eliminar el archivo subido:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar el archivo subido. Por favor, intenta de nuevo más tarde.",
          });
        });
    },
  },
};
</script>


<style scoped>
@import "../../../assets/styles/views/sidebar/core/archivosSubidos.css";
</style>
  