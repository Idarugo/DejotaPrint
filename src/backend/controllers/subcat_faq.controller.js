const subcat_faqModel = require("../models/subcat_faq.model");

async function getAllSubcat_faqs(req, res) {
  try {
    const subcat_faqs = await subcat_faqModel.getAllSubcat_faqs(req.pool);
    res.json(subcat_faqs);
  } catch (error) {
    console.error("Error al obtener los subcat_faqs:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createSubcat_faq(req, res) {
  const { nombre, categoria } = req.body;

  if (!nombre || !categoria) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const subcat_faqData = { nombre };

  try {
    const result = await subcat_faqModel.createSubcat_faq(
      req.pool,
      subcat_faqData
    );
    console.log("subcat_faq creado correctamente:", result);
    res.status(201).json({
      message: "subcat_faq creado exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear el subcat_faq:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarSubcat_faq(req, res) {
  const contactId = req.params.id; // Obtener el ID del subcat_faq de los parámetros de la URL

  if (!contactId) {
    return res
      .status(400)
      .json({ error: "ID del subcat_faq no proporcionado" });
  }

  try {
    await subcat_faqModel.eliminarSubcat_faq(req.pool, contactId);
    res.status(200).json({ message: "subcat_faq eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el subcat_faq:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllSubcat_faqs,
  createSubcat_faq,
  eliminarSubcat_faq,
};
