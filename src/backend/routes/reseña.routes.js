const express = require("express");
const router = express.Router();
const reseñaController = require("../controllers/reseña.controller");

// Manejador GET para la ruta /api/reseñas/
router.get("/", reseñaController.getAllReseñas);

// Manejador GET para la ruta /api/reseñas/:producto_id
router.get("/:producto_id", reseñaController.getReseñasByProductoId);

// Manejador POST para la ruta /api/reseñas/
router.post("/", reseñaController.createReseña);

// Manejador DELETE para la ruta /api/reseñas/:id
router.delete("/:id", reseñaController.eliminarReseña);

module.exports = router;
