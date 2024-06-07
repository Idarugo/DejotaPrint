const express = require("express");
const router = express.Router();
const plantillaController = require("../controllers/plantilla.controller");

// Manejador GET para la ruta /api/plantillas/
router.get("/", plantillaController.getAllPlantillas);

// Middleware para registrar solicitudes POST
router.post("/", plantillaController.createPlantilla);

// Middleware para registrar solicitudes PUT
router.put("/:id", plantillaController.updatePlantilla);

// Middleware para registrar solicitudes DELETE
router.delete("/:id", plantillaController.eliminarPlantilla);

module.exports = router;
