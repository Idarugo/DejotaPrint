const express = require("express");
const router = express.Router();
const archivosSubidosController = require("../controllers/archivoSubido.controller");
const multer = require("multer");
const path = require("path");

// Configuración de Multer para el manejo de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/archivosSubidos");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", archivosSubidosController.getAllArchivosSubidos);
router.post(
  "/",
  upload.single("imagen"),
  archivosSubidosController.createArchivoSubido
);
router.delete("/:id", archivosSubidosController.eliminarArchivoSubido);

module.exports = router;
