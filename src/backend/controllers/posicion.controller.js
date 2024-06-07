const posicionModel = require("../models/posicion.model");

async function getAllPosicions(req, res) {
  try {
    const posicions = await posicionModel.getAllPosicions(req.pool);
    res.json(posicions);
  } catch (error) {
    console.error("Error al obtener las posiciones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createPosicion(req, res) {
  const { posicion } = req.body;

  if (!posicion) {
    return res.status(400).json({ error: "El campo posicion es obligatorio" });
  }

  try {
    const result = await posicionModel.createPosicion(req.pool, { posicion });
    console.log("Posicion creada correctamente:", result);
    res
      .status(201)
      .json({ message: "Posicion creada exitosamente", id: result.insertId });
  } catch (error) {
    console.error("Error al crear la posicion:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getPosicionById(req, res) {
  try {
    const posicion = await posicionModel.getPosicionById(
      req.pool,
      req.params.id
    );
    if (!posicion) {
      return res.status(404).json({ error: "Posicion no encontrada" });
    }
    res.json(posicion);
  } catch (error) {
    console.error("Error al obtener la posicion por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarPosicion(req, res) {
  const posicionId = req.params.id;

  if (!posicionId) {
    return res
      .status(400)
      .json({ error: "ID de la posicion no proporcionado" });
  }

  try {
    await posicionModel.eliminarPosicion(req.pool, posicionId);
    res.status(200).json({ message: "Posicion eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la posicion:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function updatePosicion(req, res) {
  const { id } = req.params;
  const { posicion } = req.body;

  if (!posicion) {
    return res.status(400).json({ error: "El campo posicion es obligatorio" });
  }

  try {
    const posicionExistente = await posicionModel.getPosicionById(req.pool, id);
    if (!posicionExistente) {
      return res.status(404).json({ error: "Posicion no encontrada" });
    }

    await posicionModel.updatePosicion(req.pool, id, { posicion });
    res.status(200).json({ message: "Posicion actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar la posicion:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllPosicions,
  createPosicion,
  getPosicionById,
  eliminarPosicion,
  updatePosicion,
};
