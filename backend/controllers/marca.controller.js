const marcaModel = require("../models/marca.model");
const path = require("path");
const fs = require("fs");

async function getAllMarcas(req, res) {
  try {
    const marcas = await marcaModel.getAllMarcas(req.pool);
    res.json(marcas);
  } catch (error) {
    console.error("Error al obtener las marcas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getAllMarcasActivas(req, res) {
  try {
    const marcas = await marcaModel.getAllMarcasActivas(req.pool);
    res.json(marcas);
  } catch (error) {
    console.error("Error al obtener las marcas activas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createMarca(req, res) {
  const { nombre, estado } = req.body;
  const imagen_url = `/uploads/marcas/${req.file.filename}`; // Ruta de la imagen subida

  if (!nombre || !imagen_url || typeof estado === "undefined") {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const marcaData = {
    nombre,
    imagen: imagen_url,
    estado,
  };

  try {
    const result = await marcaModel.createMarca(req.pool, marcaData);
    console.log("Marca creada correctamente:", result);
    res.status(201).json({
      message: "Marca creada exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear la marca:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function updateMarca(req, res) {
  const { id } = req.params;
  const { nombre, estado } = req.body;
  const imagen = req.file;

  if (!nombre || typeof estado === "undefined") {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const marcaData = { nombre, estado };

  if (imagen) {
    const imagenPath = `/uploads/marcas/${imagen.filename}`;
    marcaData.imagen = imagenPath;

    // Obtén la URL de la imagen anterior para eliminarla si existe
    const imagenUrlAnterior = await marcaModel.obtenerImagenUrl(req.pool, id);
    if (imagenUrlAnterior) {
      const filePath = path.join(
        __dirname,
        "../uploads/marcas",
        path.basename(imagenUrlAnterior)
      );
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("Imagen anterior eliminada:", filePath);
      } else {
        console.log("El archivo anterior no existe:", filePath);
      }
    }
  }

  try {
    await marcaModel.updateMarca(req.pool, id, marcaData);
    res.status(200).json({ message: "Marca actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar la marca:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", detalles: error.message });
  }
}

async function eliminarMarca(req, res) {
  const marcaId = req.params.id;
  if (!marcaId) {
    return res.status(400).json({ error: "ID de la Marca no proporcionado" });
  }

  try {
    // Obtén la URL de la imagen antes de eliminar la marca
    const imagenUrl = await marcaModel.obtenerImagenUrl(req.pool, marcaId);

    if (imagenUrl) {
      // Construye la ruta absoluta del archivo usando la ruta relativa a tu backend
      const filePath = path.join(
        __dirname,
        "../uploads/marcas",
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

    // Elimina la marca de la base de datos
    await marcaModel.eliminarMarca(req.pool, marcaId);
    res.status(200).json({ message: "Marca eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la Marca:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", detalles: error.message });
  }
}

async function cambiarEstadoMarca(req, res) {
  const { id } = req.params;
  const { estado } = req.body;

  if (estado !== 0 && estado !== 1) {
    return res.status(400).json({ error: "El estado debe ser 0 o 1" });
  }

  try {
    await marcaModel.cambiarEstadoMarca(req.pool, id, estado);
    res
      .status(200)
      .json({ message: "Estado de la marca actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el estado de la marca:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllMarcas,
  getAllMarcasActivas,
  createMarca,
  updateMarca,
  eliminarMarca,
  cambiarEstadoMarca,
};
