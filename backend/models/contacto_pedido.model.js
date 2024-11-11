const { pool } = require("../app");

async function getAllContactoPedidos(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM contacto_pedido");
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener contacto_pedidos:", error);
    throw error;
  }
}

async function createContactoPedido(pool, contactoData) {
  const {
    pedido_id,
    email,
    rut,
    nombre,
    apellido,
    telefono,
    region,
    comuna,
    direccion,
    apartamento,
    numeracion,
    instruccionesEspeciales,
  } = contactoData;
  const sql = `
    INSERT INTO contacto_pedido (pedido_id, email, rut, nombre, apellido, telefono, region, comuna, direccion, apartamento, numeracion, instruccionesEspeciales)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  await pool.query(sql, [
    pedido_id,
    email,
    rut,
    nombre,
    apellido,
    telefono,
    region,
    comuna,
    direccion,
    apartamento,
    numeracion,
    instruccionesEspeciales,
  ]);
}

async function eliminarContactoPedido(pool, contactId) {
  try {
    const sql = "DELETE FROM contacto_pedido WHERE id = ?";
    const [result] = await pool.query(sql, [contactId]);
    return result;
  } catch (error) {
    console.error("Error al eliminar el contacto_pedido:", error);
    throw error;
  }
}

async function getContactoPedidoByPedidoId(pool, pedidoId) {
  const connection = await pool.getConnection();
  const [contacto] = await connection.query(
    "SELECT * FROM contacto_pedido WHERE pedido_id = ?",
    [pedidoId]
  );
  connection.release();
  return contacto[0];
}

module.exports = {
  getAllContactoPedidos,
  createContactoPedido,
  eliminarContactoPedido,
  getContactoPedidoByPedidoId,
};
