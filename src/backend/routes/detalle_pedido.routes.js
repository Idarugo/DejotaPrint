const express = require("express");
const router = express.Router();
const detalle_pedidoController = require("../controllers/detalle_pedido.controller");

// Manejador GET para la ruta /api/detalle_pedidos/
router.get("/", detalle_pedidoController.getAllDetalle_pedidos);

// Middleware para registrar solicitudes POST
router.post("/", detalle_pedidoController.createDetalle_pedido);

// Middleware para registrar solicitudes DELETE
router.delete("/:id", detalle_pedidoController.eliminarDetalle_pedido);

module.exports = router;
