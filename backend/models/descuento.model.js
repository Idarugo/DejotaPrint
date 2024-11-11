const { pool } = require("../app");

async function getAllDescuentos(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT 
        d.*, 
        GROUP_CONCAT(p.nombre) AS productos_validos 
      FROM 
        descuentos d 
      LEFT JOIN 
        descuento_productos dp ON d.id = dp.descuento_id 
      LEFT JOIN 
        productos p ON dp.producto_id = p.id 
      GROUP BY 
        d.id;
    `);
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener los descuentos:", error);
    throw error;
  }
}

async function getDescuentoByCodigo(pool, codigo, productos) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      `SELECT d.* 
       FROM descuentos d
       JOIN descuento_productos dp ON d.id = dp.descuento_id
       WHERE d.codigo = ? 
       AND dp.producto_id IN (?)
       AND d.fecha_inicio <= CURDATE() 
       AND d.fecha_fin >= CURDATE() 
       AND d.estado = TRUE`,
      [codigo, productos]
    );
    connection.release();
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error al obtener el descuento por código:", error);
    throw error;
  }
}

async function getProductosValidos(pool, descuentoId) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT p.id, p.nombre FROM productos p JOIN descuento_productos dp ON p.id = dp.producto_id WHERE dp.descuento_id = ?",
      [descuentoId]
    );
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener los productos válidos:", error);
    throw error;
  }
}

async function createDescuento(pool, descuentoData) {
  const { codigo, descuento, fecha_inicio, fecha_fin, estado, productos } =
    descuentoData;

  try {
    const connection = await pool.getConnection();
    const sql =
      "INSERT INTO descuentos (codigo, descuento, fecha_inicio, fecha_fin, estado) VALUES (?, ?, ?, ?, ?)";
    const [result] = await connection.query(sql, [
      codigo,
      descuento,
      fecha_inicio,
      fecha_fin,
      estado,
    ]);

    if (productos && productos.length > 0) {
      const descuentoId = result.insertId;
      const productoInserts = productos.map((productoId) => [
        descuentoId,
        productoId,
      ]);
      await connection.query(
        "INSERT INTO descuento_productos (descuento_id, producto_id) VALUES ?",
        [productoInserts]
      );
    }

    connection.release();
    return result;
  } catch (error) {
    console.error("Error al crear el descuento:", error);
    throw error;
  }
}

async function updateDescuento(pool, descuentoId, descuentoData) {
  const { codigo, descuento, fecha_inicio, fecha_fin, estado, productos } =
    descuentoData;

  try {
    const connection = await pool.getConnection();
    const sql =
      "UPDATE descuentos SET codigo = ?, descuento = ?, fecha_inicio = ?, fecha_fin = ?, estado = ? WHERE id = ?";
    await connection.query(sql, [
      codigo,
      descuento,
      fecha_inicio,
      fecha_fin,
      estado,
      descuentoId,
    ]);

    await connection.query(
      "DELETE FROM descuento_productos WHERE descuento_id = ?",
      [descuentoId]
    );
    if (productos && productos.length > 0) {
      const productoInserts = productos.map((productoId) => [
        descuentoId,
        productoId,
      ]);
      await connection.query(
        "INSERT INTO descuento_productos (descuento_id, producto_id) VALUES ?",
        [productoInserts]
      );
    }

    connection.release();
  } catch (error) {
    console.error("Error al actualizar el descuento:", error);
    throw error;
  }
}

async function deleteDescuento(pool, descuentoId) {
  try {
    const connection = await pool.getConnection();

    // Eliminar registros relacionados en descuento_productos
    await connection.query(
      "DELETE FROM descuento_productos WHERE descuento_id = ?",
      [descuentoId]
    );

    // Eliminar el descuento en la tabla descuentos
    await connection.query("DELETE FROM descuentos WHERE id = ?", [
      descuentoId,
    ]);

    connection.release();
  } catch (error) {
    console.error("Error al eliminar el descuento:", error);
    throw error;
  }
}

module.exports = {
  getAllDescuentos,
  getDescuentoByCodigo,
  getProductosValidos,
  createDescuento,
  updateDescuento,
  deleteDescuento,
};
