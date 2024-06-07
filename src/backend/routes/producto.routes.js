const express = require("express");
const router = express.Router();
const productoController = require("../controllers/producto.controller");

// Manejador GET para la ruta /api/productos/
router.get("/", productoController.getAllProductos);

// Manejador GET para obtener un producto por su ID
router.get("/:id", productoController.getProductoById);

// Manejador GET para obtener productos relacionados por ID
router.get(
  "/:id/relacionados",
  productoController.obtenerProductosRelacionados
);

// Manejador GET para obtener los últimos productos por categoría
router.get(
  "/categoria/:categoriaId/ultimos",
  productoController.getLastProductosByCategoria
);

// Manejador POST para la ruta /api/productos/
router.post("/", productoController.createProducto);

// Manejador PUT para la ruta /api/productos/:id
router.put("/:id", productoController.updateProducto);

// Manejador DELETE para la ruta /api/productos/:id
router.delete("/:id", productoController.eliminarProducto);

module.exports = router;
