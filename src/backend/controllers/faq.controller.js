const faqModel = require("../models/faq.model");

async function getAllFaqs(req, res) {
  try {
    const faqs = await faqModel.getAllFaqs(req.pool);
    res.json(faqs);
  } catch (error) {
    console.error("Error al obtener los faqs:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createFaq(req, res) {
  const { pregunta, respuesta, subcat_id, fecha_creacion } = req.body;

  if (!pregunta || !respuesta || !subcat_id || !fecha_creacion) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const faqData = {
    pregunta,
    respuesta,
    subcat_id,
    fecha_creacion,
    fecha_actualizacion: fecha_creacion, // Asignar la fecha de creación también como fecha de actualización
  };

  try {
    const result = await faqModel.createFaq(req.pool, faqData);
    console.log("faq creado correctamente:", result);
    res.status(201).json({
      message: "faq creado exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear el faq:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarFaq(req, res) {
  const faqId = req.params.id; // Obtener el ID del faq de los parámetros de la URL

  if (!faqId) {
    return res
      .status(400)
      .json({ error: "ID del Categoria Pregunta Frecuente no proporcionado" });
  }

  try {
    await faqModel.eliminarFaq(req.pool, faqId);
    res.status(200).json({ message: "faq eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el faq:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function updateFaq(req, res) {
  const faqId = req.params.id; // Obtener el ID del faq de los parámetros de la URL
  const {
    pregunta,
    respuesta,
    subcat_id,
    fecha_creacion,
    fecha_actualizacion,
  } = req.body;

  if (
    !pregunta ||
    !respuesta ||
    !subcat_id ||
    !fecha_creacion ||
    !fecha_actualizacion
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Convertir fechas a formato compatible con MySQL
  const formattedFechaCreacion = new Date(fecha_creacion)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  const formattedFechaActualizacion = new Date(fecha_actualizacion)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const faqData = {
    pregunta,
    respuesta,
    subcat_id,
    fecha_creacion: formattedFechaCreacion,
    fecha_actualizacion: formattedFechaActualizacion,
  };

  try {
    await faqModel.updateFaq(req.pool, faqId, faqData);
    res.status(200).json({ message: "faq actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el faq:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllFaqs,
  createFaq,
  eliminarFaq,
  updateFaq, // Asegúrate de exportar la función updateFaq
};
