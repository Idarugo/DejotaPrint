<template>
  <div class="faq-container">
    <h1>Preguntas Frecuentes</h1>
    <div v-for="category in categories" :key="category.id" class="category">
      <h2>{{ category.nombre }}</h2>
      <div
        v-for="subCategory in getSubCategories(category.id)"
        :key="subCategory.id"
        class="subcategory"
      >
        <h3>{{ subCategory.nombre }}</h3>
        <div
          v-for="faq in getFaqs(subCategory.id)"
          :key="faq.id"
          class="faq-card"
        >
          <h4>{{ faq.pregunta }}</h4>
          <p>{{ faq.respuesta }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      subCategories: [],
      faqs: [],
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await fetch("http://localhost:3000/api/cat_faq");
        if (!response.ok) throw new Error("Error fetching categories");
        this.categories = await response.json();
        console.log("Categories:", this.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async fetchSubCategories() {
      try {
        const response = await fetch("http://localhost:3000/api/subcat_faq");
        if (!response.ok) throw new Error("Error fetching subcategories");
        this.subCategories = await response.json();
        console.log("SubCategories:", this.subCategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    },
    async fetchFaqs() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/faqs/preguntas-frecuentes"
        );
        if (!response.ok) throw new Error("Error fetching FAQs");
        this.faqs = await response.json();
        console.log("FAQs:", this.faqs);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    },
    getSubCategories(categoryId) {
      return this.subCategories.filter(
        (subCat) => subCat.categoria === categoryId
      );
    },
    getFaqs(subCategoryId) {
      return this.faqs.filter((faq) => faq.subcat_id === subCategoryId);
    },
  },
  async mounted() {
    try {
      await Promise.all([
        this.fetchCategories(),
        this.fetchSubCategories(),
        this.fetchFaqs(),
      ]);
    } catch (error) {
      console.error("Error during mounted lifecycle:", error);
    }
  },
};
</script>

<style scoped>
@import "../../assets/styles/views/info/preguntas-frecuentes.css";
</style>
