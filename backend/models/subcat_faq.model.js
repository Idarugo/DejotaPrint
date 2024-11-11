const { pool } = require("../app");

async function getAllSubcat_faqs(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM subcat_faq");
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener subcat_faq:", error);
    throw error;
  }
}

async function createSubcat_faq(pool, subcat_faqoData) {
  const { nombre, categoria } = subcat_faqoData;
  const sql = "INSERT INTO subcat_faq (nombre, categoria) VALUES (?, ?)";
  return pool.query(sql, [nombre, categoria]);
}

async function eliminarSubcat_faq(pool, subcat_faqId) {
  try {
    const sql = "DELETE FROM subcat_faqs WHERE id = ?";
    const [result] = await pool.query(sql, [subcat_faqId]);
    return result;
  } catch (error) {
    console.error("Error al eliminar el subcat_faq:", error);
    throw error;
  }
}

module.exports = {
  getAllSubcat_faqs,
  createSubcat_faq,
  eliminarSubcat_faq,
};
