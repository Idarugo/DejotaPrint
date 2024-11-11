const express = require("express");
const router = express.Router();
const cotizacionController = require("../controllers/cotizacion.controller");

// Manejador GET para la ruta /api/cotizaciones/
router.get("/", cotizacionController.getAllCotizaciones);

// Middleware para registrar solicitudes POST
router.post("/", cotizacionController.createCotizacion);

// Middleware para registrar solicitudes DELETE
router.delete("/:id", cotizacionController.eliminarCotizacion);

module.exports = router;
