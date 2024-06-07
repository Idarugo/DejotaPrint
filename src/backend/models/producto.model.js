const { pool } = require("../app");

async function getAllProductos(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
    SELECT 
    p.*, 
    ip.url_imagen, 
    sc.nombre AS nombre_subcategoria, 
    c.nombre AS nombre_categoria
FROM 
    productos p
LEFT JOIN 
    imagenesProducto ip ON p.id = ip.producto_id
LEFT JOIN 
    subcategorias sc ON p.subcategoria = sc.id
LEFT JOIN 
    categorias c ON sc.categoria = c.id;
`);
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
}

async function createProducto(pool, productoData) {
  const { nombre, descripcion, subcategoria, precio, cantidad } = productoData;
  const sql =
    "INSERT INTO productos (nombre, descripcion, subcategoria, precio, cantidad) VALUES (?, ?, ?, ?, ?)";
  return pool.query(sql, [nombre, descripcion, subcategoria, precio, cantidad]);
}

async function updateProducto(pool, productoId, productoData) {
  const { nombre, descripcion, subcategoria, precio, cantidad } = productoData;
  const sql =
    "UPDATE productos SET nombre = ?, descripcion = ?, subcategoria = ?, precio = ? , cantidad = ? WHERE id = ?";
  return pool.query(sql, [
    nombre,
    descripcion,
    subcategoria,
    precio,
    cantidad,
    productoId,
  ]);
}

async function eliminarProducto(pool, productoId) {
  try {
    const sql = "DELETE FROM productos WHERE id = ?";
    const [result] = await pool.query(sql, [productoId]);
    return result;
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
}

async function getProductoById(pool, id) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM productos WHERE id = ?",
      [id]
    );
    connection.release();
    return rows[0];
  } catch (error) {
    console.error("Error al obtener el producto por ID:", error);
    throw error;
  }
}

async function obtenerProductosRelacionados(productoId) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT p.* FROM productos p INNER JOIN ofertas o ON p.id = o.producto_id WHERE o.estado = 1 AND o.fecha_fin > NOW() AND o.fecha_inicio < NOW() AND o.producto_id != ?;",
      [productoId]
    );
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener productos relacionados:", error);
    throw error;
  }
}

async function getProductosConImagenes(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT p.id, p.nombre, p.descripcion, p.precio, p.cantidad, ip.url_imagen
      FROM productos p
      LEFT JOIN imagenesProducto ip ON p.id = ip.producto_id
    `);
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener productos con imágenes:", error);
    throw error;
  }
}

async function getLastProductosByCategoria(pool, categoriaId) {
  try {
    const connection = await pool.getConnection();
    const query = `
      SELECT 
        p.*, 
        o.precio_descuento, 
        ip.url_imagen 
      FROM 
        productos p
      LEFT JOIN 
        ofertas o ON p.id = o.producto_id
      LEFT JOIN 
        imagenesProducto ip ON p.id = ip.producto_id
      WHERE 
        p.subcategoria IN (SELECT id FROM subcategorias WHERE categoria = ?)
      ORDER BY 
        p.id DESC
      LIMIT 5
    `;
    const [rows] = await connection.query(query, [categoriaId]);
    connection.release();
    return rows;
  } catch (error) {
    console.error(
      "Error al obtener los últimos productos por categoría:",
      error
    );
    throw error;
  }
}

module.exports = {
  getAllProductos,
  createProducto,
  updateProducto,
  eliminarProducto,
  getProductoById,
  obtenerProductosRelacionados,
  getProductosConImagenes,
  getLastProductosByCategoria,
};
