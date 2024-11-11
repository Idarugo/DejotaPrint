const express = require("express");
const router = express.Router();
const trabajadoreController = require("../controllers/trabajadore.controller");
const authenticateToken = require("../middleware/authenticateToken");

// Manejador GET para la ruta /api/trabajadores/
router.get("/", trabajadoreController.getAllTrabajadores);

// Middleware para registrar solicitudes POST
router.post("/", trabajadoreController.createTrabajadore);

// Middleware para registrar solicitudes PUT
router.put("/:rut", authenticateToken, trabajadoreController.updateTrabajadore);

// Middleware para registrar solicitudes DELETE
router.delete("/:rut", trabajadoreController.eliminarTrabajadore);

// Añade la nueva ruta para obtener el usuario actual
router.get("/me", authenticateToken, trabajadoreController.getCurrentUser);

// Manejador PUT para la ruta /api/trabajadores/:rut/estado
router.put("/:rut/estado", trabajadoreController.cambiarEstadoTrabajador);

router.get(
  "/:rut",
  authenticateToken,
  trabajadoreController.getTrabajadorByRut
);

module.exports = router;
