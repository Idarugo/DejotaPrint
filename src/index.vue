<template>
  <!-- Carrusel -->
  <div
    id="carouselExampleControls"
    class="carousel slide"
    data-bs-ride="carousel"
  >
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="carrusel-1.jpg" class="d-block w-100" alt="Carrusel 1" />
      </div>
      <div class="carousel-item">
        <img src="carrusel-2.jpg" class="d-block w-100" alt="Carrusel 2" />
      </div>
      <div class="carousel-item">
        <img src="carrusel-3.jpg" class="d-block w-100" alt="Carrusel 3" />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleControls"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Anterior</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleControls"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Siguiente</span>
    </button>
  </div>

  <!-- Sección de Productos -->
  <div id="productos" class="container">
    <h2 class="section-title">Nuestros Productos</h2>
    <div class="row">
      <!-- Producto 1 -->
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card">
          <img src="producto-1.jpg" class="card-img-top" alt="Producto 1" />
          <div class="card-body">
            <h5 class="card-title">Producto 1</h5>
            <p class="card-text">Descripción del Producto 1.</p>
          </div>
        </div>
      </div>
      <!-- Producto 2 -->
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card">
          <img src="producto-2.jpg" class="card-img-top" alt="Producto 2" />
          <div class="card-body">
            <h5 class="card-title">Producto 2</h5>
            <p class="card-text">Descripción del Producto 2.</p>
          </div>
        </div>
      </div>
      <!-- Producto 3 -->
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card">
          <img src="producto-3.jpg" class="card-img-top" alt="Producto 3" />
          <div class="card-body">
            <h5 class="card-title">Producto 3</h5>
            <p class="card-text">Descripción del Producto 3.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Sección de Servicios -->
  <div id="servicios" class="container">
    <h2 class="section-title">Nuestros Servicios</h2>
    <div class="row">
      <!-- Servicio 1 -->
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card">
          <img src="servicio-1.jpg" class="card-img-top" alt="Servicio 1" />
          <div class="card-body">
            <h5 class="card-title">Servicio 1</h5>
            <p class="card-text">Descripción del Servicio 1.</p>
          </div>
        </div>
      </div>
      <!-- Servicio 2 -->
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card">
          <img src="servicio-2.jpg" class="card-img-top" alt="Servicio 2" />
          <div class="card-body">
            <h5 class="card-title">Servicio 2</h5>
            <p class="card-text">Descripción del Servicio 2.</p>
          </div>
        </div>
      </div>
      <!-- Servicio 3 -->
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card">
          <img src="servicio-3.jpg" class="card-img-top" alt="Servicio 3" />
          <div class="card-body">
            <h5 class="card-title">Servicio 3</h5>
            <p class="card-text">Descripción del Servicio 3.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
@import "./assets/styles/main.css";
</style>