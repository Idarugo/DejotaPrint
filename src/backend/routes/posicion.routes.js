const express = require("express");
const router = express.Router();
const posicionController = require("../controllers/posicion.controller");

// Manejador GET para la ruta /api/posicions/
router.get("/", posicionController.getAllPosicions);

// Middleware para registrar solicitudes POST
router.post("/", posicionController.createPosicion);

// Middleware para registrar solicitudes DELETE
router.delete("/:id", posicionController.eliminarPosicion);

// Middleware para registrar solicitudes PUT (modificar)
router.put("/:id", posicionController.updatePosicion);

module.exports = router;
