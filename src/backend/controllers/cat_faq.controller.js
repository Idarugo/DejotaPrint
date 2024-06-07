const cat_faqModel = require("../models/cat_faq.model");

async function getAllCat_faqs(req, res) {
  try {
    const cat_faqs = await cat_faqModel.getAllCat_faqs(req.pool);
    res.json(cat_faqs);
  } catch (error) {
    console.error("Error al obtener los cat_faqs:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createCat_faq(req, res) {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const cat_faqData = { nombre };

  try {
    const result = await cat_faqModel.createCat_faq(req.pool, cat_faqData);
    console.log("cat_faq creado correctamente:", result);
    res.status(201).json({
      message: "cat_faq creado exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear el cat_faq:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarCat_faq(req, res) {
  const contactId = req.params.id; // Obtener el ID del cat_faq de los parámetros de la URL

  if (!contactId) {
    return res
      .status(400)
      .json({ error: "ID del Categoria Pregunta Frecuente no proporcionado" });
  }

  try {
    await cat_faqModel.eliminarCat_faq(req.pool, contactId);
    res.status(200).json({ message: "cat_faq eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el cat_faq:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllCat_faqs,
  createCat_faq,
  eliminarCat_faq,
};
