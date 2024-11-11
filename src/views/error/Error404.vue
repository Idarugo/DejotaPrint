<!-- Error404.vue -->
<template>
  <div
    class="container text-center d-flex flex-column justify-content-center align-items-center vh-100"
  >
    <div class="display-1">Error 404</div>
    <p class="lead">Oops, la página que estás buscando no se encuentra.</p>
    <div
      class="my-4"
      style="
        width: 150px;
        height: 150px;
        background: #e9ecef;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <span style="font-size: 24px">🙁</span>
    </div>
    <p>
      Serás redirigido a la página principal en
      <span id="countdown">{{ countdown }}</span> segundos.
    </p>
    <router-link to="/" class="btn mt-4"
      >Volver a la página principal</router-link
    >
  </div>
</template>
  
  <script>
export default {
  name: "Error404",
  beforeMount() {
    this.$store.dispatch("toggleHeaderFooter", false);
  },
  beforeUnmount() {
    // usar beforeUnmount en lugar de beforeDestroy en Vue 3
    this.$store.dispatch("toggleHeaderFooter", true);
  },
  data() {
    return {
      countdown: 5, // Número de segundos antes de redirigir
    };
  },
  mounted() {
    this.startCountdown();
  },
  methods: {
    startCountdown() {
      const interval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown -= 1;
        } else {
          clearInterval(interval);
          this.$router.push("/");
        }
      }, 1000);
    },
  },
};
</script>
  
  <style scoped>
.display-1 {
  font-size: 4rem;
}
.vh-100 {
  min-height: 100vh;
}

.btn {
  background: #212529;
  border: solid 2px #212529;
  border-radius: 4px;
  color: #fff;
  display: inline-block;
  margin-top: 20px;
  padding: 7px 45px;
  transition: all 0.5s ease-in-out 0s;
}
</style>
  