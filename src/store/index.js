import { createStore } from "vuex";

export default createStore({
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
        // El producto ya existe en el carro, actualiza la cantidad
        state.carro[existingProductIndex].cantidad += producto.cantidad;
      } else {
        // El producto no existe en el carro, agrégalo completo
        state.carro.push(producto);
      }
    },
    eliminarProductoDelCarro(state, index) {
      state.carro.splice(index, 1);
    },
    vaciarCarro(state) {
      state.carro = [];
    },
    setContacto(state, payload) {
      state.contacto = payload;
    },
    setMetodoEntrega(state, payload) {
      state.metodoEntrega = payload.metodo;
      state.costoEnvio = payload.costo;
    },
  },
});
