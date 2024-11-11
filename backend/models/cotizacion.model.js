const { pool } = require("../app");

async function getAllCotizaciones(pool) {
  try {
    const connection = await pool.getConnection();
    const query = `
      SELECT 
        cotizacion.*, 
        productos.nombre AS nombre_producto 
      FROM 
        cotizacion 
      JOIN 
        productos ON cotizacion.producto_id = productos.id
    `;
    const [rows] = await connection.query(query);
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener cotizaciones:", error);
    throw error;
  }
}

async function createCotizacion(pool, cotizacionData) {
  const { producto_id, nombre, email, telefono, cantidad, descripcion } =
    cotizacionData;
  const sql =
    "INSERT INTO cotizacion (producto_id, nombre, email, telefono, cantidad, descripcion) VALUES (?, ?, ?, ?, ?, ?)";
  const [result] = await pool.query(sql, [
    producto_id,
    nombre,
    email,
    telefono,
    cantidad,
    descripcion,
  ]);
  return result;
}

async function eliminarCotizacion(pool, cotizacionId) {
  try {
    const sql = "DELETE FROM cotizacion WHERE id = ?";
    const [result] = await pool.query(sql, [cotizacionId]);
    return result;
  } catch (error) {
    console.error("Error al eliminar la cotizacion:", error);
    throw error;
  }
}

async function getProductoNombre(pool, productoId) {
  try {
    const sql = "SELECT nombre FROM productos WHERE id = ?";
    const [rows] = await pool.query(sql, [productoId]);
    if (rows.length > 0) {
      return rows[0].nombre;
    } else {
      throw new Error("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el nombre del producto:", error);
    throw error;
  }
}

module.exports = {
  getAllCotizaciones,
  createCotizacion,
  eliminarCotizacion,
  getProductoNombre,
};
