const imagenProductoModel = require("../models/imagen-producto.model");
const fs = require("fs");
const path = require("path");

async function getAllImagenProductos(req, res) {
  try {
    const imagenProductos = await imagenProductoModel.getAllImagenProductos(
      req.pool
    );
    res.json(imagenProductos);
  } catch (error) {
    console.error("Error al obtener los imagen Productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getImagenProductoById(req, res) {
  const imagenProductoId = req.params.id;

  try {
    const imagenProducto = await imagenProductoModel.getImagenProductoById(
      req.pool,
      imagenProductoId
    );
    if (!imagenProducto) {
      return res
        .status(404)
        .json({ error: "Imagen del producto no encontrada" });
    }
    res.json(imagenProducto);
  } catch (error) {
    console.error("Error al obtener la imagen del producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getImagenesByProductoId(req, res) {
  const producto_id = req.params.producto_id;

  try {
    const imagenesProducto = await imagenProductoModel.getImagenesByProductoId(
      req.pool,
      producto_id
    );
    if (!imagenesProducto.length) {
      return res
        .status(404)
        .json({ error: "Imágenes del producto no encontradas" });
    }
    res.json(imagenesProducto);
  } catch (error) {
    console.error("Error al obtener las imágenes del producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createImagenProducto(req, res) {
  const { producto_id } = req.body;

  if (!producto_id || !req.file) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const imagenPath = `/uploads/productos/${req.file.filename}`;

  const imagenProductoData = {
    producto_id,
    url_imagen: imagenPath,
  };

  try {
    const result = await imagenProductoModel.createImagenProducto(
      req.pool,
      imagenProductoData
    );
    res.status(201).json({
      message: "Imagen del producto creada exitosamente",
      id: result.insertId,
      url_imagen: imagenPath,
    });
  } catch (error) {
    console.error("Error al crear la imagen del producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function updateImagenProducto(req, res) {
  const imagenProductoId = req.params.id;
  const { producto_id, url_imagen } = req.body;

  if (!producto_id || !url_imagen) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const imagenProductoData = {
    producto_id,
    url_imagen,
  };

  try {
    await imagenProductoModel.updateImagenProducto(
      req.pool,
      imagenProductoId,
      imagenProductoData
    );
    res
      .status(200)
      .json({ message: "Imagen del producto actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la imagen del producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarImagenProducto(req, res) {
  const imagenProductoId = req.params.id;
  if (!imagenProductoId) {
    return res
      .status(400)
      .json({ error: "ID del imagenProducto no proporcionado" });
  }

  try {
    const imagenUrl = await imagenProductoModel.obtenerImagenUrl(
      req.pool,
      imagenProductoId
    );

    if (imagenUrl) {
      const filePath = path.join(
        __dirname,
        "../uploads/productos",
        path.basename(imagenUrl)
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("Imagen eliminada:", filePath);
      } else {
        console.log("El archivo no existe:", filePath);
      }
    }

    await imagenProductoModel.eliminarImagenProducto(
      req.pool,
      imagenProductoId
    );
    res
      .status(200)
      .json({ message: "Imagen del producto eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la imagen del producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllImagenProductos,
  getImagenProductoById,
  getImagenesByProductoId,
  createImagenProducto,
  updateImagenProducto,
  eliminarImagenProducto,
};
