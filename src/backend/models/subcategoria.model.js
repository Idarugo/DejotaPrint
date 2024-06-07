const { pool } = require("../app");

async function getAllSubcategorias(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT subcategorias.id AS id, subcategorias.nombre AS nombre, subcategorias.categoria AS categoria, categorias.nombre AS categoria_nombre FROM subcategorias JOIN categorias ON subcategorias.categoria = categorias.id"
    );
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener Subcategorias:", error);
    throw error;
  }
}

async function createSubcategoria(pool, subcategoriaData) {
  const { nombre, categoria } = subcategoriaData;
  const sql = "INSERT INTO subcategorias (nombre, categoria) VALUES (?, ?)";
  const [result] = await pool.query(sql, [nombre, categoria]);
  return result;
}

async function updateSubcategoria(pool, id, subcategoriaData) {
  const { nombre, categoria } = subcategoriaData;
  const sql = "UPDATE subcategorias SET nombre = ?, categoria = ? WHERE id = ?";
  const [result] = await pool.query(sql, [nombre, categoria, id]);
  return result;
}

async function eliminarSubcategoria(pool, subcategoriaId) {
  try {
    const sql = "DELETE FROM subcategorias WHERE id = ?";
    const [result] = await pool.query(sql, [subcategoriaId]);
    return result;
  } catch (error) {
    console.error("Error al eliminar el subcategoria:", error);
    throw error;
  }
}

async function getSubcategoriaById(pool, id) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM subcategorias WHERE id = ?",
      [id]
    );
    connection.release();
    return rows[0];
  } catch (error) {
    console.error("Error al obtener la subcategoría por ID:", error);
    throw error;
  }
}

module.exports = {
  getAllSubcategorias,
  createSubcategoria,
  updateSubcategoria,
  eliminarSubcategoria,
  getSubcategoriaById,
};
