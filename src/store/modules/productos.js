import axios from "axios";

const state = {
  productos: [],
};

const getters = {
  getProductoPorId: (state) => (id) => {
    return state.productos.find((producto) => producto.id === id);
  },
};

const actions = {
  async fetchProductoPorId({ commit }, id) {
    try {
      const response = await axios.get(`/api/productos/${id}`);
      commit("SET_PRODUCTO", response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },
};

const mutations = {
  SET_PRODUCTO(state, producto) {
    const index = state.productos.findIndex((p) => p.id === producto.id);
    if (index !== -1) {
      state.productos.splice(index, 1, producto);
    } else {
      state.productos.push(producto);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
