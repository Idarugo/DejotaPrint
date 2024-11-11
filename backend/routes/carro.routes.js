const express = require("express");
const router = express.Router();
const carroController = require("../controllers/carro.controller");

// Manejador GET para la ruta /api/carros/
router.get("/", carroController.getAllCarros);

// Middleware para registrar solicitudes POST
router.post("/", carroController.createCarro);

// Middleware para registrar solicitudes DELETE
router.delete("/:id", carroController.eliminarCarro);

module.exports = router;
