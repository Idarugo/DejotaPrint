const { pool } = require("../app");

async function getAllFacturas(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM facturas");
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener facturas:", error);
    throw error;
  }
}

async function createFactura(pool, facturaData) {
  const {
    pedido_id,
    nombre,
    apellido,
    rut,
    direccion,
    correo,
    telefono,
    region,
    comuna,
    giro,
  } = facturaData;
  const sql = `
    INSERT INTO facturas (pedido_id, nombre, apellido, rut, direccion, correo, telefono, region, comuna, giro)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  await pool.query(sql, [
    pedido_id,
    nombre,
    apellido,
    rut,
    direccion,
    correo,
    telefono,
    region,
    comuna,
    giro,
  ]);
}

async function eliminarFactura(pool, contactId) {
  try {
    const sql = "DELETE FROM facturas WHERE id = ?";
    const [result] = await pool.query(sql, [contactId]);
    return result;
  } catch (error) {
    console.error("Error al eliminar el factura:", error);
    throw error;
  }
}

async function getFacturaByPedidoId(pool, pedidoId) {
  const connection = await pool.getConnection();
  const [factura] = await connection.query(
    "SELECT * FROM facturas WHERE pedido_id = ?",
    [pedidoId]
  );
  connection.release();
  return factura[0];
}

module.exports = {
  getAllFacturas,
  getFacturaByPedidoId,
  createFactura,
  eliminarFactura,
};
