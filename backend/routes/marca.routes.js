const express = require("express");
const router = express.Router();
const marcaController = require("../controllers/marca.controller");
const multer = require("multer");
const path = require("path");

// Configuración de Multer para el manejo de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/marcas");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", marcaController.getAllMarcas);
router.get("/activas", marcaController.getAllMarcasActivas);
router.post("/", upload.single("imagen"), marcaController.createMarca);
router.put("/:id", upload.single("imagen"), marcaController.updateMarca);
router.delete("/:id", marcaController.eliminarMarca);
router.put("/:id/estado", marcaController.cambiarEstadoMarca);

module.exports = router;
