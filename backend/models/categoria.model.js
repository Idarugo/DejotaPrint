const { pool } = require("../app");

async function getAllCategorias(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM categorias");
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener categorias:", error);
    throw error;
  }
}

async function createCategoria(pool, categoriaData) {
  const { nombre } = categoriaData;
  const sql = "INSERT INTO categorias (nombre) VALUES (?)";
  const [result] = await pool.query(sql, [nombre]);
  return result;
}

async function updateCategoria(pool, id, categoriaData) {
  const { nombre } = categoriaData;
  const sql = "UPDATE categorias SET nombre = ? WHERE id = ?";
  const [result] = await pool.query(sql, [nombre, id]);
  return result;
}

async function eliminarCategoria(pool, categoriaId) {
  try {
    const sql = "DELETE FROM categorias WHERE id = ?";
    const [result] = await pool.query(sql, [categoriaId]);
    return result;
  } catch (error) {
    console.error("Error al eliminar el categoria:", error);
    throw error;
  }
}

module.exports = {
  getAllCategorias,
  createCategoria,
  updateCategoria,
  eliminarCategoria,
};
