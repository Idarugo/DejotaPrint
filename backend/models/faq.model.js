const { pool } = require("../app");

async function getAllFaqs(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT  f.id, f.pregunta, f.respuesta, f.fecha_creacion, f.fecha_actualizacion, s.nombre AS nombre_subcategoria, c.nombre AS nombre_categoria FROM faqs f JOIN  subcat_faq s ON f.subcat_id = s.id JOIN cat_faq c ON s.categoria = c.id;"
    );
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener faqs:", error);
    throw error;
  }
}

async function getAllPreguntasFrecuentes(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM faqs");
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener faqs:", error);
    throw error;
  }
}

async function createFaq(pool, faqData) {
  const {
    pregunta,
    respuesta,
    subcat_id,
    fecha_creacion,
    fecha_actualizacion,
  } = faqData;
  const sql =
    "INSERT INTO faqs (pregunta, respuesta, subcat_id, fecha_creacion, fecha_actualizacion) VALUES (?, ?, ?, ?, ?)";
  return pool.query(sql, [
    pregunta,
    respuesta,
    subcat_id,
    fecha_creacion,
    fecha_actualizacion,
  ]);
}

async function eliminarFaq(pool, faqId) {
  try {
    const sql = "DELETE FROM faqs WHERE id = ?";
    const [result] = await pool.query(sql, [faqId]);
    return result;
  } catch (error) {
    console.error("Error al eliminar el faq:", error);
    throw error;
  }
}

async function updateFaq(pool, faqId, faqData) {
  const {
    pregunta,
    respuesta,
    subcat_id,
    fecha_creacion,
    fecha_actualizacion,
  } = faqData;
  const sql =
    "UPDATE faqs SET pregunta = ?, respuesta = ?, subcat_id = ?, fecha_creacion = ?, fecha_actualizacion = ? WHERE id = ?";
  return pool.query(sql, [
    pregunta,
    respuesta,
    subcat_id,
    fecha_creacion,
    fecha_actualizacion,
    faqId,
  ]);
}

module.exports = {
  getAllFaqs,
  getAllPreguntasFrecuentes,
  createFaq,
  eliminarFaq,
  updateFaq,
};
