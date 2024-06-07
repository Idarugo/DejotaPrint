const { pool } = require("../app");

async function getAllPosicions(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM posicions");
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener las posiciones:", error);
    throw error;
  }
}

async function createPosicion(pool, posicionData) {
  const { posicion } = posicionData;
  const sql = "INSERT INTO posicions (posicion) VALUES (?)";
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(sql, [posicion]);
    connection.release();
    return result;
  } catch (error) {
    console.error("Error al crear la posicion:", error);
    throw error;
  }
}

async function getPosicionById(pool, id) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM posicions WHERE id = ?",
      [id]
    );
    connection.release();
    return rows[0];
  } catch (error) {
    console.error("Error al obtener la posicion por ID:", error);
    throw error;
  }
}

async function updatePosicion(pool, id, posicionData) {
  const { posicion } = posicionData;
  const sql = "UPDATE posicion SET posicion = ? WHERE id = ?";
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(sql, [posicion, id]);
    connection.release();
    return result;
  } catch (error) {
    console.error("Error al actualizar la posicion:", error);
    throw error;
  }
}

async function eliminarPosicion(pool, id) {
  try {
    const connection = await pool.getConnection();
    const sql = "DELETE FROM posicion WHERE id = ?";
    const [result] = await connection.query(sql, [id]);
    connection.release();
    return result;
  } catch (error) {
    console.error("Error al eliminar la posicion:", error);
    throw error;
  }
}

module.exports = {
  getAllPosicions,
  createPosicion,
  getPosicionById,
  updatePosicion,
  eliminarPosicion,
};
