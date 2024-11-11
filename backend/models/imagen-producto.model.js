const { pool } = require("../app");

async function getAllImagenProductos(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT ip.id, p.nombre AS nombre_producto, ip.url_imagen
      FROM productos p
      INNER JOIN imagenesProducto ip ON p.id = ip.producto_id
    `);
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener imagen Productos:", error);
    throw error;
  }
}

async function getImagenProductoById(pool, imagenProductoId) {
  try {
    const sql = "SELECT * FROM imagenesProducto WHERE id = ?";
    const [rows] = await pool.query(sql, [imagenProductoId]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error("Error al obtener la imagen del producto por ID:", error);
    throw error;
  }
}

async function getImagenesByProductoId(pool, producto_id) {
  try {
    const sql = "SELECT * FROM imagenesProducto WHERE producto_id = ?";
    const [rows] = await pool.query(sql, [producto_id]);
    return rows;
  } catch (error) {
    console.error("Error al obtener las imágenes del producto por ID:", error);
    throw error;
  }
}

async function createImagenProducto(pool, imagenProductoData) {
  const { producto_id, url_imagen } = imagenProductoData;
  const sql =
    "INSERT INTO imagenesProducto (producto_id, url_imagen) VALUES (?, ?)";
  return pool.query(sql, [producto_id, url_imagen]);
}

async function updateImagenProducto(
  pool,
  imagenProductoId,
  imagenProductoData
) {
  const { producto_id, url_imagen } = imagenProductoData;
  const sql =
    "UPDATE imagenesProducto SET producto_id = ?, url_imagen = ? WHERE id = ?";
  return pool.query(sql, [producto_id, url_imagen, imagenProductoId]);
}

async function obtenerImagenUrl(pool, imagenProductoId) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT url_imagen FROM imagenesProducto WHERE id = ?",
      [imagenProductoId]
    );
    connection.release();
    return rows.length ? rows[0].url_imagen : null;
  } catch (error) {
    console.error("Error al obtener la URL de la imagen:", error);
    throw error;
  }
}

async function eliminarImagenProducto(pool, imagenProductoId) {
  try {
    const sql = "DELETE FROM imagenesProducto WHERE id = ?";
    const [result] = await pool.query(sql, [imagenProductoId]);
    return result;
  } catch (error) {
    console.error("Error al eliminar el imagen producto:", error);
    throw error;
  }
}

module.exports = {
  getAllImagenProductos,
  getImagenProductoById,
  getImagenesByProductoId,
  createImagenProducto,
  updateImagenProducto,
  obtenerImagenUrl,
  eliminarImagenProducto,
};
