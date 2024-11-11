const categoriaModel = require("../models/categoria.model");

async function getAllCategorias(req, res) {
  try {
    const categorias = await categoriaModel.getAllCategorias(req.pool);
    res.json(categorias);
  } catch (error) {
    console.error("Error al obtener las categorias:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createCategoria(req, res) {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const categoriaData = { nombre };

  try {
    const result = await categoriaModel.createCategoria(
      req.pool,
      categoriaData
    );
    res
      .status(201)
      .json({ message: "Categoria creado exitosamente", id: result.insertId });
  } catch (error) {
    console.error("Error al crear el Categoria:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function updateCategoria(req, res) {
  const { id } = req.params;
  const { nombre } = req.body;

  if (!id || !nombre) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const categoriaData = { nombre };

  try {
    await categoriaModel.updateCategoria(req.pool, id, categoriaData);
    res.status(200).json({ message: "Categoria actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el Categoria:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarCategoria(req, res) {
  const categoriaId = req.params.id;

  if (!categoriaId) {
    return res.status(400).json({ error: "ID del Categoria no proporcionado" });
  }

  try {
    await categoriaModel.eliminarCategoria(req.pool, categoriaId);
    res.status(200).json({ message: "Categoria eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el Categoria:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllCategorias,
  createCategoria,
  updateCategoria,
  eliminarCategoria,
};
