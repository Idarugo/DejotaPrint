const horarioModel = require("../models/horario.model");

async function getAllHorarios(req, res) {
  try {
    const horarios = await horarioModel.getAllHorarios(req.pool);
    res.json(horarios);
  } catch (error) {
    console.error("Error al obtener los horarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function updateHorario(req, res) {
  const horarioId = req.params.id;
  const { dia, horario } = req.body;

  if (!horarioId) {
    return res.status(400).json({ error: "ID del horario no proporcionado" });
  }

  if (!dia || !horario) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const horarioData = {
    dia,
    horario,
  };

  try {
    await horarioModel.updateHorario(req.pool, horarioId, horarioData);
    res.status(200).json({ message: "Horario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el horario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllHorarios,
  updateHorario,
};
