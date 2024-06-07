<template>
  <div class="container">
    <div class="content">
      <div class="left">
        <div class="bar__container">
          <ul class="bar" id="bar">
            <li :class="{ active: currentStep >= 1 }">Información</li>
            <li :class="{ active: currentStep >= 2 }">Envío</li>
            <li :class="{ active: currentStep >= 3 }">Pago</li>
          </ul>
        </div>
        <div v-if="currentStep === 1">
          <h3>Contacto</h3>
          <input type="email" v-model="contacto.email" placeholder="E-mail" />
          <input
            type="text"
            v-model="contacto.rut"
            placeholder="RUT"
            @input="
              contacto.rutFacturacion = formatRUT(contacto.rutFacturacion)
            "
            maxlength="12"
          />
          <p class="error-message">Este campo es requerido.</p>
          <h3>Entrega</h3>
          <div class="row">
            <div class="col-6">
              <input
                type="text"
                v-model="contacto.nombre"
                placeholder="Nombre"
              />
            </div>
            <div class="col-6">
              <input
                type="text"
                v-model="contacto.apellido"
                placeholder="Apellido"
              />
            </div>
            <div class="col-12">
              <input
                type="text"
                v-model="contacto.telefono"
                placeholder="Numero Telefono"
              />
            </div>
            <div class="col-12">
              <select
                v-model="contacto.region"
                @change="fetchComunas('contacto')"
              >
                <option value="" disabled>Seleccione Región</option>
                <option
                  v-for="region in regiones"
                  :key="region.region"
                  :value="region.region"
                >
                  {{ region.region }}
                </option>
              </select>
            </div>
            <div class="col-12">
              <select v-model="contacto.comuna">
                <option value="" disabled>Seleccione Comuna</option>
                <option
                  v-for="comuna in comunasContacto"
                  :key="comuna"
                  :value="comuna"
                >
                  {{ comuna }}
                </option>
              </select>
            </div>
            <div class="col-12">
              <input
                type="text"
                v-model="contacto.direccion"
                placeholder="Direccion"
              />
            </div>
            <div class="col-12">
              <input
                type="text"
                v-model="contacto.apartamento"
                placeholder="Casa ,apartamento, etc. (opcional)"
              />
            </div>
            <div class="col-12">
              <input
                type="text"
                v-model="contacto.numeracion"
                placeholder="Numeracion"
              />
            </div>
            <div class="col-12">
              <input
                type="text"
                v-model="contacto.instruccionesEspeciales"
                placeholder="Instrucciones especiales/Información adicional"
              />
            </div>
          </div>
          <button @click="nextStep" type="submit">Ir a Envío</button>
        </div>
        <div v-else-if="currentStep === 2">
          <h3>Información de Orden</h3>
          <div class="order-info">
            <div>
              <label>Contacto</label>
              <p>
                {{ contacto.email }}
                <a href="#" @click.prevent="prevStep">Editar</a>
              </p>
            </div>
            <div>
              <label>Enviar a</label>
              <p>
                {{ contacto.direccion }}
                <a href="#" @click.prevent="prevStep">Editar</a>
              </p>
            </div>
          </div>
          <h3>Método de Entrega</h3>
          <div class="metodo-entrega">
            <div>
              <input
                type="radio"
                id="entrega1"
                value="entrega1"
                v-model="metodoEntrega"
                @change="actualizarCostoEnvio(0)"
              />
              <label for="entrega1"
                >Entrega presencial (Av. Francisco Bilbao 1841, Providencia) de
                lunes a viernes. Te contactaremos para coordinar la entrega.
                $0</label
              >
            </div>
            <div>
              <input
                type="radio"
                id="entrega2"
                value="entrega2"
                v-model="metodoEntrega"
                @change="actualizarCostoEnvio(4900)"
              />
              <label for="entrega2"
                >Envío pagado Bluexpress-Regiones $4.900</label
              >
            </div>
            <div>
              <input
                type="radio"
                id="entrega3"
                value="entrega3"
                v-model="metodoEntrega"
                @change="actualizarCostoEnvio(0)"
              />
              <label for="entrega3">Envío por pagar Bluexpress $0</label>
            </div>
          </div>
          <button @click="nextStep" type="submit">Ir a Pago</button>
          <button @click="prevStep" type="button">Volver a Información</button>
        </div>
        <div v-else-if="currentStep === 3">
          <h3>Información de Orden</h3>
          <div class="order-info">
            <div>
              <label>Contacto</label>
              <p>
                {{ contacto.email }}
                <a href="#" @click.prevent="prevStep">Editar</a>
              </p>
            </div>
            <div>
              <label>Enviar a</label>
              <p>
                {{ contacto.direccion }}
                <a href="#" @click.prevent="prevStep">Editar</a>
              </p>
            </div>
            <div>
              <label>Método de envío</label>
              <p>
                {{ metodoEntregaText }}
                - {{ precioChileno(costoEnvio) }}
                <a href="#" @click.prevent="prevStep">Editar</a>
              </p>
            </div>
          </div>
          <h3>Productos en el Pedido</h3>
          <div
            v-for="producto in productosEnCarro"
            :key="producto.id"
            class="cart-item"
          >
            <img
              :src="
                producto.url_imagen
                  ? 'http://localhost:3000' + producto.url_imagen
                  : 'http://localhost:3000/uploads/productos/default.jpg'
              "
              :alt="producto.nombre"
              class="product-image"
            />
            <div class="item-details">
              <p>{{ producto.nombre }}</p>
              <p>{{ producto.cantidad }} unidad/es</p>
              <p>{{ precioChileno(producto.precio * producto.cantidad) }}</p>
            </div>
          </div>
          <h3>Métodos de pago</h3>
          <div class="metodos-pago">
            <div>
              <input
                type="radio"
                id="pago1"
                value="pago1"
                v-model="metodoPago"
              />
              <label for="pago1">
                Pago Manual (Transferencia Bancaria)
                <div>
                  <p>Dejotaprint Spa</p>
                  <p>77.807.896-1</p>
                  <p>Banco Bci</p>
                  <p>Cuenta Corriente</p>
                  <p>13760599</p>
                  <p>dejotaprint@gmail.com</p>
                </div>
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="pago2"
                value="transbank"
                v-model="metodoPago"
              />
              <label for="pago2"> Transbank </label>
            </div>
          </div>

          <h3>Dirección de Facturación</h3>
          <div>
            <input
              type="checkbox"
              id="facturacionIgual"
              v-model="facturacionIgual"
              @change="toggleFacturacion"
            />
            <label for="facturacionIgual"
              >Dirección de facturación igual a la de envío</label
            >
          </div>

          <div v-if="!facturacionIgual">
            <div class="row">
              <div class="col-6">
                <input
                  type="text"
                  v-model="factura.nombreFacturacion"
                  placeholder="Nombre"
                />
              </div>
              <div class="col-6">
                <input
                  type="text"
                  v-model="factura.apellidoFacturacion"
                  placeholder="Apellido"
                />
              </div>
              <div class="col-12">
                <input
                  type="text"
                  v-model="factura.rutFacturacion"
                  placeholder="RUT"
                />
              </div>
              <div class="col-12">
                <input
                  type="text"
                  v-model="factura.direccionFacturacion"
                  placeholder="Dirección"
                />
              </div>
              <div class="col-12">
                <input
                  type="text"
                  v-model="factura.correoFacturacion"
                  placeholder="Correo electrónico"
                />
              </div>
              <div class="col-12">
                <input
                  type="text"
                  v-model="factura.telefonoFacturacion"
                  placeholder="Teléfono (opcional)"
                />
              </div>
              <div class="col-12">
                <select
                  v-model="factura.regionFacturacion"
                  @change="fetchComunas('factura')"
                >
                  <option value="" disabled>Seleccione Región</option>
                  <option
                    v-for="region in regiones"
                    :key="region.region"
                    :value="region.region"
                  >
                    {{ region.region }}
                  </option>
                </select>
              </div>
              <div class="col-12">
                <select v-model="factura.comunaFacturacion">
                  <option value="" disabled>Seleccione Comuna</option>
                  <option
                    v-for="comuna in comunasFactura"
                    :key="comuna"
                    :value="comuna"
                  >
                    {{ comuna }}
                  </option>
                </select>
              </div>
              <div class="col-12">
                <input
                  type="text"
                  v-model="factura.giro"
                  placeholder="Giro (opcional)"
                />
              </div>
            </div>
          </div>

          <button @click="realizarPedido" type="submit">Realizar Pedido</button>
        </div>
      </div>
      <div class="right">
        <div class="cart-summary">
          <h3>Carro ({{ productosEnCarro.length }} artículo/s)</h3>
          <div
            v-for="producto in productosEnCarro"
            :key="producto.id"
            class="cart-item"
          >
            <img
              :src="
                producto.url_imagen
                  ? 'http://localhost:3000' + producto.url_imagen
                  : 'http://localhost:3000/uploads/productos/default.jpg'
              "
              :alt="producto.nombre"
              class="product-image"
            />
            <div class="item-details">
              <p>{{ producto.nombre }}</p>
              <p>{{ producto.cantidad }} unidad/es</p>
              <p>{{ precioChileno(producto.precio * producto.cantidad) }}</p>
            </div>
          </div>
          <a href="#" @click.prevent="volverCarro" class="edit-cart"
            >Editar carro</a
          >
        </div>
        <div class="order-summary">
          <h3>Resumen del pedido</h3>
          <p>Subtotal: {{ precioChileno(totalCarro) }}</p>
          <p>Costo de envío: {{ precioChileno(costoEnvio) }}</p>
          <p>Total: {{ precioChileno(totalCarro + costoEnvio) }}</p>
          <input type="text" placeholder="Código de descuento" />
          <button>APLICAR</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { regionesData } from "@/data/regiones";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      currentStep: 1,
      contacto: {
        email: "",
        rut: "",
        nombre: "",
        apellido: "",
        region: "",
        comuna: "",
        direccion: "",
        casa: "",
        numeracion: "",
        instruccionesEspeciales: "",
      },
      factura: {
        nombreFacturacion: "",
        apellidoFacturacion: "",
        rutFacturacion: "",
        direccionFacturacion: "",
        correoFacturacion: "",
        regionFacturacion: "",
        comunaFacturacion: "",
        telefonoFacturacion: "",
        giro: "",
      },
      regiones: regionesData.regiones,
      comunasContacto: [],
      comunasFactura: [],
      metodoEntrega: null,
      metodoPago: null,
      facturacionIgual: true,
    };
  },
  computed: {
    productosEnCarro() {
      return this.$store.state.carro;
    },
    totalCarro() {
      return this.productosEnCarro.reduce(
        (total, producto) => total + producto.precio * producto.cantidad,
        0
      );
    },
    costoEnvio() {
      return this.$store.state.costoEnvio;
    },
    precioChileno() {
      return (precio) =>
        "$ " + precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
  },
  methods: {
    fetchComunas(section) {
      let regionSeleccionada;
      if (section === "contacto") {
        regionSeleccionada = this.regiones.find(
          (region) => region.region === this.contacto.region
        );
        this.comunasContacto = regionSeleccionada
          ? regionSeleccionada.comunas
          : [];
      } else if (section === "factura") {
        regionSeleccionada = this.regiones.find(
          (region) => region.region === this.factura.regionFacturacion
        );
        this.comunasFactura = regionSeleccionada
          ? regionSeleccionada.comunas
          : [];
      }
    },
    validarDatosInformacion() {
      const { email, rut } = this.contacto;
      if (!email || !rut) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Por favor, complete todos los campos obligatorios en Información de contacto.",
        });
        return false;
      }
      return true;
    },
    validarMetodoEntrega() {
      if (!this.metodoEntrega) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Por favor, seleccione un método de entrega.",
        });
        return false;
      }
      return true;
    },
    nextStep() {
      if (this.currentStep === 1) {
        if (this.validarDatosInformacion()) {
          this.$store.commit("setContacto", this.contacto);
          this.currentStep++;
        }
      } else if (this.currentStep === 2) {
        if (this.validarMetodoEntrega()) {
          this.currentStep++;
        }
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    volverCarro() {
      this.$router.push({ name: "CarroCompras" });
    },
    actualizarCostoEnvio(costo) {
      this.$store.commit("setMetodoEntrega", {
        metodo: this.metodoEntrega,
        costo: costo,
      });
    },
    async realizarPedido() {
      if (this.metodoPago) {
        try {
          const pedidoData = {
            metodo_envio: this.metodoEntrega,
            costo_envio: this.costoEnvio,
            metodo_pago: this.metodoPago,
            total: this.totalCarro + this.costoEnvio,
            contacto: this.contacto,
            factura: this.facturacionIgual ? this.contacto : this.factura,
            productos: this.productosEnCarro.map((producto) => ({
              producto_id: producto.id,
              cantidad: producto.cantidad,
              precio: producto.precio,
            })),
          };

          console.log("Datos enviados al backend:", pedidoData);

          const response = await fetch("http://localhost:3000/api/pedidos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(pedidoData),
          });

          if (!response.ok) {
            throw new Error("Error al crear el pedido");
          }

          const result = await response.json();
          console.log("Pedido creado correctamente:", result);

          // Limpieza del Carro
          await fetch("/api/carro/limpiar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ session_id: this.$store.state.session_id }),
          });

          // Redirigir a la página de éxito con el pedidoId
          this.$router.push({ name: "Exito", params: { pedidoId: result.id } });
        } catch (error) {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error al procesar tu pedido.",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Por favor, seleccione un método de pago.",
        });
      }
    },

    formatRUT(rut) {
      if (!rut) return ""; // Verificación para evitar undefined o null
      let value = rut.replace(/\./g, "").replace(/-/g, "");
      if (value.length > 1) {
        value = value.slice(0, -1) + "-" + value.slice(-1);
      }
      if (value.length > 5) {
        value = value.slice(0, -5) + "." + value.slice(-5);
      }
      if (value.length > 9) {
        value = value.slice(0, -9) + "." + value.slice(-9);
      }
      return value;
    },
  },
  mounted() {
    this.contacto = this.$store.state.contacto;
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Montserrat);
* {
  box-sizing: border-box;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 100px;
}

