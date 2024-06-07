<template>
  <div class="exito-container">
    <h2>Gracias por su pedido</h2>
    <p>
      Se ha enviado un correo electrónico con el resumen de su pedido a:
      <strong>{{ contacto.email }}</strong>
    </p>
    <p>
      Si tiene alguna pregunta sobre su pedido envíenos un correo electrónico:
      <strong>dejotaprint@gmail.com</strong>
    </p>
    <h3>Pedido #{{ pedidoId }}</h3>
    <div class="estado-pago">
      <h4>Estado del Pago</h4>
      <p>
        Todavía queda un paso para finalizar este pedido. Realice el pago para
        finalizar el pedido.
      </p>
    </div>
    <div class="informacion-pago">
      <h4>Dejotaprint Spa</h4>
      <p>PUBLICIDAD Y DISEÑO PYH SpA</p>
      <p>77.807.896-1</p>
      <p>Banco Bci</p>
      <p>Cuenta corriente</p>
      <p>13760599</p>
      <p>dejotaprint@gmail.com</p>
    </div>
    <div class="informacion-envio">
      <h4>Información de Envío</h4>
      <p>Nombre: {{ contacto.nombre }}</p>
      <p>Dirección: {{ contacto.direccion }}</p>
      <p>Método: {{ metodoEntregaText }}</p>
    </div>
    <div class="informacion-facturacion">
      <h4>Información de Facturación</h4>
      <p>Nombre: {{ contacto.nombre }}</p>
      <p>Dirección: {{ contacto.direccion }}</p>
      <p>Método: Pago Manual (Transferencia Bancaria)</p>
    </div>
    <div class="resumen-pedido">
      <h4>Resumen del pedido</h4>
      <p>Subtotal: {{ precioChileno(totalCarro) }}</p>
      <p>Total: {{ precioChileno(totalCarro + costoEnvio) }}</p>
    </div>
    <button @click="volverAInicio">VOLVER Y SEGUIR COMPRANDO</button>
  </div>
</template>

<script>
export default {
  computed: {
    contacto() {
      return this.$store.state.contacto;
    },
    metodoEntrega() {
      return this.$store.state.metodoEntrega;
    },
    metodoEntregaText() {
      switch (this.metodoEntrega) {
        case "entrega1":
          return "Entrega presencial";
        case "entrega2":
          return "Envío pagado Bluexpress-Regiones";
        case "entrega3":
          return "Envío por pagar Bluexpress";
        default:
          return "";
      }
    },
    pedidoId() {
      return this.$route.params.pedidoId; // Obtener el ID del pedido desde los parámetros de la ruta
    },
    totalCarro() {
      return this.$store.state.carro.reduce((total, producto) => {
        return total + producto.precio * producto.cantidad;
      }, 0);
    },
    costoEnvio() {
      return this.$store.state.costoEnvio;
    },
    precioChileno() {
      return (precio) => {
        return "$ " + precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
    },
  },
  methods: {
    volverAInicio() {
      this.$router.push({ name: "Inicio" });
    },
  },
};
</script>

<style scoped>
.exito-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
  margin-bottom: 20px;
}
p {
  margin: 10px 0;
}
button {
  display: block;
  width: 100%;
  padding: 10px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}
button:hover {
  background: #1e8c4a;
}
.estado-pago,
.informacion-pago,
.informacion-envio,
.informacion-facturacion,
.resumen-pedido {
  margin: 20px 0;
  padding: 10px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
}
h3 {
  text-align: center;
}
h4 {
  margin-bottom: 10px;
}
</style>
