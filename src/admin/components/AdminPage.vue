<template>
  <div>
    <Sidebar />
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import { printAsciiArt } from "../utils/asciiArt";

export default {
  components: {
    Sidebar,
  },
  created() {
    printAsciiArt();
  },
};
</script>
