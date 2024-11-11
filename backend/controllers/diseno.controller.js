const disenoModel = require("../models/diseno.model.js");
const fs = require("fs");
const path = require("path");

async function getAllDisenos(req, res) {
  try {
    const disenos = await disenoModel.getAllDisenos(req.pool);
    res.json(disenos);
  } catch (error) {
    console.error("Error al obtener los disenos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getAllDisenosAdmin(req, res) {
  try {
    const disenos = await disenoModel.getAllDisenosAdmin(req.pool);
    res.json(disenos);
  } catch (error) {
    console.error("Error al obtener los disenos para admin:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

const createDiseno = async (req, res) => {
  const { nombre, descripcion, subcategoria } = req.body;
  const imagen = req.file ? `/uploads/disenos/${req.file.filename}` : null;

  if (!nombre || !descripcion || !subcategoria || !imagen) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const disenoData = { nombre, descripcion, subcategoria, imagen };

  try {
    const result = await disenoModel.createDiseno(req.pool, disenoData);
    res.status(201).json({
      message: "Diseño creado exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear el diseño:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

async function updateDiseno(req, res) {
  const disenoId = req.params.id;
  const { nombre, descripcion, subcategoria } = req.body;
  const imagen = req.file
    ? `/uploads/disenos/${req.file.filename}`
    : req.body.imagen;

  if (!disenoId) {
    return res.status(400).json({ error: "ID del diseno no proporcionado" });
  }

  if (!nombre || !descripcion || !subcategoria) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const disenoData = { nombre, descripcion, subcategoria, imagen };

  try {
    // Si hay una nueva imagen, elimina la imagen anterior
    if (req.file) {
      const disenoAnterior = await disenoModel.getDisenoById(
        req.pool,
        disenoId
      );
      if (disenoAnterior.imagen) {
        const filePath = path.join(
          __dirname,
          "../uploads/disenos",
          path.basename(disenoAnterior.imagen)
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }
    await disenoModel.updateDiseno(req.pool, disenoId, disenoData);
    res.status(200).json({ message: "Diseño actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el diseño:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarDiseno(req, res) {
  const disenoId = req.params.id;

  if (!disenoId) {
    return res.status(400).json({ error: "ID del diseno no proporcionado" });
  }

  try {
    const disenoAnterior = await disenoModel.getDisenoById(req.pool, disenoId);
    if (disenoAnterior.imagen) {
      const filePath = path.join(
        __dirname,
        "../uploads/disenos",
        path.basename(disenoAnterior.imagen)
      );
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await disenoModel.eliminarDiseno(req.pool, disenoId);
    res.status(200).json({ message: "Diseño eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el diseño:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getDisenosConImagenes(req, res) {
  try {
    const disenosConImagenes = await disenoModel.getDisenosConImagenes(
      req.pool
    );
    res.json(disenosConImagenes);
  } catch (error) {
    console.error("Error al obtener disenos con imágenes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getLastDisenosByCategoria(req, res) {
  const categoriaId = req.params.categoriaId;
  try {
    const disenos = await disenoModel.getLastDisenosByCategoria(
      req.pool,
      categoriaId
    );
    res.json(disenos);
  } catch (error) {
    console.error("Error al obtener los últimos disenos por categoría:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllDisenos,
  getAllDisenosAdmin,
  createDiseno,
  updateDiseno,
  eliminarDiseno,
  getDisenosConImagenes,
  getLastDisenosByCategoria,
};
