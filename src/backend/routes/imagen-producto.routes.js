const express = require("express");
const router = express.Router();
const imagenProductoController = require("../controllers/imagen-producto.controller");
const multer = require("multer");

// Manejador GET para la ruta /api/imagenProductos/
router.get("/", imagenProductoController.getAllImagenProductos);

router.get("/:producto_id", imagenProductoController.getImagenesByProductoId);

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

// Manejador POST para la ruta /api/imagenProductos/
router.post(
  "/",
  upload.single("imagen"),
  imagenProductoController.createImagenProducto
);

// Manejador PUT para la ruta /api/imagenProductos/:id
router.put("/:id", imagenProductoController.updateImagenProducto);

// Manejador DELETE para la ruta /api/imagenProductos/:id
router.delete("/:id", imagenProductoController.eliminarImagenProducto);

module.exports = router;