.bar__container {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
}

.bar {
  counter-reset: step;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
}

.bar li {
  list-style-type: none;
  width: 30%;
  position: relative;
  text-align: center;
  font-size: 14px;
  color: #333;
}

.bar li:before {
  content: counter(step);
  counter-increment: step;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ddd;
  display: block;
  text-align: center;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  background-color: white;
}

.bar li:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background: #ddd;
  top: 15px;
  left: -50%;
  z-index: -1;
}

.bar li:first-child:after {
  content: none;
}

.bar li.active:before {
  background: #27ae60;
  border: 1px solid #89e5b0;
  color: white;
}

.bar li.active + li.active:after {
  background: #27ae60;
}

.content {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.left,
.right {
  flex: 1;
  margin: 0 10px;
}

.left {
  max-width: 60%;
}

.right {
  max-width: 35%;
}

.cart-summary,
.order-summary {
  background: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
}

.cart-item img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.item-details p {
  margin: 0;
}

.edit-cart {
  display: block;
  margin-top: 10px;
  color: #27ae60;
  text-decoration: none;
}

.edit-cart:hover {
  text-decoration: underline;
}

.required {
  border: 1px solid red;
}

.error-message {
  color: red;
  font-size: 12px;
  margin: 5px 0;
}

input[type="text"],
input[type="email"],
select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #1e8c4a;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.col-6 {
  flex: 0 0 50%;
  padding: 0 10px;
}

.col-12 {
  flex: 0 0 100%;
  padding: 0 10px;
}

.metodos-pago label {
  display: block;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
}

.metodos-pago input[type="radio"] {
  margin-right: 10px;
}

.order-info {
  margin-bottom: 20px;
}

.order-info div {
  margin-bottom: 10px;
}
</style>
