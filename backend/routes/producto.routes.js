const express = require("express");
const router = express.Router();
const productoController = require("../controllers/producto.controller");
const authenticateToken = require("../middleware/authenticateToken");

// Rutas públicas (sin protección)
router.get("/", productoController.getAllProductos);
router.get("/:id", productoController.getProductoById);
router.get(
  "/:id/relacionados",
  productoController.obtenerProductosRelacionados
);
router.get(
  "/categoria/:categoriaId/ultimos",
  productoController.getLastProductosByCategoria
);

// Rutas protegidas (requieren autenticación)
router.get(
  "/admin",
  authenticateToken,
  productoController.getAllProductosAdmin
);
router.post("/", authenticateToken, productoController.createProducto);
router.post(
  "/personalizado",
  authenticateToken,
  productoController.createProductoPersonalizado
);
router.put("/:id", authenticateToken, productoController.updateProducto);
router.delete("/:id", authenticateToken, productoController.eliminarProducto);

module.exports = router;
