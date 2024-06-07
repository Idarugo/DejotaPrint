const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoria.controller");

// Manejador GET para la ruta /api/categorias/
router.get("/", categoriaController.getAllCategorias);

// Middleware para registrar solicitudes POST
router.post("/", categoriaController.createCategoria);

// Middleware para registrar solicitudes PUT
router.put("/:id", categoriaController.updateCategoria);

// Middleware para registrar solicitudes DELETE
router.delete("/:id", categoriaController.eliminarCategoria);

module.exports = router;
