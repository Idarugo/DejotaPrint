const express = require("express");
const router = express.Router();
const imagenProductoController = require("../controllers/imagen-producto.controller");
const multer = require("multer");

// Configurar almacenamiento con multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/productos/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Rutas
router.get("/", imagenProductoController.getAllImagenProductos);
router.get("/:producto_id", imagenProductoController.getImagenesByProductoId);
router.post(
  "/",
  upload.single("imagen"),
  imagenProductoController.createImagenProducto
);
router.put(
  "/:id",
  upload.single("imagen"),
  imagenProductoController.updateImagenProducto
);
router.delete("/:id", imagenProductoController.eliminarImagenProducto);

module.exports = router;
