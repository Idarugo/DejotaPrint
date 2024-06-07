const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedido.controller");

// Manejador GET para la ruta /api/pedidos/
router.get("/", pedidoController.getAllPedidos);

// Manejador GET para la ruta /api/pedidos/:id
router.get("/:id", pedidoController.getPedidoById);

// Manejador POST para la ruta /api/pedidos/
router.post("/", pedidoController.createPedido);

// Manejador DELETE para la ruta /api/pedidos/:id
router.delete("/:id", pedidoController.eliminarPedido);

module.exports = router;
