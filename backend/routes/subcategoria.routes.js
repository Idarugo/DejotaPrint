const express = require("express");
const router = express.Router();
const subcategoriaController = require("../controllers/subcategoria.controller");

// Manejador GET para la ruta /api/subcategorias/
router.get("/", subcategoriaController.getAllSubcategorias);

// Middleware para registrar solicitudes POST
router.post("/", subcategoriaController.createSubcategoria);

// Middleware para registrar solicitudes PUT (Actualizar)
router.put("/:id", subcategoriaController.updateSubcategoria);

// Middleware para registrar solicitudes DELETE
router.delete("/:id", subcategoriaController.eliminarSubcategoria);

router.get("/:id", subcategoriaController.getSubcategoriaById);

module.exports = router;
