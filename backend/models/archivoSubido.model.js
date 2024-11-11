const { pool } = require("../app");

async function getAllArchivosSubidos(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM archivosSubidos");
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener elementos de archivos subidos:", error);
    throw error;
  }
}

async function createArchivoSubido(pool, archivoData) {
  const { producto_id, color, diseño, texto_personalizado, url_archivo } =
    archivoData;
  const sql =
    "INSERT INTO archivosSubidos (producto_id, color, diseño, texto_personalizado, url_archivo, created_at) VALUES (?, ?, ?, ?, ?, NOW())";
  return pool.query(sql, [
    producto_id,
    color,
    diseño,
    texto_personalizado,
    url_archivo,
  ]);
}

async function obtenerImagenUrl(pool, archivoSubidoId) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT url_archivo FROM archivosSubidos WHERE id = ?",
      [archivoSubidoId]
    );
    connection.release();
    return rows.length ? rows[0].url_archivo : null;
  } catch (error) {
    console.error("Error al obtener la URL de la imagen:", error);
    throw error;
  }
}

async function eliminarArchivoSubido(pool, archivoSubidoId) {
  try {
    const sql = "DELETE FROM archivosSubidos WHERE id = ?";
    const [result] = await pool.query(sql, [archivoSubidoId]);
    return result;
  } catch (error) {
    console.error("Error al eliminar archivo subido:", error);
    throw error;
  }
}

async function eliminarArchivosPorProductoId(pool, productoId) {
  try {
    const sql = "DELETE FROM archivosSubidos WHERE producto_id = ?";
    const [result] = await pool.query(sql, [productoId]);
    return result;
  } catch (error) {
    console.error("Error al eliminar archivos subidos por producto ID:", error);
    throw error;
  }
}

module.exports = {
  getAllArchivosSubidos,
  createArchivoSubido,
  obtenerImagenUrl,
  eliminarArchivoSubido,
  eliminarArchivosPorProductoId,
};
