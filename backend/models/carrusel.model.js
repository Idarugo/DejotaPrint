const { pool } = require("../app");

async function getAllCarrusel(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM carrusel");
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener elementos del carrusel:", error);
    throw error;
  }
}

async function createCarrusel(pool, carruselData) {
  const { titulo, imagen_url, enlace, posicion, estado } = carruselData;
  const sql =
    "INSERT INTO carrusel (titulo, imagen_url, enlace, posicion, estado) VALUES (?, ?, ?, ?, ?)";
  return pool.query(sql, [titulo, imagen_url, enlace, posicion, estado]);
}

async function obtenerImagenUrl(pool, carruselId) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT imagen_url FROM carrusel WHERE id = ?",
      [carruselId]
    );
    connection.release();
    return rows.length ? rows[0].imagen_url : null;
  } catch (error) {
    console.error("Error al obtener la URL de la imagen:", error);
    throw error;
  }
}

async function eliminarCarrusel(pool, carruselId) {
  try {
    const sql = "DELETE FROM carrusel WHERE id = ?";
    const [result] = await pool.query(sql, [carruselId]);
    return result;
  } catch (error) {
    console.error("Error al eliminar el carrusel:", error);
    throw error;
  }
}

async function cambiarEstadoCarrusel(pool, carruselId, nuevoEstado) {
  const sql = "UPDATE carrusel SET estado = ? WHERE id = ?";
  return pool.query(sql, [nuevoEstado, carruselId]);
}

module.exports = {
  getAllCarrusel,
  createCarrusel,
  obtenerImagenUrl,
  eliminarCarrusel,
  cambiarEstadoCarrusel,
};
