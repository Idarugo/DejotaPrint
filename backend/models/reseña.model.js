const { pool } = require("../app");

async function getAllReseñas(pool) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(`
    SELECT r.*, p.nombre AS nombre_producto 
    FROM reseñas r 
    JOIN productos p ON r.producto_id = p.id;
    `);
    return rows;
  } catch (error) {
    console.error("Error al obtener reseñas:", error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

async function createReseña(pool, reseñaData) {
  const { producto_id, clasificacion, mensaje, nombre, correo, fecha } =
    reseñaData;
  const sql =
    "INSERT INTO reseñas (producto_id, clasificacion, mensaje, nombre, correo, fecha) VALUES (?, ?, ?, ?, ?, ?)";
  try {
    const [result] = await pool.query(sql, [
      producto_id,
      clasificacion,
      mensaje,
      nombre,
      correo,
      fecha,
    ]);
    return result;
  } catch (error) {
    console.error("Error al insertar la reseña en la base de datos:", error);
    throw error;
  }
}

async function eliminarReseña(pool, reseñaId) {
  try {
    const sql = "DELETE FROM reseñas WHERE id = ?";
    const [result] = await pool.query(sql, [reseñaId]);
    return result;
  } catch (error) {
    console.error("Error al eliminar el reseña:", error);
    throw error;
  }
}

async function getReseñasByProductoId(pool, productoId) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM reseñas WHERE producto_id = ?",
      [productoId]
    );
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener reseñas por ID de producto:", error);
    throw error;
  }
}

module.exports = {
  getAllReseñas,
  createReseña,
  eliminarReseña,
  getReseñasByProductoId,
};
