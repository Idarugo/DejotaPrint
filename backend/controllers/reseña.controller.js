const reseñaModel = require("../models/reseña.model");

async function getAllReseñas(req, res) {
  try {
    const reseñas = await reseñaModel.getAllReseñas(req.pool);
    res.json(reseñas);
  } catch (error) {
    console.error("Error al obtener los reseñas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createReseña(req, res) {
  const { producto_id, clasificacion, mensaje, nombre, correo, fecha } =
    req.body;
  if (!producto_id || !clasificacion || !mensaje || !nombre || !correo) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const reseñaData = {
    producto_id,
    clasificacion,
    mensaje,
    nombre,
    correo,
    fecha,
  };

  console.log("Datos de la reseña recibidos:", reseñaData);

  try {
    const result = await reseñaModel.createReseña(req.pool, reseñaData);
    console.log("Reseña creada correctamente:", result);
    res.status(201).json({
      message: "Reseña creada exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear la reseña:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarReseña(req, res) {
  const reseñaId = req.params.id; // Obtener el ID del reseña de los parámetros de la URL

  if (!reseñaId) {
    return res.status(400).json({ error: "ID del reseña no proporcionado" });
  }

  try {
    await reseñaModel.eliminarReseña(req.pool, reseñaId);
    res.status(200).json({ message: "Reseña eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el reseña:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getReseñasByProductoId(req, res) {
  const productoId = req.params.producto_id;

  if (!productoId) {
    return res.status(400).json({ error: "ID del producto no proporcionado" });
  }

  try {
    const reseñas = await reseñaModel.getReseñasByProductoId(
      req.pool,
      productoId
    );
    res.json(reseñas);
  } catch (error) {
    console.error("Error al obtener las reseñas del producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllReseñas,
  createReseña,
  eliminarReseña,
  getReseñasByProductoId,
};
