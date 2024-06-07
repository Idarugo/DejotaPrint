const mysql = require("mysql");

async function getAllPedidos(pool) {
  const connection = await pool.getConnection();
  const [rows] = await connection.query("SELECT * FROM pedidos");
  connection.release();
  return rows;
}

async function getPedidoById(pool, pedidoId) {
  const connection = await pool.getConnection();
  const [pedido] = await connection.query(
    "SELECT * FROM pedidos WHERE id = ?",
    [pedidoId]
  );
  connection.release();
  return pedido[0];
}

async function createPedido(pool, pedidoData) {
  const { metodo_envio, costo_envio, metodo_pago, total } = pedidoData;
  const sql = `
    INSERT INTO pedidos (metodo_envio, costo_envio, metodo_pago, total)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await pool.query(sql, [
    metodo_envio,
    costo_envio,
    metodo_pago,
    total,
  ]);
  return result; // Esto debería devolver el insertId
}

async function eliminarPedido(pool, pedidoId) {
  const sql = "DELETE FROM pedidos WHERE id = ?";
  const result = await pool.query(sql, [pedidoId]);
  return result;
}

module.exports = {
  getAllPedidos,
  getPedidoById,
  createPedido,
  eliminarPedido,
};
