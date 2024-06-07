const { pool } = require("../app");

async function getAllMarcas(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM marcas");
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener las marcas:", error);
    throw error;
  }
}

async function getAllMarcasActivas(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM marcas WHERE estado = 1"
    );
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener las marcas activas:", error);
    throw error;
  }
}

async function createMarca(pool, marcaData) {
  const { nombre, imagen, estado } = marcaData;
  const sql = "INSERT INTO marcas (nombre, imagen, estado) VALUES (?, ?, ?)";
  return pool.query(sql, [nombre, imagen, estado]);
}

async function updateMarca(pool, id, marcaData) {
  const { nombre, imagen, estado } = marcaData;
  let sql;
  let params;

  if (imagen) {
    sql = "UPDATE marcas SET nombre = ?, imagen = ?, estado = ? WHERE id = ?";
    params = [nombre, imagen, estado, id];
  } else {
    sql = "UPDATE marcas SET nombre = ?, estado = ? WHERE id = ?";
    params = [nombre, estado, id];
  }

  return pool.query(sql, params);
}

async function eliminarMarca(pool, marcaId) {
  const sql = "DELETE FROM marcas WHERE id = ?";
  try {
    return await pool.query(sql, [marcaId]);
  } catch (error) {
    console.error("Error al eliminar la marca:", error);
    throw error;
  }
}

async function cambiarEstadoMarca(pool, marcaId, nuevoEstado) {
  const sql = "UPDATE marcas SET estado = ? WHERE id = ?";
  return pool.query(sql, [nuevoEstado, marcaId]);
}

module.exports = {
  getAllMarcas,
  getAllMarcasActivas,
  createMarca,
  updateMarca,
  eliminarMarca,
  cambiarEstadoMarca,
};
