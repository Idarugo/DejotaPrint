const { pool } = require("../app");

async function getAllPlantillas(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM plantillas");
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener plantillas:", error);
    throw error;
  }
}

async function createPlantilla(pool, plantillaData) {
  const { nombre, descripcion, tipo, ruta_archivo, etiquetas } = plantillaData;
  const sql =
    "INSERT INTO plantillas (nombre, descripcion, tipo, ruta_archivo, etiquetas) VALUES (?, ?, ?, ?, ?)";
  return pool.query(sql, [nombre, descripcion, tipo, ruta_archivo, etiquetas]);
}

async function updatePlantilla(pool, id, plantillaData) {
  const { nombre, descripcion, tipo, ruta_archivo, etiquetas } = plantillaData;
  const sql =
    "UPDATE plantillas SET nombre = ?, descripcion = ?, tipo = ?, ruta_archivo = ?, etiquetas = ? WHERE id = ?";
  return pool.query(sql, [
    nombre,
    descripcion,
    tipo,
    ruta_archivo,
    etiquetas,
    id,
  ]);
}

async function eliminarPlantilla(pool, plantillaId) {
  try {
    const sql = "DELETE FROM plantillas WHERE id = ?";
    const [result] = await pool.query(sql, [plantillaId]);
    return result;
  } catch (error) {
    console.error("Error al eliminar la plantilla:", error);
    throw error;
  }
}

module.exports = {
  getAllPlantillas,
  createPlantilla,
  updatePlantilla,
  eliminarPlantilla,
};
