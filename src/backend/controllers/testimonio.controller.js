const testimonioModel = require("../models/testimonio.model");
const path = require("path");
const fs = require("fs");

async function getAllTestimonios(req, res) {
  try {
    const testimonios = await testimonioModel.getAllTestimonios(req.pool);
    res.json(testimonios);
  } catch (error) {
    console.error("Error al obtener los testimonios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getApprovedTestimonios(req, res) {
  try {
    const testimonios = await testimonioModel.getApprovedTestimonios(req.pool);
    res.json(testimonios);
  } catch (error) {
    console.error("Error al obtener los testimonios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createTestimonio(req, res) {
  const { nombre, mensaje, estado } = req.body;
  const imagen_url = `/uploads/testimonios/${req.file.filename}`;

  try {
    const result = await testimonioModel.createTestimonio(req.pool, {
      nombre,
      imagen_url,
      mensaje,
      estado,
    });
    res.status(201).json({
      message: "Testimonio creado exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear el testimonio:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarTestimonio(req, res) {
  const testimonioId = req.params.id;
  if (!testimonioId) {
    return res
      .status(400)
      .json({ error: "ID del testimonio no proporcionado" });
  }

  try {
    // Obtén la URL de la imagen antes de eliminar el testimonio
    const imagenUrl = await testimonioModel.obtenerImagenUrl(
      req.pool,
      testimonioId
    );

    if (imagenUrl) {
      // Construye la ruta absoluta del archivo usando la ruta relativa a tu backend
      const filePath = path.join(
        __dirname,
        "../uploads/testimonios",
        path.basename(imagenUrl)
      );

      // Verifica si el archivo existe y elimina de forma sincrónica
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("Imagen eliminada:", filePath);
      } else {
        console.log("El archivo no existe:", filePath);
      }
    }

    // Elimina el testimonio de la base de datos
    await testimonioModel.eliminarTestimonio(req.pool, testimonioId);
    res.status(200).json({ message: "Testimonio eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el testimonio:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function cambiarEstadoTestimonio(req, res) {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    await testimonioModel.cambiarEstadoTestimonio(req.pool, id, estado);
    res
      .status(200)
      .json({ message: "Estado del testimonio actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el estado del testimonio:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllTestimonios,
  getApprovedTestimonios,
  createTestimonio,
  eliminarTestimonio,
  cambiarEstadoTestimonio,
};
