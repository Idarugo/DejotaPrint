const cotizacionModel = require("../models/cotizacion.model");
const { enviarCorreo } = require("../utils/mailer");

async function getAllCotizaciones(req, res) {
  try {
    const cotizaciones = await cotizacionModel.getAllCotizaciones(req.pool);
    res.json(cotizaciones);
  } catch (error) {
    console.error("Error al obtener las cotizaciones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createCotizacion(req, res) {
  const { producto_id, nombre, email, telefono, cantidad, descripcion } =
    req.body;

  if (!producto_id || !nombre || !email || !telefono || !cantidad) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const cotizacionData = {
    producto_id,
    nombre,
    email,
    telefono,
    cantidad,
    descripcion,
  };

  try {
    const result = await cotizacionModel.createCotizacion(
      req.pool,
      cotizacionData
    );
    console.log("Cotización creada correctamente:", result);

    // Obtener el nombre del producto
    const connection = await req.pool.getConnection();
    const [productRows] = await connection.query(
      "SELECT nombre FROM productos WHERE id = ?",
      [producto_id]
    );
    connection.release();

    if (productRows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const productName = productRows[0].nombre;

    const correoAdmin = "dejotaprint@gmail.com"; // Correo del administrador

    const asuntoCliente = `Confirmación de tu solicitud de cotización`;
    const htmlCliente = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #27ae60;">Gracias por tu solicitud de cotización</h2>
        <p>Hemos recibido tu solicitud y te contactaremos pronto.</p>
        <h3>Detalles de la Cotización</h3>
        <p>Producto: ${productName}</p>
        <p>Cantidad: ${cantidad}</p>
        <p>Descripción: ${descripcion}</p>
        <p>Teléfono: ${telefono}</p>
      </div>
    `;

    const asuntoAdmin = `Nueva solicitud de cotización`;
    const htmlAdmin = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #27ae60;">Nueva solicitud de cotización recibida</h2>
        <h3>Detalles de la Cotización</h3>
        <p>Producto: ${productName}</p>
        <p>Nombre: ${nombre}</p>
        <p>Email: ${email}</p>
        <p>Teléfono: ${telefono}</p>
        <p>Cantidad: ${cantidad}</p>
        <p>Descripción: ${descripcion}</p>
      </div>
    `;

    // Enviar correos electrónicos
    await enviarCorreo(email, asuntoCliente, "", htmlCliente);
    await enviarCorreo(correoAdmin, asuntoAdmin, "", htmlAdmin);

    res.status(201).json({
      message: "Cotización creada exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear la cotización:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarCotizacion(req, res) {
  const cotizacionId = req.params.id; // Obtener el ID de la cotización de los parámetros de la URL

  if (!cotizacionId) {
    return res
      .status(400)
      .json({ error: "ID de la cotización no proporcionado" });
  }

  try {
    await cotizacionModel.eliminarCotizacion(req.pool, cotizacionId);
    res.status(200).json({ message: "Cotización eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la cotización:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllCotizaciones,
  createCotizacion,
  eliminarCotizacion,
};
