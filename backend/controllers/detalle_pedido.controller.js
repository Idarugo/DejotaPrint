const detalle_pedidoModel = require("../models/detalle_pedido.model");

async function getAllDetalle_pedidos(req, res) {
  try {
    const detalle_pedidos = await detalle_pedidoModel.getAllDetallePedidos(
      req.pool
    );
    res.json(detalle_pedidos);
  } catch (error) {
    console.error("Error al obtener los detalle_pedidos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createDetalle_pedido(req, res) {
  const { pedido_id, producto_id, cantidad, precio } = req.body;

  if (!pedido_id || !producto_id || !cantidad || !precio) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const detalle_pedidoData = { pedido_id, producto_id, cantidad, precio };

  try {
    const result = await detalle_pedidoModel.createDetalle_pedido(
      req.pool,
      detalle_pedidoData
    );
    console.log("Detalle de pedido creado correctamente:", result);
    res.status(201).json({
      message: "Detalle de pedido creado exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear el detalle de pedido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarDetalle_pedido(req, res) {
  const detallePedidoId = req.params.id;

  if (!detallePedidoId) {
    return res
      .status(400)
      .json({ error: "ID del detalle de pedido no proporcionado" });
  }

  try {
    await detalle_pedidoModel.eliminarDetalle_pedido(req.pool, detallePedidoId);
    res
      .status(200)
      .json({ message: "Detalle de pedido eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el detalle de pedido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllDetalle_pedidos,
  createDetalle_pedido,
  eliminarDetalle_pedido,
};
