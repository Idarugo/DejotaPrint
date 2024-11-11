const express = require("express");
const router = express.Router();
const horarioController = require("../controllers/horario.controller");

// Manejador GET para la ruta /api/horarios/
router.get("/", horarioController.getAllHorarios);

// Manejador PUT para la ruta /api/horarios/:id
router.put("/:id", horarioController.updateHorario);

module.exports = router;
