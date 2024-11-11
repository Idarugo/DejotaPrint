require("dotenv").config();
const axios = require("axios");
const facturaModel = require("../models/factura.model");

async function getAllFacturas(req, res) {
  try {
    const facturas = await facturaModel.getAllFacturas(req.pool);
    res.json(facturas);
  } catch (error) {
    console.error("Error al obtener las facturas:", error);
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
    !region ||
    !comuna ||
    !giro
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  if (!validarEmail(correo) || !validarRUT(rut)) {
    return res.status(400).json({ error: "Datos inválidos" });
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
    console.log("Factura creada correctamente:", result);
    res.status(201).json({
      message: "Factura creada exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear la factura:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarFactura(req, res) {
  const facturaId = req.params.id;

  if (!facturaId) {
    return res.status(400).json({ error: "ID de la factura no proporcionado" });
  }

  try {
    await facturaModel.eliminarFactura(req.pool, facturaId);
    res.status(200).json({ message: "Factura eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la factura:", error);
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

const generarFacturaSII = async (req, res) => {
  const pedidoData = req.body;

  // URL de la API del SII
  const SII_API_URL = process.env.SII_API_URL;

  // Datos de autenticación
  const SII_AUTH_TOKEN = process.env.SII_AUTH_TOKEN;

  try {
    const response = await axios.post(SII_API_URL, pedidoData, {
      headers: {
        Authorization: `Bearer ${SII_AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return res.status(200).json({
        message: "Factura generada correctamente en el SII",
        data: response.data,
      });
    } else {
      return res.status(response.status).json({
        message: "Error al generar la factura en el SII",
        error: response.data,
      });
    }
  } catch (error) {
    console.error("Error al generar la factura en el SII:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

module.exports = {
  getAllFacturas,
  createFactura,
  eliminarFactura,
  generarFacturaSII,
};
