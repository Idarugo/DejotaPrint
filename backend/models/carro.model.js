const { pool } = require("../app");

async function getAllCarros(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM carro");
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener carros:", error);
    throw error;
  }
}

async function createCarro(pool, carroData) {
  const { producto_id, cantidad, session_id } = carroData;
  const sql =
    "INSERT INTO carro (producto_id, cantidad, session_id) VALUES (?, ?, ?)";
  return pool.query(sql, [producto_id, cantidad, session_id]);
}

async function eliminarCarro(pool, contactId) {
  try {
    const sql = "DELETE FROM carro WHERE id = ?";
    const [result] = await pool.query(sql, [contactId]);
    return result;
  } catch (error) {
    console.error("Error al eliminar el carro:", error);
    throw error;
  }
}

module.exports = {
  getAllCarros,
  createCarro,
  eliminarCarro,
};
