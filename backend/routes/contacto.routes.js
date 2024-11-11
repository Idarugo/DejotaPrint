const express = require("express");
const router = express.Router();
const contactoController = require("../controllers/contacto.controller");

// Manejador GET para la ruta /api/contactos/
router.get("/", contactoController.getAllContactos);

// Middleware para registrar solicitudes POST
router.post("/", contactoController.createContacto);

// Middleware para registrar solicitudes DELETE
router.delete("/:id", contactoController.eliminarContacto);

module.exports = router;
