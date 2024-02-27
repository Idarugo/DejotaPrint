<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">DejotaPrint</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/blog" class="nav-link">Blog</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/productos" class="nav-link"
              >Productos</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/servicios" class="nav-link"
              >Servicios</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/quien-somos" class="nav-link"
              >Quién Somos</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/contacto" class="nav-link">Contacto</router-link>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <i class="fas fa-shopping-cart me-1"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header bg-dark text-white">
      <h5 class="offcanvas-title" id="offcanvasRightLabel">Carro de Compra</h5>
      <button
        type="button"
        class="btn-close btn-close-white"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <ul class="list-group">
        <!-- Aquí puedes agregar los elementos del carro de compra -->
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          Producto 1
          <span class="badge bg-primary rounded-pill">2</span>
        </li>
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          Producto 2
          <span class="badge bg-primary rounded-pill">1</span>
        </li>
        <!-- Puedes agregar más productos según sea necesario -->
      </ul>
      <div class="fondo-carro">
        <div class="mt-3">
          <p class="fw-bold">Total:</p>
          <p>$150.00</p>
        </div>
        <div class="d-grid gap-2">
          <button class="btn btn-primary" type="button">Pagar</button>
          <button class="btn btn-outline-danger" type="button">
            Vaciar Carro
          </button>
        </div>
      </div>
    </div>
  </div>

  <router-view />
</template>

<script>
export default {};
</script>

<style>
@import "/src/assets/styles/components/header.css";
</style>