const carruselModel = require("../models/carrusel.model");
const path = require("path");
const fs = require("fs");

async function getAllCarrusel(req, res) {
  try {
    const carruselItems = await carruselModel.getAllCarrusel(req.pool);
    res.json(carruselItems);
  } catch (error) {
    console.error("Error al obtener los elementos del carrusel:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createCarrusel(req, res) {
  const { titulo, enlace, posicion, estado } = req.body;
  const imagen_url = `/uploads/carrusel/${req.file.filename}`; // Ruta de la imagen subida

  if (!titulo || !imagen_url || typeof posicion === "undefined") {
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios, excepto el enlace." });
  }

  // Permitir que el enlace sea null si no se proporciona
  const carruselData = {
    titulo,
    imagen_url,
    enlace: enlace || null,
    posicion,
    estado: estado !== undefined ? estado : 1,
  };

  try {
    const result = await carruselModel.createCarrusel(req.pool, carruselData);
    console.log("Elemento del carrusel creado correctamente:", result);
    res.status(201).json({
      message: "Elemento del carrusel creado exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear el elemento del carrusel:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarCarrusel(req, res) {
  const carruselId = req.params.id;
  if (!carruselId) {
    return res.status(400).json({ error: "ID del carrusel no proporcionado" });
  }

  try {
    // Obtén la URL de la imagen antes de eliminar el carrusel
    const imagenUrl = await carruselModel.obtenerImagenUrl(
      req.pool,
      carruselId
    );

    if (imagenUrl) {
      // Construye la ruta absoluta del archivo usando la ruta relativa a tu backend
      const filePath = path.join(
        __dirname,
        "../uploads/carrusel",
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

    // Elimina el carrusel de la base de datos
    await carruselModel.eliminarCarrusel(req.pool, carruselId);
    res.status(200).json({ message: "Carrusel eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el carrusel:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function cambiarEstadoCarrusel(req, res) {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    await carruselModel.cambiarEstadoCarrusel(req.pool, id, estado);
    res
      .status(200)
      .json({ message: "Estado del carrusel actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el estado del carrusel:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllCarrusel,
  createCarrusel,
  eliminarCarrusel,
  cambiarEstadoCarrusel,
};
