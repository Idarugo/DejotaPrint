<template>
  <div class="page-container">
    <Header />
    <div class="content-wrapper"></div>
    <Footer />
    <WhatApp />
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import WhatApp from "@/components/whatapp.vue";

export default {
  components: {
    Header,
    Footer,
    WhatApp,
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrapper {
  flex: 1;
}
</style>
