<template>
  <footer class="custom-footer py-4 mt-3">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4 mb-3 mb-md-0">
          <h5>Contacto</h5>
          <ul class="list-unstyled">
            <li>Teléfono: +1 (555) 123-4567</li>
            <li>Email: info@lanyards.com</li>
            <li>Dirección: 123 Main St, Anytown USA</li>
          </ul>
        </div>
        <div class="col-12 col-md-4 mb-3 mb-md-0">
          <h5>Navegación</h5>
          <ul class="list-unstyled">
            <li>
              <router-link to="/productos" class="nav-link"
                >Productos</router-link
              >
            </li>
            <li>
              <router-link to="/galeria" class="nav-link">Galeria</router-link>
            </li>
            <li>
              <router-link to="/contacto" class="nav-link"
                >Contacto</router-link
              >
            </li>
          </ul>
        </div>
        <div class="col-12 col-md-4">
          <h5>Información</h5>
          <ul class="list-unstyled">
            <li>
              <router-link to="/preguntas-frecuentes" class="nav-link"
                >Preguntas Frecuentes</router-link
              >
            </li>
            <li>
              <router-link to="/envios-seguimiento" class="nav-link"
                >Envío y entrega</router-link
              >
            </li>
            <li>
              <router-link to="/garantia" class="nav-link"
                >Garantía</router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="text-center mt-4">
        Personaliza tus accesorios con tu logo, diseño o mensaje. Entrega rápida
        y calidad garantizada.
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.custom-footer {
  background-color: #f1f1f1; /* Color de fondo gris claro */
  padding-top: 20px;
  padding-bottom: 20px;
}

.custom-footer h5 {
  font-weight: bold;
}

.custom-footer ul {
  padding-left: 0;
}

.custom-footer li {
  list-style: none;
}

.custom-footer .nav-link {
  color: #000;
  text-decoration: none;
}

.custom-footer .nav-link:hover {
  text-decoration: underline;
}

.custom-footer .text-center {
  font-size: 0.9rem;
  color: #6c757d;
}

/* Estilos adicionales para móviles */
@media (max-width: 767.98px) {
  .custom-footer .row {
    text-align: center;
  }

  .custom-footer .col-12 {
    margin-bottom: 20px;
  }
}
</style>
