const { pool } = require("../app");

async function getAllContactos(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM contactos");
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener contactos:", error);
    throw error;
  }
}

async function createContacto(pool, contactoData) {
  const { nombre, correo, telefono, mensaje, fecha } = contactoData;
  const sql =
    "INSERT INTO contactos (nombre, correo, telefono, mensaje, fecha) VALUES (?, ?, ?, ?, ?)";
  return pool.query(sql, [nombre, correo, telefono, mensaje, fecha]);
}

async function eliminarContacto(pool, contactId) {
  try {
    const sql = "DELETE FROM contactos WHERE id = ?";
    const [result] = await pool.query(sql, [contactId]);
    return result;
  } catch (error) {
    console.error("Error al eliminar el contacto:", error);
    throw error;
  }
}

module.exports = {
  getAllContactos,
  createContacto,
  eliminarContacto,
};
