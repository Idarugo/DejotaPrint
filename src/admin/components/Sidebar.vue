<template>
  <div v-if="isAuthenticated">
    <div class="menu" @click="toggleSidebar">
      <ion-icon name="menu-outline" v-if="!sidebarCollapsed"></ion-icon>
      <ion-icon name="close-outline" v-else></ion-icon>
    </div>

    <div
      class="barra-lateral"
      :class="{ 'mini-barra-lateral': sidebarCollapsed }"
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
                  >Productos</router-link
                >
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <ion-icon name="trending-down-outline"></ion-icon>
              <span>
                <router-link to="/admin/oferta" class="nav-link"
                  >Ofertas</router-link
                >
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <ion-icon name="cash-outline"></ion-icon>
              <span>
                <router-link to="/admin/cotizacion" class="nav-link"
                  >Cotizacion</router-link
                >
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <ion-icon name="happy-outline"></ion-icon>
              <span>
                <router-link to="/admin/resena" class="nav-link"
                  >Reseñas</router-link
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
              <ion-icon name="bag-check-outline"></ion-icon>
              <span>
                <router-link to="/admin/pedidos" class="nav-link"
                  >Pedidos</router-link
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
              <ion-icon name="cart-outline"></ion-icon>
              <span>
                <router-link to="/admin/diseno" class="nav-link"
                  >Diseños</router-link
                >
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <ion-icon name="document-attach-outline"></ion-icon>
              <span>
                <router-link to="/admin/plantillas" class="nav-link"
                  >Plantillas</router-link
                >
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <ion-icon name="pricetags-outline"></ion-icon>
              <span>
                <router-link to="/admin/descuentos" class="nav-link"
                  >Descuentos</router-link
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
                  <ion-icon name="film-outline"></ion-icon>
                  <span>
                    <router-link to="/admin/carrusel" class="nav-link"
                      >Carrusel</router-link
                    >
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="help-circle-outline"></ion-icon>
                  <span>
                    <router-link
                      to="/admin/preguntas-frecuentes"
                      class="nav-link"
                      >Preguntas Frecuentes</router-link
                    >
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="pricetags-outline"></ion-icon>
                  <span>
                    <router-link to="/admin/marcas" class="nav-link"
                      >Marcas</router-link
                    >
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="heart-circle-outline"></ion-icon>
                  <span>
                    <router-link to="/admin/resena" class="nav-link"
                      >Reseñas</router-link
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
                  <ion-icon name="call-outline"></ion-icon>
                  <span>
                    <router-link to="/admin/contacto" class="nav-link"
                      >Contacto</router-link
                    >
                  </span>
                </a>
              </li>
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
          <div class="info-usuario" v-if="trabajador">
            <div class="nombre-email">
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
</template>
<script>
import Swal from "sweetalert2";
import EventBus from "@/admin/services/eventBus";

export default {
  data() {
    return {
      darkMode: false,
      sidebarCollapsed: false,
      busqueda: "",
      trabajador: null,
      showOtros: false,
      isAuthenticated: false,
    };
  },
  created() {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    this.darkMode = isDarkMode;
    document.body.classList.toggle("dark-mode", isDarkMode);
    this.checkAuthentication();
    EventBus.on("trabajador-actualizado", this.actualizarTrabajador);
  },
  beforeUnmount() {
    EventBus.off("trabajador-actualizado", this.actualizarTrabajador);
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
    actualizarTrabajador(trabajador) {
      this.trabajador = trabajador;
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
      localStorage.removeItem("token");

      Swal.fire({
        icon: "success",
        title: "¡Se ha cerrado sesión exitosamente!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = "/";
      });
    },
    checkAuthentication() {
      const token = localStorage.getItem("token");
      if (token) {
        this.isAuthenticated = true;
        this.fetchUserData();
      } else {
        this.isAuthenticated = false;
        this.$router.push({ name: "admin-login" });
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/components/sidebar.css";

/* CSS adicional para el submenú */
.otros-submenu {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: none;
  left: 0;
  position: relative;
  top: 0;
  width: 100%;
  z-index: 2;
}

.navegacion > ul > li {
  position: relative;
}

.flecha-rotada {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}

.otros-submenu {
  display: block;
}
</style>
