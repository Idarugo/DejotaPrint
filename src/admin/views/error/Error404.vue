<template>
  <div class="container text-center">
    <div class="mt-5">
      <div class="display-1">404</div>
      <p class="lead">Oops, la página que estás buscando no se encuentra.</p>
      <img src="ruta/a/tu/imagen.png" alt="Error 404" class="my-4" />
      <p>
        Serás redirigido a la página principal en
        <span id="countdown">{{ countdown }}</span> segundos.
      </p>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "Error404",
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
  font-size: 10rem;
}
</style>
  