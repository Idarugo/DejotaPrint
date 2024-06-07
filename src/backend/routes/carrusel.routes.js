const express = require("express");
const router = express.Router();
const carruselController = require("../controllers/carrusel.controller");
const multer = require("multer");
const path = require("path");

// Configuración de Multer para el manejo de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/carrusel");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", carruselController.getAllCarrusel);
router.post("/", upload.single("imagen"), carruselController.createCarrusel);
router.delete("/:id", carruselController.eliminarCarrusel);
router.put("/:id/estado", carruselController.cambiarEstadoCarrusel);

module.exports = router;
