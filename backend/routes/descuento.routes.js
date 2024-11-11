const express = require("express");
const router = express.Router();
const descuentoController = require("../controllers/descuento.controller.js");

// Obtener todos los descuentos
router.get("/", descuentoController.getAllDescuentos);

// Obtener un descuento por su código
router.get("/:codigo", descuentoController.getDescuentoByCodigo);

// Crear un nuevo descuento
router.post("/", descuentoController.createDescuento);

// Actualizar un descuento
router.put("/:id", descuentoController.updateDescuento);

// Eliminar un descuento
router.delete("/:id", descuentoController.deleteDescuento);

module.exports = router;
