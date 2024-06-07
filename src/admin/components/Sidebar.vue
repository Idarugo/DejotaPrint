<template>
  <div>
    <div class="menu" @click="toggleSidebar">
      <ion-icon name="menu-outline" v-if="!sidebarCollapsed"></ion-icon>
      <ion-icon name="close-outline" v-else></ion-icon>
    </div>

    <div
      class="barra-lateral"
      :class="{ 'max-barra-lateral': sidebarCollapsed }"
    >
      <div>
        <div class="nombre-pagina">
          <ion-icon
            id="cloud"
            name="custom-icon"
            class="custom-icon"
            @click="toggleSidebar"
          ></ion-icon>
          <span>Administrador</span>
        </div>
        <div class="boton">
          <ion-icon class="lupa" name="search-outline"></ion-icon>
          <input
            class="buscar"
            type="text"
            placeholder="Buscar...."
            v-model="busqueda"
            @input="filtrarLista"
          />
        </div>
      </div>

      <nav class="navegacion">
        <ul class="listado">
          <li>
            <a id="inbox" href="#">
              <ion-icon name="stats-chart-outline"></ion-icon>
              <span>
                <router-link to="/admin/principal" class="nav-link"
                  >Principal</router-link
                >
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <ion-icon name="cart-outline"></ion-icon>
              <span>
                <router-link to="/admin/producto" class="nav-link"
                  >Producto</router-link
                >
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <ion-icon name="trending-down-outline"></ion-icon>
              <span>
                <router-link to="/admin/oferta" class="nav-link"
                  >Oferta</router-link
                >
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <ion-icon name="happy-outline"></ion-icon>
              <span>
                <router-link to="/admin/resena" class="nav-link"
                  >Reseña</router-link
                >
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <ion-icon name="calendar-outline"></ion-icon>
              <span>
                <router-link to="/admin/horario" class="nav-link"
                  >Horario</router-link
                >
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <ion-icon name="image-outline"></ion-icon>
              <span>
                <router-link to="/admin/imagenProducto" class="nav-link"
                  >Imagen Producto</router-link
                >
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <ion-icon name="chatbubbles-outline"></ion-icon>
              <span>
                <router-link to="/admin/testimonios" class="nav-link"
                  >Testimonios</router-link
                >
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <ion-icon name="person-outline"></ion-icon>
              <span>
                <router-link to="/admin/trabajadore" class="nav-link"
                  >Trabajadores</router-link
                >
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <ion-icon name="call-outline"></ion-icon>
              <span>
                <router-link to="/admin/contacto" class="nav-link"
                  >Contacto</router-link
                >
              </span>
            </a>
          </li>
          <li @click="toggleOtros" class="otros-item">
            <a href="#">
              <ion-icon
                :class="{ 'flecha-rotada': showOtros }"
                name="chevron-down-outline"
              ></ion-icon>
              <span>Otros</span>
            </a>
            <ul class="otros-submenu" v-show="showOtros">
              <li>
                <a href="#">
                  <span>
                    <router-link to="/admin/plantillas" class="nav-link"
                      >Plantillas</router-link
                    >
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>
                    <router-link to="/admin/carrusel" class="nav-link"
                      >Carrusel</router-link
                    >
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>
                    <router-link
                      to="/admin/preguntas-frecuentes"
                      class="nav-link"
                      >Preguntas Frecuentes</router-link
                    >
                  </span>
                </a>
              </li>

              <!-- Agrega más rutas aquí según sea necesario -->
            </ul>
          </li>
          <li class="cerrar-sesion">
            <a @click="volverInicio">
              <ion-icon name="log-out-outline"></ion-icon>
              <span>Volver Inicio</span>
            </a>
          </li>
        </ul>
      </nav>

      <div>
        <div class="linea"></div>

        <div class="modo-oscuro" @click="toggleDarkMode">
          <div class="info">
            <ion-icon name="moon-outline"></ion-icon>
            <span>Modo Noche</span>
          </div>
          <div class="switch">
            <div class="base">
              <div class="circulo" :class="{ prendido: darkMode }"></div>
            </div>
          </div>
        </div>

        <div class="usuario">
          <img src="../assets/img/usuario.png" alt="Imagen de usuario" />
          <div class="info-usuario">
            <div class="nombre-email" v-if="trabajador">
              <span class="nombre">{{ trabajador.nombre }}</span>
              <span class="email">{{ trabajador.correo }}</span>
            </div>
            <router-link to="/admin/informacion-personal" class="nav-link">
              <ion-icon name="ellipsis-vertical-outline"></ion-icon>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <router-view />
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "SidebarAdmin",
  data() {
    return {
      darkMode: false,
      sidebarCollapsed: false,
      busqueda: "",
      trabajador: null,
      showOtros: false, // Nueva propiedad para controlar el submenú
    };
  },
  created() {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    this.darkMode = isDarkMode;
    document.body.classList.toggle("dark-mode", isDarkMode);
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/trabajadores/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          this.trabajador = await response.json();
        } else {
          console.error("Error al obtener los datos del usuario");
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    },
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      document.body.classList.toggle("dark-mode", this.darkMode);
      localStorage.setItem("darkMode", this.darkMode.toString());
    },
    filtrarLista() {
      const listaItems = document.querySelectorAll(".navegacion li");
      const busqueda = this.busqueda.toLowerCase();
      listaItems.forEach((item) => {
        const textoItem = item.textContent.toLowerCase();
        if (textoItem.includes(busqueda)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    },
    toggleOtros() {
      this.showOtros = !this.showOtros;
    },
    volverInicio() {
      // Eliminar el token del almacenamiento local
      localStorage.removeItem("token");

      // Mostrar SweetAlert de confirmación
      Swal.fire({
        icon: "success",
        title: "¡Se ha cerrado sesión exitosamente!",
        showConfirmButton: false,
        timer: 1500, // Cerrar automáticamente después de 1.5 segundos
      }).then(() => {
        // Forzar recarga completa de la página
        window.location.href = "/";
      });
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/components/sidebar.css";

/* CSS adicional para el submenú */
.otros-submenu {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Agrega sombra para estilo */
  display: none;
  left: 0;
  position: relative;
  top: 0; /* Ajusta la distancia vertical */
  width: 100%;
  z-index: 2; /* Asegúrate de que el submenú esté sobre otros elementos */
}

.navegacion > ul > li {
  position: relative;
}

.flecha-rotada {
  transform: rotate(180deg); /* Rota la flecha */
  transition: transform 0.3s ease; /* Agrega una transición suave */
}

/* Estilo para mostrar el submenú cuando se activa */
.otros-submenu {
  display: block;
}
</style>
