<template>
  <section class="w-full py-12 md:py-24 lg:py-32">
    <div class="container">
      <div class="row mb-4 justify-content-center">
        <!-- Selección de Producto -->
        <div class="col-md-4">
          <h2 class="text-2xl font-bold text-center">Elige tu producto</h2>
          <select
            v-model="selectedProduct"
            class="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            :class="{ 'text-gray-500': !selectedProduct }"
            @change="updateMinQuantity"
          >
            <option value="" disabled>Seleccione un producto</option>
            <option
              v-for="(name, code) in productNames"
              :key="code"
              :value="code"
            >
              {{ name }}
            </option>
          </select>
        </div>
        <!-- Selección de Color -->
        <div class="col-md-4 mb-4">
          <h2 class="text-2xl font-bold text-center">Elige el color</h2>
          <div
            class="btn-group btn-group-toggle d-flex justify-content-center"
            data-toggle="buttons"
          >
            <label
              :class="[
                selectedColor === 'Negro'
                  ? 'btn-dark active'
                  : 'btn-outline-dark',
                'btn btn-color',
              ]"
              @click="handleColorChange('Negro')"
            >
              Negro
            </label>
            <label
              :class="[
                selectedColor === 'Azul'
                  ? 'btn-primary active'
                  : 'btn-outline-primary',
                'btn btn-color',
              ]"
              @click="handleColorChange('Azul')"
            >
              Azul
            </label>
            <label
              :class="[
                selectedColor === 'Rojo'
                  ? 'btn-danger active'
                  : 'btn-outline-danger',
                'btn btn-color',
              ]"
              @click="handleColorChange('Rojo')"
            >
              Rojo
            </label>
          </div>
        </div>
        <!-- Selección de Diseño -->
        <div class="col-md-4 mb-4">
          <h2 class="text-2xl font-bold text-center">Elige el diseño</h2>
          <div
            class="btn-group btn-group-toggle d-flex justify-content-center"
            data-toggle="buttons"
          >
            <label
              :class="[
                selectedDesign === 'Liso'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary',
                'btn-diseno',
              ]"
              @click="handleDesignChange('Liso')"
            >
              Liso
            </label>
            <label
              :class="[
                selectedDesign === 'Con logo'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary',
                'btn-diseno',
              ]"
              @click="handleDesignChange('Con logo')"
            >
              Con logo
            </label>
            <label
              :class="[
                selectedDesign === 'Con texto'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary',
                'btn-diseno',
              ]"
              @click="handleDesignChange('Con texto')"
            >
              Con texto
            </label>
          </div>
        </div>
      </div>
      <!-- Precios y Unidades -->
      <div v-if="selectedProduct" class="row mb-4">
        <div class="col-md-12">
          <h2 class="text-2xl font-bold text-center">Precios y Unidades</h2>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Unidades</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="price in productPrices[selectedProduct]"
                  :key="price.unit"
                >
                  <td>{{ productNames[selectedProduct] }}</td>
                  <td>{{ precioChileno(price.price) }}</td>
                  <td>{{ price.unit }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Cantidad y Personalización -->
      <div class="row mb-4">
        <div class="col-md-6">
          <h2 class="text-2xl font-bold">Cantidad</h2>
          <input
            type="number"
            v-model.number="quantity"
            class="form-control"
            placeholder="Ingresa la cantidad"
            @input="validateQuantity"
          />
        </div>
        <div class="col-md-6" v-if="selectedDesign === 'Con texto'">
          <h2 class="text-2xl font-bold">Agrega texto personalizado</h2>
          <input
            v-model="customText"
            placeholder="Ingresa tu texto"
            class="form-control"
          />
        </div>
        <div class="col-md-6" v-if="selectedDesign === 'Con logo'">
          <h2 class="text-2xl font-bold">Agrega un logo personalizado</h2>
          <div class="d-flex align-items-center">
            <img
              v-if="customLogo"
              :src="customLogo"
              alt="Custom Logo"
              class="img-thumbnail"
              width="100"
              height="100"
            />
            <div
              v-else
              class="bg-light border d-flex align-items-center justify-content-center"
              style="width: 100px; height: 100px"
            >
              <i class="fas fa-upload text-muted"></i>
            </div>
            <input
              type="file"
              accept="image/*"
              @change="handleLogoChange"
              class="ml-3"
            />
          </div>
        </div>
      </div>
      <!-- Previsualización y Resumen -->
      <div class="row mb-4">
        <div class="col-md-6">
          <h2 class="text-2xl font-bold">Previsualización</h2>
          <div
            class="d-flex justify-content-center bg-light border rounded p-4 position-relative"
            style="height: 300px"
          >
            <img
              v-if="selectedProduct && selectedColor"
              :src="getProductImage(selectedProduct, selectedColor)"
              :alt="productNames[selectedProduct]"
              class="img-fluid"
              style="max-height: 100%"
            />
            <div
              v-if="selectedDesign === 'Con texto' && customText"
              class="position-absolute"
              style="bottom: 10px; color: white; font-size: 16px"
            >
              {{ customText }}
            </div>
            <img
              v-if="selectedDesign === 'Con logo' && customLogo"
              :src="customLogo"
              alt="Custom Logo"
              class="position-absolute"
              style="bottom: 10px; max-width: 50px; max-height: 50px"
            />
          </div>
        </div>
        <div class="col-md-6">
          <h2 class="text-2xl font-bold">Resumen</h2>
          <div class="border rounded p-3">
            <p>
              <strong>Producto:</strong> {{ productNames[selectedProduct] }}
            </p>
            <p><strong>Color:</strong> {{ selectedColor }}</p>
            <p><strong>Diseño:</strong> {{ selectedDesign }}</p>
            <p v-if="selectedDesign === 'Con texto'">
              <strong>Texto:</strong> {{ customText }}
            </p>
            <p v-if="selectedDesign === 'Con logo'">
              <strong>Logo:</strong>
              {{ customLogo ? "Personalizado" : "Sin logo" }}
            </p>
            <p><strong>Cantidad:</strong> {{ quantity }}</p>
            <p>
              <strong>Precio Unitario:</strong>
              {{ precioChileno(calculatePrice()) }}
            </p>
            <p>
              <strong>Precio Total:</strong>
              {{ precioChileno(calculateTotalPrice()) }}
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <button
            @click="handleAddToCart"
            class="btn btn-dark btn-lg btn-block"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Swal from "sweetalert2";

export default {
  computed: {
    precioChileno() {
      return (precio) => {
        return "$" + precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
    },
  },
  setup() {
    const selectedProduct = ref(null);
    const selectedColor = ref("Negro");
    const selectedDesign = ref("Liso");
    const customText = ref("");
    const customLogo = ref(null);
    const quantity = ref(1);
    const minQuantity = ref(1);
    const store = useStore();
    const router = useRouter();

    const productNames = {
      MD01: "Lanyard Estandar MD01",
      MD02: "Lanyard Estandar MD02",
      MR01: "Lanyard Pro MR01",
      MR02: "Lanyard Pro MR02",
      LLAVERO: "Llavero Publicitario 15CM",
      CREDENCIAL: "Credencial PVC INKJET",
    };

    const productPrices = {
      MD01: [
        { price: 2100, unit: "12 a 99 UN" },
        { price: 1650, unit: "100 a 499 UN" },
        { price: 1450, unit: "500 a 1000 UN" },
      ],
      MD02: [
        { price: 2000, unit: "12 a 99 UN" },
        { price: 1550, unit: "100 a 499 UN" },
        { price: 1450, unit: "500 a 1000 UN" },
      ],
      MR01: [
        { price: 2400, unit: "12 a 99 UN" },
        { price: 1750, unit: "100 a 499 UN" },
        { price: 1550, unit: "500 a 1000 UN" },
      ],
      MR02: [
        { price: 2300, unit: "12 a 99 UN" },
        { price: 1650, unit: "100 a 499 UN" },
        { price: 1450, unit: "500 a 1000 UN" },
      ],
      LLAVERO: [
        { price: 890, unit: "50 UN" },
        { price: 750, unit: "100 a 400 UN" },
        { price: 650, unit: "500 a 1000 UN" },
      ],
      CREDENCIAL: [
        { price: 1800, unit: "Impresión 2 caras" },
        { price: 1200, unit: "Impresión 1 cara" },
      ],
    };

    const designPrices = {
      Liso: 0,
      "Con logo": 300,
      "Con texto": 200,
    };

    const handleProductChange = (product) => {
      selectedProduct.value = product;
      updateMinQuantity();
    };

    const handleColorChange = (color) => {
      selectedColor.value = color;
    };

    const handleDesignChange = (design) => {
      selectedDesign.value = design;
    };

    const handleLogoChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          customLogo.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const updateMinQuantity = () => {
      if (!selectedProduct.value) {
        minQuantity.value = 1;
        return;
      }

      const prices = productPrices[selectedProduct.value];
      const minUnit = prices.reduce((min, price) => {
        const minUnit = parseInt(
          price.unit.split(" a ")[0].replace("UN", "").trim()
        );
        return minUnit < min ? minUnit : min;
      }, Infinity);

      minQuantity.value = minUnit;
      if (quantity.value < minUnit) {
        quantity.value = minUnit;
      }
    };

    const validateQuantity = () => {
      if (quantity.value < minQuantity.value) {
        Swal.fire({
          icon: "warning",
          title: "Cantidad fuera de rango",
          text: `La cantidad mínima para este producto es de ${minQuantity.value} unidades.`,
        });
        quantity.value = minQuantity.value;
      } else if (quantity.value > 1000) {
        Swal.fire({
          icon: "warning",
          title: "Cantidad fuera de rango",
          text: "La cantidad máxima permitida es de 1000 unidades.",
        });
        quantity.value = 1000;
      }
    };

    const calculatePrice = () => {
      if (!selectedProduct.value) {
        return 0;
      }

      const prices = productPrices[selectedProduct.value];
      let productPrice = 0;

      // Determine the correct price based on quantity
      for (const price of prices) {
        const [min, max] = price.unit
          .split(" a ")
          .map((n) => parseInt(n.replace("UN", "").trim()));
        if (quantity.value >= min && (!max || quantity.value <= max)) {
          productPrice = price.price;
          break;
        }
      }

      const designPrice = designPrices[selectedDesign.value];
      return productPrice + designPrice;
    };

    const calculateTotalPrice = () => {
      return calculatePrice() * quantity.value;
    };

    const getProductImage = (product, color) => {
      const images = {
        MD01: {
          Negro: "/path/to/lanyard_md01_black.png",
          Azul: "/path/to/lanyard_md01_blue.png",
          Rojo: "/path/to/lanyard_md01_red.png",
        },
        MD02: {
          Negro: "/path/to/lanyard_md02_black.png",
          Azul: "/path/to/lanyard_md02_blue.png",
          Rojo: "/path/to/lanyard_md02_red.png",
        },
        MR01: {
          Negro: "/path/to/lanyard_mr01_black.png",
          Azul: "/path/to/lanyard_mr01_blue.png",
          Rojo: "/path/to/lanyard_mr01_red.png",
        },
        MR02: {
          Negro: "/path/to/lanyard_mr02_black.png",
          Azul: "/path/to/lanyard_mr02_blue.png",
          Rojo: "/path/to/lanyard_mr02_red.png",
        },
        LLAVERO: {
          Negro: "/path/to/llavero_black.png",
          Azul: "/path/to/llavero_blue.png",
          Rojo: "/path/to/llavero_red.png",
        },
        CREDENCIAL: {
          Negro: "/path/to/credencial_black.png",
          Azul: "/path/to/credencial_blue.png",
          Rojo: "/path/to/credencial_red.png",
        },
      };
      return images[product][color];
    };

    const handleAddToCart = async () => {
      const productoData = {
        nombre: productNames[selectedProduct.value],
        descripcion: "Este es un producto genérico para personalizaciones",
        subcategoria: 8, // Cambia esto según sea necesario
        precio: calculatePrice(), // Precio unitario
        cantidad: quantity.value,
        estado: 1,
        es_personalizado: 1,
        iva: 19.0, // Asegúrate de que el campo 'iva' está aquí
      };

      try {
        const productoResponse = await fetch(
          "http://localhost:3000/api/productos/personalizado",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productoData),
          }
        );

        if (!productoResponse.ok) {
          throw new Error("Error al crear el producto");
        }

        const productoResult = await productoResponse.json();

        const productoId = productoResult.id;

        const archivoData = {
          producto_id: productoId,
          color: selectedColor.value,
          diseño: selectedDesign.value,
          texto_personalizado: customText.value,
          url_archivo: customLogo.value ? customLogo.value : null,
        };

        await fetch("http://localhost:3000/api/archivosSubidos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(archivoData),
        });

        store.commit("agregarProductoAlCarro", {
          id: productoId,
          nombre: productNames[selectedProduct.value],
          color: selectedColor.value,
          diseño: selectedDesign.value,
          texto_personalizado: customText.value,
          imagen: customLogo.value ? customLogo.value : null,
          precio: calculatePrice(), // Precio unitario
          cantidad: quantity.value,
          iva: 19.0, // Asegúrate de que el campo 'iva' está aquí también
        });

        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Producto agregado al carrito exitosamente",
        });

        router.push("/carro");
      } catch (error) {
        console.error(error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      }
    };

    return {
      selectedProduct,
      selectedColor,
      selectedDesign,
      customText,
      customLogo,
      quantity,
      minQuantity,
      handleProductChange,
      handleColorChange,
      handleDesignChange,
      handleLogoChange,
      handleAddToCart,
      calculatePrice,
      calculateTotalPrice,
      productNames,
      productPrices,
      getProductImage,
      validateQuantity,
      updateMinQuantity,
    };
  },
};
</script>

