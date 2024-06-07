const plantillaModel = require("../models/plantilla.model");

async function getAllPlantillas(req, res) {
  try {
    const plantillas = await plantillaModel.getAllPlantillas(req.pool);
    res.json(plantillas);
  } catch (error) {
    console.error("Error al obtener los plantillas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createPlantilla(req, res) {
  const { nombre, descripcion, tipo, ruta_archivo, etiquetas } = req.body;

  if (!nombre || !descripcion || !tipo || !ruta_archivo || !etiquetas) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const plantillaData = {
    nombre,
    descripcion,
    tipo,
    ruta_archivo,
    etiquetas,
  };

  try {
    const result = await plantillaModel.createPlantilla(
      req.pool,
      plantillaData
    );
    console.log("Plantilla creada correctamente:", result);
    res.status(201).json({
      message: "Plantilla creada exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear la plantilla:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function updatePlantilla(req, res) {
  const plantillaId = req.params.id;
  const { nombre, descripcion, tipo, ruta_archivo, etiquetas } = req.body;

  if (!nombre || !descripcion || !tipo || !ruta_archivo || !etiquetas) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const plantillaData = {
    nombre,
    descripcion,
    tipo,
    ruta_archivo,
    etiquetas,
  };

  try {
    await plantillaModel.updatePlantilla(req.pool, plantillaId, plantillaData);
    res.status(200).json({ message: "Plantilla actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la plantilla:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarPlantilla(req, res) {
  const plantillaId = req.params.id;

  if (!plantillaId) {
    return res
      .status(400)
      .json({ error: "ID de la plantilla no proporcionado" });
  }

  try {
    await plantillaModel.eliminarPlantilla(req.pool, plantillaId);
    res.status(200).json({ message: "Plantilla eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la plantilla:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllPlantillas,
  createPlantilla,
  updatePlantilla,
  eliminarPlantilla,
};
