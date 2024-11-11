const descuentoModel = require("../models/descuento.model.js");

async function getAllDescuentos(req, res) {
  try {
    const descuentos = await descuentoModel.getAllDescuentos(req.pool);
    // Formatear la fecha de expiración aquí
    descuentos.forEach((descuento) => {
      if (descuento.fecha_fin) {
        descuento.fecha_expiracion = new Date(descuento.fecha_fin)
          .toISOString()
          .split("T")[0];
      }
    });
    res.json(descuentos);
  } catch (error) {
    console.error("Error al obtener los descuentos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getDescuentoByCodigo(req, res) {
  const { codigo } = req.params;
  const { productos } = req.query; // Productos en el carrito

  try {
    const descuento = await descuentoModel.getDescuentoByCodigo(
      req.pool,
      codigo,
      productos
    );
    if (!descuento) {
      return res
        .status(404)
        .json({ error: "Descuento no encontrado o no aplicable" });
    }
    res.json(descuento);
  } catch (error) {
    console.error("Error al obtener el descuento por código:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createDescuento(req, res) {
  const { codigo, descuento, fecha_expiracion, productos_validos } = req.body;

  if (!codigo || !descuento || !fecha_expiracion || !productos_validos) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const descuentoData = {
    codigo,
    descuento,
    fecha_inicio: new Date(),
    fecha_fin: fecha_expiracion,
    estado: true,
    productos: productos_validos,
  };

  try {
    const result = await descuentoModel.createDescuento(
      req.pool,
      descuentoData
    );
    res.status(201).json({
      message: "Descuento creado exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear el descuento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function updateDescuento(req, res) {
  const descuentoId = req.params.id;
  const { codigo, descuento, fecha_expiracion, productos_validos } = req.body;

  if (!descuentoId) {
    return res.status(400).json({ error: "ID del descuento no proporcionado" });
  }

  if (!codigo || !descuento || !fecha_expiracion || !productos_validos) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const descuentoData = {
    codigo,
    descuento,
    fecha_inicio: new Date(),
    fecha_fin: fecha_expiracion,
    estado: true,
    productos: productos_validos,
  };

  try {
    await descuentoModel.updateDescuento(req.pool, descuentoId, descuentoData);
    res.status(200).json({ message: "Descuento actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el descuento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function deleteDescuento(req, res) {
  const descuentoId = req.params.id;

  if (!descuentoId) {
    return res.status(400).json({ error: "ID del descuento no proporcionado" });
  }

  try {
    await descuentoModel.deleteDescuento(req.pool, descuentoId);
    res.status(200).json({ message: "Descuento eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el descuento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllDescuentos,
  getDescuentoByCodigo,
  createDescuento,
  updateDescuento,
  deleteDescuento,
};
