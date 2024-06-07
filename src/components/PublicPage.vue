<template>
  <div>
    <Header />
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
