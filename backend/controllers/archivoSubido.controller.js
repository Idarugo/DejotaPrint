const archivosSubidosModel = require("../models/archivoSubido.model");
const path = require("path");
const fs = require("fs");

async function getAllArchivosSubidos(req, res) {
  try {
    const archivosSubidosItems =
      await archivosSubidosModel.getAllArchivosSubidos(req.pool);
    res.json(archivosSubidosItems);
  } catch (error) {
    console.error("Error al obtener los elementos de archivos subidos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createArchivoSubido(req, res) {
  const { producto_id, color, diseño, texto_personalizado } = req.body;
  const url_archivo = req.file ? req.file.path : null;

  if (!producto_id || !color || !diseño) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const archivoData = {
    producto_id,
    color,
    diseño,
    texto_personalizado: texto_personalizado || "",
    url_archivo,
  };

  try {
    const result = await archivosSubidosModel.createArchivoSubido(
      req.pool,
      archivoData
    );
    res.status(201).json({
      message: "Archivo subido creado exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear el archivo subido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarArchivoSubido(req, res) {
  const archivoSubidoId = req.params.id;
  if (!archivoSubidoId) {
    return res
      .status(400)
      .json({ error: "ID de archivo subido no proporcionado" });
  }

  try {
    const imagenUrl = await archivosSubidosModel.obtenerImagenUrl(
      req.pool,
      archivoSubidoId
    );

    if (imagenUrl) {
      const filePath = path.join(
        __dirname,
        "../uploads/archivosSubidos",
        path.basename(imagenUrl)
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("Imagen eliminada:", filePath);
      } else {
        console.log("El archivo no existe:", filePath);
      }
    }

    await archivosSubidosModel.eliminarArchivoSubido(req.pool, archivoSubidoId);
    res.status(200).json({ message: "Archivo subido eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el archivo subido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllArchivosSubidos,
  createArchivoSubido,
  eliminarArchivoSubido,
};
