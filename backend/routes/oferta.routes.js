const express = require("express");
const router = express.Router();
const ofertaController = require("../controllers/oferta.controller");

// Manejador GET para la ruta /api/ofertas/
router.get("/", ofertaController.getAllOfertas);

// Manejador GET para la ruta /api/ofertas/especiales
router.get("/especiales", ofertaController.getAllOfertasEspeciales);

// Manejador GET para obtener una oferta por su ID
router.get("/:id", ofertaController.getOfertaById);

// Ruta GET para obtener la oferta de un producto específico
router.get("/producto/:producto_id", ofertaController.getOfertaByProductoId);

// Manejador POST para la ruta /api/ofertas/
router.post("/", ofertaController.createOferta);

// Manejador PUT para la ruta /api/ofertas/:id
router.put("/:id", ofertaController.updateOferta);

// Manejador DELETE para la ruta /api/ofertas/:id
router.delete("/:id", ofertaController.eliminarOferta);

// Manejador PUT para la ruta /api/ofertas/:id/estado
router.put("/:id/estado", ofertaController.cambiarEstadoOferta);

module.exports = router;
