<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="prevPage">Anterior</a>
      </li>
      <li
        v-for="page in totalPages"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
      >
        <a class="page-link" href="#" @click.prevent="changePage(page)">{{
          page
        }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click.prevent="nextPage">Siguiente</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.pageSize);
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.$emit("page-changed", this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit("page-changed", this.currentPage + 1);
      }
    },
    changePage(page) {
      if (page !== this.currentPage) {
        this.$emit("page-changed", page);
      }
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  padding-left: 0;
  list-style: none;
  border-radius: 0.25rem;
}

.page-item {
  margin: 0 0.25rem;
}

.page-item.disabled .page-link {
  cursor: not-allowed;
  opacity: 0.5;
}

.page-item .page-link {
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  line-height: 1.25;
  color: white;
  background-color: #333;
  border: 1px solid #dee2e6;
  text-decoration: none;
}

.page-item .page-link:hover {
  z-index: 2;
  color: #666;
  text-decoration: none;
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.page-item.active .page-link {
  z-index: 1;
  color: #333;
  background-color: white;
  border-color: white;
}
</style>
