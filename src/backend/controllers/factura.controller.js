const facturaModel = require("../models/factura.model");

async function getAllFacturas(req, res) {
  try {
    const facturas = await facturaModel.getAllFacturas(req.pool);
    res.json(facturas);
  } catch (error) {
    console.error("Error al obtener los facturas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createFactura(req, res) {
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
  } = req.body;

  if (
    !pedido_id ||
    !nombre ||
    !apellido ||
    !rut ||
    !direccion ||
    !correo ||
    !telefono ||
    !region ||
    !comuna ||
    !giro
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const facturaData = {
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
  };

  try {
    const result = await facturaModel.createFactura(req.pool, facturaData);
    console.log("Factura creado correctamente:", result);
    res.status(201).json({
      message: "Factura creado exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear el factura:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarFactura(req, res) {
  const contactId = req.params.id; // Obtener el ID del factura de los parámetros de la URL

  if (!contactId) {
    return res.status(400).json({ error: "ID del factura no proporcionado" });
  }

  try {
    await facturaModel.eliminarFactura(req.pool, contactId);
    res.status(200).json({ message: "factura eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el factura:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllFacturas,
  createFactura,
  eliminarFactura,
};
