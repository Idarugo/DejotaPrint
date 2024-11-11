const subcategoriaModel = require("../models/subcategoria.model");

async function getAllSubcategorias(req, res) {
  try {
    const subcategorias = await subcategoriaModel.getAllSubcategorias(req.pool);
    res.json(subcategorias);
  } catch (error) {
    console.error("Error al obtener los subcategorias:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createSubcategoria(req, res) {
  const { nombre, categoria } = req.body;

  if (!nombre || !categoria) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const subcategoriaData = { nombre, categoria };

  try {
    const result = await subcategoriaModel.createSubcategoria(
      req.pool,
      subcategoriaData
    );
    console.log("Subcategoria creado correctamente:", result);
    res.status(201).json({
      message: "Subcategoria creado exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear el subcategoria:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function updateSubcategoria(req, res) {
  const { id } = req.params;
  const { nombre, categoria } = req.body;

  if (!nombre || !categoria) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const subcategoriaData = { nombre, categoria };

  try {
    await subcategoriaModel.updateSubcategoria(req.pool, id, subcategoriaData);
    res.status(200).json({ message: "Subcategoria actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el subcategoria:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarSubcategoria(req, res) {
  const subcategoriaId = req.params.id; // Obtener el ID del subcategoria de los parámetros de la URL

  if (!subcategoriaId) {
    return res
      .status(400)
      .json({ error: "ID del Subcategoria no proporcionado" });
  }

  try {
    await subcategoriaModel.eliminarSubcategoria(req.pool, subcategoriaId);
    res.status(200).json({ message: "Subcategoria eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el Subcategoria:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getSubcategoriaById(req, res) {
  try {
    const subcategoria = await subcategoriaModel.getSubcategoriaById(
      req.pool,
      req.params.id
    );
    if (!subcategoria) {
      return res.status(404).json({ error: "Subcategoría no encontrada" });
    }
    res.json(subcategoria);
  } catch (error) {
    console.error("Error al obtener la subcategoría por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllSubcategorias,
  createSubcategoria,
  updateSubcategoria,
  eliminarSubcategoria,
  getSubcategoriaById,
};
