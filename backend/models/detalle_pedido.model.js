const { pool } = require("../app");

async function getAllDetallePedidos(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM detalle_pedidos");
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener detalle_pedidos:", error);
    throw error;
  }
}

async function createDetallePedido(pool, detalleData) {
  const { pedido_id, producto_id, cantidad, precio } = detalleData;
  const sql = `
    INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad, precio)
    VALUES (?, ?, ?, ?)
  `;
  await pool.query(sql, [pedido_id, producto_id, cantidad, precio]);
}

async function eliminarDetallePedido(pool, contactId) {
  try {
    const sql = "DELETE FROM detalle_pedidos WHERE id = ?";
    const [result] = await pool.query(sql, [contactId]);
    return result;
  } catch (error) {
    console.error("Error al eliminar el detalle_pedido:", error);
    throw error;
  }
}

async function getDetallePedidoByPedidoId(pool, pedidoId) {
  const connection = await pool.getConnection();
  const [detalles] = await connection.query(
    "SELECT * FROM detalle_pedidos WHERE pedido_id = ?",
    [pedidoId]
  );
  connection.release();
  return detalles;
}

module.exports = {
  getAllDetallePedidos,
  createDetallePedido,
  eliminarDetallePedido,
  getDetallePedidoByPedidoId,
};
