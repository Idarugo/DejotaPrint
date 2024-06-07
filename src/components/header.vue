<template>
  <header class="header">
    <nav class="navbar">
      <div class="logo">
        <a href="/"><img src="../assets/img/logo.png" alt="MiLogo" /></a>
      </div>
      <ul :class="['nav-links', { active: menuOpen }]">
        <li class="nav-item">
          <router-link to="/">Inicio</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/productos">Productos</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/quienes-somos">Sobre Nosotros</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contacto">Contacto</router-link>
        </li>
      </ul>
      <div class="menu-icon" @click="toggleMenu">
        <i :class="menuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
      </div>
    </nav>
  </header>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
  },
};
</script>

<style>
@import "/src/assets/styles/components/header.css";
</style>
