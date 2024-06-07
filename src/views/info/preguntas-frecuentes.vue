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
      const response = await fetch("http://localhost:3000/api/cat_faq");
      this.categories = await response.json();
    },
    async fetchSubCategories() {
      const response = await fetch("http://localhost:3000/api/subcat_faq");
      this.subCategories = await response.json();
    },
    async fetchFaqs() {
      const response = await fetch("http://localhost:3000/api/faqs");
      this.faqs = await response.json();
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
    await Promise.all([
      this.fetchCategories(),
      this.fetchSubCategories(),
      this.fetchFaqs(),
    ]);
  },
};
</script>
  
  <style>
.faq-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.category {
  margin-bottom: 40px;
}

h2 {
  color: #2c3e50;
  border-bottom: 2px solid #2c3e50;
  padding-bottom: 5px;
  margin-bottom: 20px;
}

.subcategory {
  margin-left: 20px;
  margin-bottom: 30px;
}

h3 {
  color: #34495e;
  margin-bottom: 10px;
}

.faq-card {
  background: #ecf0f1;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h4 {
  color: #2c3e50;
  margin-bottom: 5px;
}

p {
  color: #7f8c8d;
}
</style>
  