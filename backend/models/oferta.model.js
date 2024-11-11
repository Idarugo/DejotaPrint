const { pool } = require("../app");

async function getAllOfertas(pool) {
  try {
    const connection = await pool.getConnection();
    const sql = `
      SELECT ofertas.*, productos.nombre AS nombre_producto
      FROM ofertas
      INNER JOIN productos ON ofertas.producto_id = productos.id
    `;
    const [rows] = await connection.query(sql);
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener ofertas:", error);
    throw error;
  }
}

async function getAllOfertasEspeciales(pool) {
  try {
    const connection = await pool.getConnection();
    const sql = `
      SELECT ofertas.*, 
             productos.nombre AS nombre_producto, 
             productos.descripcion AS descripcion_producto, 
             productos.precio AS precio_producto, 
             productos.es_personalizado, 
             GROUP_CONCAT(imagenesProducto.url_imagen SEPARATOR ',') AS imagenes
      FROM ofertas
      INNER JOIN productos ON ofertas.producto_id = productos.id
      LEFT JOIN imagenesProducto ON productos.id = imagenesProducto.producto_id
      GROUP BY ofertas.id, ofertas.producto_id;
    `;
    const [rows] = await connection.query(sql);
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener ofertas especiales:", error);
    throw error;
  }
}

async function createOferta(pool, ofertaData) {
  const { producto_id, precio_descuento, fecha_inicio, fecha_fin, estado } =
    ofertaData;
  const sql =
    "INSERT INTO ofertas (producto_id, precio_descuento, fecha_inicio, fecha_fin, estado) VALUES (?, ?, ?, ?, ?)";
  return pool.query(sql, [
    producto_id,
    precio_descuento,
    fecha_inicio,
    fecha_fin,
    estado,
  ]);
}

async function updateOferta(pool, ofertaId, ofertaData) {
  const { producto_id, precio_descuento, fecha_inicio, fecha_fin, estado } =
    ofertaData;
  const sql =
    "UPDATE ofertas SET producto_id = ?, precio_descuento = ?, fecha_inicio = ?, fecha_fin = ?, estado = ? WHERE id = ?";
  return pool.query(sql, [
    producto_id,
    precio_descuento,
    fecha_inicio,
    fecha_fin,
    estado,
    ofertaId,
  ]);
}

async function eliminarOferta(pool, ofertaId) {
  try {
    const sql = "DELETE FROM ofertas WHERE id = ?";
    const [result] = await pool.query(sql, [ofertaId]);
    return result;
  } catch (error) {
    console.error("Error al eliminar la oferta:", error);
    throw error;
  }
}

async function getOfertaById(pool, id) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM ofertas WHERE id = ?",
      [id]
    );
    connection.release();
    return rows[0];
  } catch (error) {
    console.error("Error al obtener la oferta por ID:", error);
    throw error;
  }
}

async function getOfertaByProductoId(pool, productoId) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM ofertas WHERE producto_id = ?",
      [productoId]
    );
    connection.release();
    return rows[0];
  } catch (error) {
    console.error("Error al obtener la oferta por ID de producto:", error);
    throw error;
  }
}

async function cambiarEstadoOferta(pool, ofertaId, nuevoEstado) {
  const sql = "UPDATE ofertas SET estado = ? WHERE id = ?";
  return pool.query(sql, [nuevoEstado, ofertaId]);
}

module.exports = {
  getAllOfertas,
  getAllOfertasEspeciales,
  createOferta,
  updateOferta,
  eliminarOferta,
  getOfertaById,
  getOfertaByProductoId,
  cambiarEstadoOferta,
};
