const { pool } = require("../app");

async function getAllCat_faqs(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM cat_faq");
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener cat_faqs:", error);
    throw error;
  }
}

async function createCat_faq(pool, cat_faqData) {
  const { nombre } = cat_faqData;
  const sql = "INSERT INTO cat_faq (nombre) VALUES (?)";
  return pool.query(sql, [nombre]);
}

async function eliminarCat_faq(pool, contactId) {
  try {
    const sql = "DELETE FROM cat_faq WHERE id = ?";
    const [result] = await pool.query(sql, [contactId]);
    return result;
  } catch (error) {
    console.error("Error al eliminar el cat_faq:", error);
    throw error;
  }
}

module.exports = {
  getAllCat_faqs,
  createCat_faq,
  eliminarCat_faq,
};
