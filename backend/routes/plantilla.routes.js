const express = require("express");
const router = express.Router();
const plantillaController = require("../controllers/plantilla.controller");
const multer = require("multer");
const path = require("path");

// Configuración de Multer para el manejo de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/plantillas"); // Asegúrate de que esta carpeta exista
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Manejador GET para la ruta /api/plantillas/
router.get("/", plantillaController.getAllPlantillas);

// Middleware para registrar solicitudes POST
router.post(
  "/",
  upload.single("ruta_archivo"),
  plantillaController.createPlantilla
);

// Middleware para registrar solicitudes PUT
router.put("/:id", plantillaController.updatePlantilla);

// Middleware para registrar solicitudes DELETE
router.delete("/:id", plantillaController.eliminarPlantilla);

module.exports = router;
