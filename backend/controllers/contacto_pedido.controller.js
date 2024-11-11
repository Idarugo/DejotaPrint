const contactoPedidoModel = require("../models/contacto_pedido.model");

async function getAllContactoPedidos(req, res) {
  try {
    const contactoPedidos = await contactoPedidoModel.getAllContactoPedidos(
      req.pool
    );
    res.json(contactoPedidos);
  } catch (error) {
    console.error("Error al obtener contacto_pedidos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createContactoPedido(req, res) {
  const contactoData = req.body;

  if (
    !contactoData.pedido_id ||
    !contactoData.email ||
    !contactoData.rut ||
    !contactoData.nombre ||
    !contactoData.apellido ||
    !contactoData.telefono ||
    !contactoData.region ||
    !contactoData.comuna ||
    !contactoData.direccion ||
    !contactoData.numeracion
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  if (!validarEmail(contactoData.email) || !validarRUT(contactoData.rut)) {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  try {
    await contactoPedidoModel.createContactoPedido(req.pool, contactoData);
    res.status(201).json({ message: "Contacto de pedido creado exitosamente" });
  } catch (error) {
    console.error("Error al crear contacto_pedido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarContactoPedido(req, res) {
  const contactoPedidoId = req.params.id;

  if (!contactoPedidoId) {
    return res
      .status(400)
      .json({ error: "ID del contacto_pedido no proporcionado" });
  }

  try {
    await contactoPedidoModel.eliminarContactoPedido(
      req.pool,
      contactoPedidoId
    );
    res
      .status(200)
      .json({ message: "Contacto de pedido eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar contacto_pedido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

function validarEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}

function validarRUT(rut) {
  const re = /^\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]$/;
  return re.test(rut);
}

module.exports = {
  getAllContactoPedidos,
  createContactoPedido,
  eliminarContactoPedido,
};
