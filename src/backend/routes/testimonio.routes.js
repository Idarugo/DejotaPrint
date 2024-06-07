const express = require("express");
const router = express.Router();
const testimonioController = require("../controllers/testimonio.controller");
const multer = require("multer");
const path = require("path");

// Configuración de Multer para el manejo de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/testimonios");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Rutas para los testimonios

// Manejador GET para la ruta /api/testimonios/
router.get("/", testimonioController.getAllTestimonios);

// Manejador GET para la ruta /api/testimonios/aprobados/
router.get("/aprobados/", testimonioController.getApprovedTestimonios);

// Manejador POST para la ruta /api/testimonios/
router.post(
  "/",
  upload.single("imagen"),
  testimonioController.createTestimonio
);

// Manejador DELETE para la ruta /api/testimonios/:id
router.delete("/:id", testimonioController.eliminarTestimonio);

// Manejador PUT para la ruta /api/testimonios/:id/estado
router.put("/:id/estado", testimonioController.cambiarEstadoTestimonio);

module.exports = router;
