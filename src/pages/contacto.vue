<template>
  <h1 class="text-center mt-3">Contactenos</h1>

  <div id="app" class="container mt-5">
    <div class="row">
      <!-- Lado del Formulario de Contacto -->
      <div class="col-md-6">
        <h2 class="text-center">Comunícate con nosotros</h2>
        <form>
          <div class="form-group">
            <label for="name">Nombre y Apellido (*)</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="name"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              required
            />
          </div>
          <div class="form-group">
            <label for="phone">Celular</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              v-model="phone"
            />
          </div>
          <div class="form-group">
            <label for="company">Empresa y Rut (opcional)</label>
            <input
              type="text"
              class="form-control"
              id="company"
              v-model="company"
            />
          </div>
          <div class="form-group">
            <label for="message">Mensaje</label>
            <textarea
              class="form-control"
              id="message"
              rows="5"
              v-model="message"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
        </form>
      </div>

      <!-- Lado de los Datos de Contacto -->
      <div class="col-md-6">
        <h2>Datos de Contacto</h2>
        <p><strong>Correo de ventas:</strong></p>
        <p><strong>Teléfono Ventas:</strong></p>
        <p>
          <strong>Dirección:</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
@import "../assets/styles/pages/contacto.css";
</style>