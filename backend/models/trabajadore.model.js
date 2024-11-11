const { pool } = require("../app");

async function getAllTrabajadores(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT 
        t.rut, 
        t.nombre, 
        t.apellido, 
        t.telefono, 
        t.correo, 
        p.posicion AS posicions, 
        t.password, 
        t.estado 
      FROM 
        trabajadores t
      JOIN 
      posicions p ON t.posicion = p.id;
          `);
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener trabajadores:", error);
    throw error;
  }
}

async function getTrabajadoreByRut(pool, rut) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM trabajadores WHERE rut = ?",
      [rut]
    );
    connection.release();
    return rows[0];
  } catch (error) {
    console.error("Error al obtener el trabajador por RUT:", error);
    throw error;
  }
}

async function createTrabajadore(pool, trabajadoreData) {
  const {
    rut,
    nombre,
    apellido,
    telefono,
    correo,
    posicion,
    password,
    estado,
  } = trabajadoreData;
  const sql =
    "INSERT INTO trabajadores (rut, nombre, apellido, telefono, correo, posicion, password, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(sql, [
      rut,
      nombre,
      apellido,
      telefono,
      correo,
      posicion,
      password,
      estado,
    ]);
    connection.release();
    return result;
  } catch (error) {
    console.error("Error al crear trabajador:", error);
    throw error;
  }
}

async function updateTrabajadore(pool, trabajadoreRut, trabajadoreData) {
  const {
    rut,
    nombre,
    apellido,
    telefono,
    correo,
    posicion,
    password,
    estado,
  } = trabajadoreData;
  const sql = `
    UPDATE trabajadores 
    SET nombre = ?, apellido = ?, telefono = ?, password = ? 
    WHERE rut = ?
  `;
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(sql, [
      nombre,
      apellido,
      telefono,
      password,
      trabajadoreRut,
    ]);
    connection.release();
    return result;
  } catch (error) {
    console.error("Error al actualizar trabajador:", error);
    throw error;
  }
}

async function eliminarTrabajadore(pool, trabajadoreRut) {
  try {
    const connection = await pool.getConnection();
    const sql = "DELETE FROM trabajadores WHERE rut = ?";
    const [result] = await connection.query(sql, [trabajadoreRut]);
    connection.release();
    return result;
  } catch (error) {
    console.error("Error al eliminar el trabajador:", error);
    throw error;
  }
}

async function getTrabajadoreById(pool, id) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM trabajadores WHERE id = ?",
      [id]
    );
    connection.release();
    return rows[0];
  } catch (error) {
    console.error("Error al obtener el trabajador por ID:", error);
    throw error;
  }
}

async function cambiarEstadoTrabajador(pool, trabajadoreRut, nuevoEstado) {
  const sql = "UPDATE trabajadores SET estado = ? WHERE rut = ?";
  return pool.query(sql, [nuevoEstado, trabajadoreRut]);
}

module.exports = {
  getAllTrabajadores,
  getTrabajadoreByRut,
  createTrabajadore,
  updateTrabajadore,
  eliminarTrabajadore,
  getTrabajadoreById,
  cambiarEstadoTrabajador,
};
