<template>
  <main>
    <div class="container">
      <h1>Panel de Control</h1>
      <div class="row">
        <div class="col-lg-6 mb-4">
          <div class="chart card bg-light dark-mode:bg-dark">
            <h2>Productos por Cantidad</h2>
            <bar-chart v-if="chartData" :data="chartData"></bar-chart>
          </div>
        </div>
        <div class="col-lg-6 mb-4">
          <div class="chart card bg-light">
            <h2>Ofertas Activas</h2>
            <line-chart
              v-if="offerChartData"
              :data="offerChartData"
            ></line-chart>
          </div>
        </div>
        <div class="col-lg-4 mb-4">
          <div class="chart card bg-light">
            <h2>Reseñas por Producto</h2>
            <pie-chart
              v-if="reviewChartData"
              :data="reviewChartData"
            ></pie-chart>
          </div>
        </div>
        <div class="col-lg-4 mb-4">
          <div class="chart card bg-light">
            <h2>Testimonios Recientes</h2>
            <ul class="lista">
              <li v-for="testimonial in testimonials" :key="testimonial.id">
                <p>{{ testimonial.mensaje }}</p>
                <p>
                  <strong>- {{ testimonial.nombre }}</strong>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-6 mb-4">
          <div class="chart card bg-light">
            <h2>Contactos Recientes</h2>
            <ul class="lista">
              <li v-for="contact in contacts" :key="contact.id">
                <p>{{ contact.mensaje }}</p>
                <p>
                  <strong>- {{ contact.nombre }} ({{ contact.correo }})</strong>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-6 mb-4">
          <div class="chart card bg-light">
            <h2>Lista de Trabajadores</h2>
            <ul class="lista">
              <li v-for="worker in workers" :key="worker.rut">
                <p>{{ worker.nombre }} {{ worker.apellido }}</p>
                <p>
                  <small>Posición: {{ worker.posicionNombre }}</small>
                </p>
                <p>
                  <small>Correo: {{ worker.correo }}</small>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-12 mb-4">
          <div class="chart card bg-light">
            <h2>Pedidos Recientes</h2>
            <ul class="lista">
              <li v-for="order in orders" :key="order.id">
                <p>Fecha: {{ order.fecha }}</p>
                <p>Método de Envío: {{ order.metodo_envio }}</p>
                <p>Método de Pago: {{ order.metodo_pago }}</p>
                <p>Total: {{ order.total }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { Bar, Line, Pie } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import axios from "axios";
Chart.register(...registerables);

export default {
  name: "AdminDashboard",
  components: {
    BarChart: Bar,
    LineChart: Line,
    PieChart: Pie,
  },
  data() {
    return {
      chartData: null,
      offerChartData: null,
      reviewChartData: null,
      testimonials: [],
      contacts: [],
      workers: [],
      orders: [], // Añadido para almacenar los datos de los pedidos
    };
  },
  mounted() {
    this.fetchData();
    this.setAutoRefresh();
  },
  methods: {
    async fetchData() {
      try {
        const [
          productResponse,
          offerResponse,
          reviewResponse,
          testimonialResponse,
          contactResponse,
          workerResponse,
          orderResponse, // Añadido para la solicitud de los pedidos
        ] = await Promise.all([
          axios.get("http://localhost:3000/api/productos"),
          axios.get("http://localhost:3000/api/ofertas"),
          axios.get("http://localhost:3000/api/resenas"),
          axios.get("http://localhost:3000/api/testimonios"),
          axios.get("http://localhost:3000/api/contactos"),
          axios.get("http://localhost:3000/api/trabajadores"),
          axios.get("http://localhost:3000/api/pedidos"), // Añadido para la solicitud de los pedidos
        ]);

        // Procesa los datos para el gráfico de productos
        this.chartData = {
          labels: productResponse.data.map((p) => p.nombre),
          datasets: [
            {
              label: "Cantidad",
              backgroundColor: "#f87979",
              data: productResponse.data.map((p) => p.cantidad),
            },
          ],
        };

        // Procesa los datos para el gráfico de ofertas
        const activeOffers = offerResponse.data.filter((o) => o.estado === 1);
        const offerDates = activeOffers.map((o) => o.fecha_inicio);
        const uniqueDates = [...new Set(offerDates)];
        const offerCounts = uniqueDates.map(
          (date) => activeOffers.filter((o) => o.fecha_inicio === date).length
        );

        this.offerChartData = {
          labels: uniqueDates,
          datasets: [
            {
              label: "Ofertas Activas",
              borderColor: "#42b983",
              data: offerCounts,
            },
          ],
        };

        // Procesa los datos para el gráfico de reseñas
        const reviewCounts = reviewResponse.data.reduce((acc, review) => {
          const productName = review.nombre_producto;
          if (!acc[productName]) {
            acc[productName] = 0;
          }
          acc[productName]++;
          return acc;
        }, {});

        this.reviewChartData = {
          labels: Object.keys(reviewCounts),
          datasets: [
            {
              label: "Reseñas",
              backgroundColor: ["#f87979", "#7acb6e", "#3498db"],
              data: Object.values(reviewCounts),
            },
          ],
        };

        // Procesa los datos para los testimonios
        this.testimonials = testimonialResponse.data.filter(
          (t) => t.estado === 1
        );

        // Procesa los datos para los contactos
        this.contacts = contactResponse.data;

        // Procesa los datos para los trabajadores
        this.workers = workerResponse.data.map((worker) => {
          const position = worker.posicion;
          const positionName = this.getPositionName(position);
          return {
            ...worker,
            posicionNombre: positionName,
          };
        });

        // Procesa los datos para los pedidos
        this.orders = orderResponse.data;
      } catch (error) {
        console.error("Error fetching data", error);
      }
    },
    setAutoRefresh() {
      setInterval(() => {
        this.fetchData();
      }, 10000);
    },
    getPositionName(positionId) {
      const positions = {
        1: "Manager",
        2: "Developer",
        3: "Designer",
      };
      return positions[positionId] || "Desconocido";
    },
  },
};
</script>


<style scoped>
@import "../assets/styles/views/principal.css";
@import "../assets/styles/components/sidebar.css";
</style>
