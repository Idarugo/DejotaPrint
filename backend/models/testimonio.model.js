const { pool } = require("../app");

async function getAllTestimonios(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM testimonios");
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener testimonios:", error);
    throw error;
  }
}

async function getApprovedTestimonios(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM testimonios WHERE estado = 1"
    );
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener testimonios aprobados:", error);
    throw error;
  }
}

async function createTestimonio(pool, testimonioData) {
  const { nombre, imagen_url, mensaje, titulo, empresa, estado } =
    testimonioData;
  const sql =
    "INSERT INTO testimonios (nombre, imagen_url, mensaje, titulo, empresa, estado) VALUES (?, ?, ?, ?, ?, ?)";
  return pool.query(sql, [
    nombre,
    imagen_url,
    mensaje,
    titulo,
    empresa,
    estado,
  ]);
}

async function obtenerImagenUrl(pool, testimonioId) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT imagen_url FROM testimonios WHERE id = ?",
      [testimonioId]
    );
    connection.release();
    return rows.length ? rows[0].imagen_url : null;
  } catch (error) {
    console.error("Error al obtener la URL de la imagen:", error);
    throw error;
  }
}

async function eliminarTestimonio(pool, testimonioId) {
  try {
    const sql = "DELETE FROM testimonios WHERE id = ?";
    const [result] = await pool.query(sql, [testimonioId]);
    return result;
  } catch (error) {
    console.error("Error al eliminar el testimonio:", error);
    throw error;
  }
}

async function cambiarEstadoTestimonio(pool, testimonioId, nuevoEstado) {
  const sql = "UPDATE testimonios SET estado = ? WHERE id = ?";
  return pool.query(sql, [nuevoEstado, testimonioId]);
}

module.exports = {
  getAllTestimonios,
  getApprovedTestimonios,
  createTestimonio,
  obtenerImagenUrl,
  eliminarTestimonio,
  cambiarEstadoTestimonio,
};
