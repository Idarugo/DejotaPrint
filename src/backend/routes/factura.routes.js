const express = require("express");
const router = express.Router();
const facturaController = require("../controllers/factura.controller");

// Manejador GET para la ruta /api/facturas/
router.get("/", facturaController.getAllFacturas);

// Middleware para registrar solicitudes POST
router.post("/", facturaController.createFactura);

// Middleware para registrar solicitudes DELETE
router.delete("/:id", facturaController.eliminarFactura);

module.exports = router;
