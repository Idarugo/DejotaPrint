const express = require("express");
const router = express.Router();
const contactoPedidoController = require("../controllers/contacto_pedido.controller");

// Ruta para obtener todos los contactos de pedidos
router.get("/", contactoPedidoController.getAllContactoPedidos);

// Ruta para crear un contacto de pedido
router.post("/", contactoPedidoController.createContactoPedido);

// Ruta para eliminar un contacto de pedido
router.delete("/:id", contactoPedidoController.eliminarContactoPedido);

module.exports = router;
