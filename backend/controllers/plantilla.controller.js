const plantillaModel = require("../models/plantilla.model");
const path = require("path");
const fs = require("fs");

async function getAllPlantillas(req, res) {
  try {
    const plantillas = await plantillaModel.getAllPlantillas(req.pool);
    res.json(plantillas);
  } catch (error) {
    console.error("Error al obtener las plantillas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createPlantilla(req, res) {
  const { nombre, descripcion, tipo, etiquetas } = req.body;
  const ruta_archivo = req.file
    ? `/uploads/plantillas/${req.file.filename}`
    : null;

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
    // Obtén la URL de la plantilla antes de eliminarla
    const rutaArchivo = await plantillaModel.obtenerRutaArchivo(
      req.pool,
      plantillaId
    );

    if (rutaArchivo) {
      // Construye la ruta absoluta del archivo usando la ruta relativa a tu backend
      const filePath = path.join(
        __dirname,
        "../uploads/plantillas",
        path.basename(rutaArchivo)
      );

      // Verifica si el archivo existe y elimina de forma sincrónica
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("Archivo eliminado:", filePath);
      } else {
        console.log("El archivo no existe:", filePath);
      }
    }

    // Elimina la plantilla de la base de datos
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
