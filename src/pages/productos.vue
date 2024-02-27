<template>
  <div class="wrap">
    <h1>Escoge un producto</h1>
    <div class="store-wrapper">
      <div class="category_list">
        <a href="#" class="category_item" @click="filterCategory('all')"
          >Todo</a
        >
        <a
          href="#"
          class="category_item"
          @click="filterCategory('credenciales')"
          >Credenciales PVC</a
        >
        <a href="#" class="category_item" @click="filterCategory('lanyards')"
          >Lanyards Personalizados</a
        >
        <a href="#" class="category_item" @click="filterCategory('llaveros')"
          >Llaveros Personalizados</a
        >
        <a href="#" class="category_item" @click="filterCategory('tarjeta')"
          >Tarjeta Presentacion</a
        >
        <a href="#" class="category_item" @click="filterCategory('impresion')"
          >Impresion Fotografico</a
        >
      </div>
      <section class="products-list">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-item"
          :class="{ hidden: !product.visible }"
        >
          <img :src="product.image" :alt="product.name" />
          <a href="#">{{ product.name }}</a>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        "all",
        "credenciales",
        "lanyards",
        "llaveros",
        "tarjeta",
        "impresion",
      ],
      currentCategory: "all",
      products: [
        {
          id: 1,
          name: "Lanyards 1",
          category: "lanyards",
          image: "images/laptop_hp.jpg",
          visible: true,
        },
        {
          id: 2,
          name: "Llaveros 1",
          category: "llaveros",
          image: "images/laptop_toshiba.jpg",
          visible: true,
        },
        {
          id: 3,
          name: "Tarjeta 1",
          category: "tarjeta",
          image: "images/samsung_galaxy.jpg",
          visible: true,
        },
        {
          id: 4,
          name: "Tarjeta 2",
          category: "tarjeta",
          image: "images/iphone.jpg",
          visible: true,
        },
        {
          id: 5,
          name: "Impresion 1",
          category: "impresion",
          image: "images/pc_hp.jpg",
          visible: true,
        },
        {
          id: 6,
          name: "Lanyards 2",
          category: "lanyards",
          image: "images/pc_lenovo.jpg",
          visible: true,
        },
        {
          id: 7,
          name: "Impresion 2",
          category: "impresion",
          image: "images/monitor_asus.jpg",
          visible: true,
        },
        {
          id: 8,
          name: "Tarjeta 3",
          category: "tarjeta",
          image: "images/jbl.jpg",
          visible: true,
        },
        {
          id: 9,
          name: "Credenciales PVC 1",
          category: "credenciales",
          image: "images/jbl.jpg",
          visible: true,
        },
      ],
    };
  },
  methods: {
    filterCategory(category) {
      this.currentCategory = category;
      this.products.forEach((product) => {
        if (category === "all" || product.category === category) {
          product.visible = true;
        } else {
          product.visible = false;
        }
      });
    },
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        return (
          this.currentCategory === "all" ||
          product.category === this.currentCategory
        );
      });
    },
  },
};
</script>

<style>
@import "../assets/styles/pages/productos.css";

.hidden {
  display: none;
}
</style>