<style scoped>
.btn {
  padding: 10px;
  margin: 2px;
}

.img-thumbnail {
  width: 100px;
  height: 100px;
}

.bg-light {
  background-color: #f8f9fa !important;
}

.border {
  border: 1px solid #dee2e6 !important;
}

.p-3 {
  padding: 1rem !important;
}

.p-4 {
  padding: 1.5rem !important;
}

.text-muted {
  color: #6c757d !important;
}

.rounded {
  border-radius: 0.25rem !important;
}

.container {
  max-width: 960px;
}

.btn.active,
.btn-outline-primary.active,
.btn-outline-dark.active,
.btn-outline-danger.active,
.btn-outline-secondary.active {
  color: white !important;
}

.btn-outline-primary.active {
  background-color: #007bff !important;
  border-color: #007bff !important;
}

.btn-outline-dark.active {
  background-color: #343a40 !important;
  border-color: #343a40 !important;
}

.btn-outline-danger.active {
  background-color: #dc3545 !important;
  border-color: #dc3545 !important;
}

.btn-outline-secondary.active {
  background-color: #6c757d !important;
  border-color: #6c757d !important;
}

.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}

/* Add custom styles to make placeholder text appear gray */
.form-select {
  color: #6c757d; /* gray color */
}

.form-select option {
  color: black; /* normal text color */
}

.btn-diseno {
  height: 40px;
  width: 100px;
  border: 1px solid black;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin: 5px;
  transition: background-color 0.3s ease;
}

.btn-diseno:hover {
  background-color: #e2e3e3;
}

.btn-diseno.active {
  border: none;
}

.btn-color {
  height: 40px;
  width: 100px;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin: 5px;
  transition: background-color 0.3s ease;
}
</style>
