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
          <p class="error-message" v-if="errors.email">
            Este campo es requerido y debe ser un correo válido.
          </p>
          <input
            type="text"
            v-model="contacto.rut"
            placeholder="RUT"
            @input="contacto.rut = formatRUT(contacto.rut)"
            maxlength="12"
          />
          <p class="error-message" v-if="errors.rut">
            Este campo es requerido y debe ser un RUT válido.
          </p>
          <h3>Entrega</h3>
          <div class="row">
            <div class="col-6">
              <input
                type="text"
                v-model="contacto.nombre"
                placeholder="Nombre"
              />
              <p class="error-message" v-if="errors.nombre">
                Este campo es requerido.
              </p>
            </div>
            <div class="col-6">
              <input
                type="text"
                v-model="contacto.apellido"
                placeholder="Apellido"
              />
              <p class="error-message" v-if="errors.apellido">
                Este campo es requerido.
              </p>
            </div>
            <div class="col-12">
              <input
                type="text"
                v-model="contacto.telefono"
                placeholder="Número Teléfono"
              />
              <p class="error-message" v-if="errors.telefono">
                Este campo es requerido.
              </p>
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
              <p class="error-message" v-if="errors.region">
                Este campo es requerido.
              </p>
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
              <p class="error-message" v-if="errors.comuna">
                Este campo es requerido.
              </p>
            </div>
            <div class="col-12">
              <input
                type="text"
                v-model="contacto.direccion"
                placeholder="Dirección"
              />
              <p class="error-message" v-if="errors.direccion">
                Este campo es requerido.
              </p>
            </div>
            <div class="col-12">
              <input
                type="text"
                v-model="contacto.apartamento"
                placeholder="Casa, apartamento, etc. (opcional)"
              />
            </div>
            <div class="col-12">
              <input
                type="text"
                v-model="contacto.numeracion"
                placeholder="Numeración"
              />
              <p class="error-message" v-if="errors.numeracion">
                Este campo es requerido.
              </p>
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
              <label for="entrega1">
                Entrega presencial (Av. Francisco Bilbao 1841, Providencia) de
                lunes a viernes. Te contactaremos para coordinar la entrega. $0
              </label>
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
          <p class="error-message" v-if="errors.metodoEntrega">
            Por favor, seleccione un método de entrega.
          </p>
          <button @click="nextStep" type="submit">Ir a Pago</button>
          <button @click="prevStep" type="button" class="mt-1">
            Volver a Información
          </button>
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
                {{ metodoEntregaText }} - {{ precioChileno(costoEnvio) }}
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
                <div class="pago-manual-info">
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
                <p class="error-message" v-if="errors.nombreFacturacion">
                  Este campo es requerido.
                </p>
              </div>
              <div class="col-6">
                <input
                  type="text"
                  v-model="factura.apellidoFacturacion"
                  placeholder="Apellido"
                />
                <p class="error-message" v-if="errors.apellidoFacturacion">
                  Este campo es requerido.
                </p>
              </div>
              <div class="col-12">
                <input
                  type="text"
                  v-model="factura.rutFacturacion"
                  placeholder="RUT"
                />
                <p class="error-message" v-if="errors.rutFacturacion">
                  Este campo es requerido y debe ser un RUT válido.
                </p>
              </div>
              <div class="col-12">
                <input
                  type="text"
                  v-model="factura.direccionFacturacion"
                  placeholder="Dirección"
                />
                <p class="error-message" v-if="errors.direccionFacturacion">
                  Este campo es requerido.
                </p>
              </div>
              <div class="col-12">
                <input
                  type="text"
                  v-model="factura.correoFacturacion"
                  placeholder="Correo electrónico"
                />
                <p class="error-message" v-if="errors.correoFacturacion">
                  Este campo es requerido y debe ser un correo válido.
                </p>
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
                <p class="error-message" v-if="errors.regionFacturacion">
                  Este campo es requerido.
                </p>
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
                <p class="error-message" v-if="errors.comunaFacturacion">
                  Este campo es requerido.
                </p>
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
          <p>IVA: {{ precioChileno(totalIva) }}</p>
          <p>Total con IVA: {{ precioChileno(totalCarroConIva) }}</p>
          <p>Costo de envío: {{ precioChileno(costoEnvio) }}</p>
          <p v-if="descuentoAplicado">
            Descuento: -{{ precioChileno(descuento) }}
          </p>
          <p>
            Total:
            {{ precioChileno(totalCarroConIva + costoEnvio - descuento) }}
          </p>
          <input
            type="text"
            v-model="codigoDescuento"
            placeholder="Código de descuento"
          />
          <button @click="aplicarDescuento">APLICAR</button>
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
        apartamento: "",
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
      errors: {
        email: false,
        rut: false,
        nombre: false,
        apellido: false,
        telefono: false,
        region: false,
        comuna: false,
        direccion: false,
        numeracion: false,
        metodoEntrega: false,
        nombreFacturacion: false,
        apellidoFacturacion: false,
        rutFacturacion: false,
        direccionFacturacion: false,
        correoFacturacion: false,
        regionFacturacion: false,
        comunaFacturacion: false,
      },
      codigoDescuento: "",
      descuento: 0,
      descuentoAplicado: false,
    };
  },
  computed: {
    productosEnCarro() {
      return this.$store.state.carro.map((producto) => ({
        ...producto,
        iva: producto.iva || 0, // Asegúrate de que cada producto tenga el campo 'iva'
      }));
    },
    totalCarro() {
      return this.productosEnCarro.reduce(
        (total, producto) => total + producto.precio * producto.cantidad,
        0
      );
    },
    totalIva() {
      return this.productosEnCarro.reduce(
        (total, producto) =>
          total + (producto.precio * producto.cantidad * producto.iva) / 100,
        0
      );
    },
    totalCarroConIva() {
      return this.totalCarro + this.totalIva;
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
    validarEmail(email) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
      return re.test(String(email).toLowerCase());
    },
    validarRUT(rut) {
      const re = /^\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]$/;
      return re.test(rut);
    },
    validarDatosInformacion() {
      const {
        email,
        rut,
        nombre,
        apellido,
        telefono,
        region,
        comuna,
        direccion,
        numeracion,
      } = this.contacto;
      this.errors.email = !email || !this.validarEmail(email);
      this.errors.rut = !rut || !this.validarRUT(rut);
      this.errors.nombre = !nombre;
      this.errors.apellido = !apellido;
      this.errors.telefono = !telefono;
      this.errors.region = !region;
      this.errors.comuna = !comuna;
      this.errors.direccion = !direccion;
      this.errors.numeracion = !numeracion;
      return (
        !this.errors.email &&
        !this.errors.rut &&
        !this.errors.nombre &&
        !this.errors.apellido &&
        !this.errors.telefono &&
        !this.errors.region &&
        !this.errors.comuna &&
        !this.errors.direccion &&
        !this.errors.numeracion
      );
    },
    validarDatosFacturacion() {
      const {
        nombreFacturacion,
        apellidoFacturacion,
        rutFacturacion,
        direccionFacturacion,
        correoFacturacion,
        regionFacturacion,
        comunaFacturacion,
      } = this.factura;
      this.errors.nombreFacturacion = !nombreFacturacion;
      this.errors.apellidoFacturacion = !apellidoFacturacion;
      this.errors.rutFacturacion =
        !rutFacturacion || !this.validarRUT(rutFacturacion);
      this.errors.direccionFacturacion = !direccionFacturacion;
      this.errors.correoFacturacion =
        !correoFacturacion || !this.validarEmail(correoFacturacion);
      this.errors.regionFacturacion = !regionFacturacion;
      this.errors.comunaFacturacion = !comunaFacturacion;
      return (
        !this.errors.nombreFacturacion &&
        !this.errors.apellidoFacturacion &&
        !this.errors.rutFacturacion &&
        !this.errors.direccionFacturacion &&
        !this.errors.correoFacturacion &&
        !this.errors.regionFacturacion &&
        !this.errors.comunaFacturacion
      );
    },
    validarMetodoEntrega() {
      this.errors.metodoEntrega = !this.metodoEntrega;
      return !this.errors.metodoEntrega;
    },
    validarProductosEnCarro() {
      return this.productosEnCarro.length > 0;
    },
    nextStep() {
      if (this.currentStep === 1) {
        if (this.validarDatosInformacion() && this.validarProductosEnCarro()) {
          this.$store.commit("setContacto", this.contacto);
          this.currentStep++;
        } else if (!this.validarProductosEnCarro()) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Debe tener al menos un producto en el carrito para continuar.",
          });
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
        if (!this.facturacionIgual && !this.validarDatosFacturacion()) {
          return;
        }

        Swal.fire({
          title: "Procesando pedido",
          text: "Por favor, espera...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          const pedidoData = {
            metodo_envio: this.metodoEntrega,
            costo_envio: this.costoEnvio,
            metodo_pago: this.metodoPago,
            total: this.totalCarroConIva + this.costoEnvio - this.descuento, // Asegúrate de restar el descuento aquí
            contacto: this.contacto,
            factura: this.facturacionIgual ? this.contacto : this.factura,
            productos: this.productosEnCarro.map((producto) => ({
              producto_id: producto.id,
              cantidad: producto.cantidad,
              precio: producto.precio,
              nombre: producto.nombre,
            })),
            descuentoAplicado: this.descuento, // Añadir aquí
          };

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

          await fetch("/api/carro/limpiar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ session_id: this.$store.state.session_id }),
          });

          Swal.fire({
            icon: "success",
            title: "Pedido realizado",
            text: "Tu pedido ha sido realizado con éxito.",
          });

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
    async aplicarDescuento() {
      try {
        const productosIds = this.productosEnCarro.map(
          (producto) => producto.id
        );
        const response = await fetch(
          `http://localhost:3000/api/descuentos/${
            this.codigoDescuento
          }?productos=${productosIds.join(",")}`
        );
        if (!response.ok) {
          throw new Error("Error al verificar el código de descuento");
        }
        const result = await response.json();
        if (result && result.descuento) {
          const descuento = (this.totalCarroConIva * result.descuento) / 100;
          this.descuento = descuento;
          this.descuentoAplicado = true;
          this.$store.commit("setDescuento", descuento);
          Swal.fire({
            icon: "success",
            title: "Descuento aplicado",
            text: `Se ha aplicado un descuento del ${Math.round(
              Number(result.descuento)
            )}%`,
          });
        } else {
          this.descuento = 0;
          this.descuentoAplicado = false;
          Swal.fire({
            icon: "error",
            title: "Código inválido",
            text: "El código de descuento ingresado no es válido o no aplicable a los productos seleccionados.",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al verificar el código de descuento.",
        });
      }
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
  position: relative;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  box-sizing: border-box;
}

.bar__container {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
}

.bar {
  counter-reset: step;
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
}

.bar li {
  list-style-type: none;
  position: relative;
  text-align: center;
  flex: 1;
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
  background: #000;
  border: 1px solid #ccc;
  color: white;
}

.bar li.active + li.active:after {
  background: #000;
}

.content {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.left,
.right {
  margin: 0 10px;
  width: 100%;
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

.product-image {
  margin: 0px;
}

.edit-cart {
  display: block;
  margin-top: 10px;
  color: #000;
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
  background-color: #f8f9fa;
  color: #495057;
}

button {
  padding: 10px 20px;
  background: #000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #333;
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

/* Estilos específicos para métodos de envío */
.metodo-entrega div,
.metodos-pago div {
  display: flex;
  margin-bottom: 10px;
}

.metodo-entrega input[type="radio"],
.metodos-pago input[type="radio"] {
  margin-right: 10px;
}

.metodo-entrega label,
.metodos-pago label {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px; /* Adjust margin for better alignment */
}

.metodo-entrega input[type="radio"]:checked + label,
.metodos-pago input[type="radio"]:checked + label {
  background: #f0f0f0;
  border-color: #333;
}

.metodos-pago .pago-manual-info {
  margin-left: 0; /* Remove left margin */
  margin-top: 10px; /* Add top margin */
  font-size: 14px;
  color: #555;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.order-info {
  margin-bottom: 20px;
}

.order-info div {
  margin-bottom: 10px;
}

/* Media Queries */
@media (min-width: 768px) {
  .content {
    flex-direction: row;
    justify-content: space-between;
  }

  .left {
    max-width: 60%;
  }

  .right {
    max-width: 35%;
  }
}

/* Media Queries */
@media (min-width: 768px) {
  .content {
    flex-direction: row;
    justify-content: space-between;
  }

  .left {
    max-width: 60%;
  }

  .right {
    max-width: 35%;
  }
}
</style>
