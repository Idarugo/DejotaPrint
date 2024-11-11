import { createStore } from "vuex";

const store = createStore({
  state: {
    isAdminAuthenticated: false,
    carro: [],
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
      telefonoFacturacion: "",
      giro: "",
    },
    metodoEntrega: null,
    costoEnvio: 0,
    showHeaderFooter: true,
    descuentoAplicado: 0, // Añadir aquí
  },
  mutations: {
    setAdminAuth(state, isAuthenticated) {
      state.isAdminAuthenticated = isAuthenticated;
    },
    agregarProductoAlCarro(state, producto) {
      const existingProductIndex = state.carro.findIndex(
        (item) => item.id === producto.id
      );
      if (existingProductIndex !== -1) {
        state.carro[existingProductIndex].cantidad += producto.cantidad;
      } else {
        state.carro.push(producto);
      }
    },
    eliminarProductoDelCarro(state, index) {
      state.carro.splice(index, 1);
    },
    vaciarCarro(state) {
      state.carro = [];
    },
    incrementarCantidadProducto(state, index) {
      if (state.carro[index].cantidad < state.carro[index].stock) {
        state.carro[index].cantidad++;
      }
    },
    decrementarCantidadProducto(state, index) {
      if (state.carro[index].cantidad > 1) {
        state.carro[index].cantidad--;
      }
    },
    setContacto(state, payload) {
      state.contacto = payload;
    },
    setFactura(state, payload) {
      state.factura = payload;
    },
    setMetodoEntrega(state, payload) {
      state.metodoEntrega = payload.metodo;
      state.costoEnvio = payload.costo;
    },
    setShowHeaderFooter(state, payload) {
      state.showHeaderFooter = payload;
    },
    setDescuento(state, payload) {
      state.descuentoAplicado = payload;
    },
  },
  actions: {
    toggleHeaderFooter({ commit }, payload) {
      commit("setShowHeaderFooter", payload);
    },
  },
  getters: {
    showHeaderFooter: (state) => state.showHeaderFooter,
    contacto: (state) => state.contacto,
    factura: (state) => state.factura,
    carro: (state) => state.carro,
    metodoEntrega: (state) => state.metodoEntrega,
    costoEnvio: (state) => state.costoEnvio,
    descuentoAplicado: (state) => state.descuentoAplicado,
  },
});

export default store;
