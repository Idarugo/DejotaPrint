const pedidoModel = require("../models/pedido.model");
const contactoPedidoModel = require("../models/contacto_pedido.model");
const facturaModel = require("../models/factura.model");
const detallePedidoModel = require("../models/detalle_pedido.model");
const { enviarCorreo } = require("../utils/mailer");

async function getAllPedidos(req, res) {
  try {
    const pedidos = await pedidoModel.getAllPedidos(req.pool);
    res.json(pedidos);
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getPedidoById(req, res) {
  const pedidoId = req.params.id;
  try {
    const pedido = await pedidoModel.getPedidoById(req.pool, pedidoId);
    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }
    const contacto = await contactoPedidoModel.getContactoPedidoByPedidoId(
      req.pool,
      pedidoId
    );
    const factura = await facturaModel.getFacturaByPedidoId(req.pool, pedidoId);
    const detalles = await detallePedidoModel.getDetallePedidoByPedidoId(
      req.pool,
      pedidoId
    );

    res.json({
      ...pedido,
      contacto,
      factura,
      detalles,
    });
  } catch (error) {
    console.error("Error al obtener el pedido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

function formatoChileno(precio) {
  const precioEntero = Math.round(precio);
  return "$" + precioEntero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

async function createPedido(req, res) {
  const {
    metodo_envio,
    costo_envio,
    metodo_pago,
    total,
    contacto,
    factura,
    productos,
    descuentoAplicado,
  } = req.body;

  if (
    !metodo_envio ||
    !costo_envio ||
    !metodo_pago ||
    !total ||
    !contacto ||
    !productos ||
    productos.length === 0
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const pedidoData = {
    metodo_envio,
    costo_envio,
    metodo_pago,
    total,
    descuentoAplicado,
  };

  try {
    const result = await pedidoModel.createPedido(req.pool, pedidoData);
    const pedidoId = result.insertId;

    const contactoData = {
      pedido_id: pedidoId,
      ...contacto,
    };
    await contactoPedidoModel.createContactoPedido(req.pool, contactoData);

    if (factura) {
      const facturaData = {
        pedido_id: pedidoId,
        ...factura,
      };
      await facturaModel.createFactura(req.pool, facturaData);
    }

    for (const producto of productos) {
      const detalleData = {
        pedido_id: pedidoId,
        ...producto,
        nombre: producto.nombre,
      };
      await detallePedidoModel.createDetallePedido(req.pool, detalleData);
    }

    // Calcular IVA
    const subtotal = productos.reduce((total, producto) => {
      return total + producto.precio * producto.cantidad;
    }, 0);
    const iva = subtotal * 0.19;
    const totalConIva = subtotal + iva;
    const totalConDescuento = totalConIva + costo_envio - descuentoAplicado;

    const metodoEntregaText =
      {
        entrega1: "Entrega presencial",
        entrega2: "Envío pagado Bluexpress-Regiones",
        entrega3: "Envío por pagar Bluexpress",
      }[metodo_envio] || "Método desconocido";

    const correoCliente = contacto.email;
    const correoAdmin = "dejotaprint@gmail.com";

    const asuntoCliente = `Confirmación de tu pedido #${pedidoId}`;
    const htmlCliente = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #27ae60;">Gracias por tu pedido</h2>
        <p>Se ha enviado un correo electrónico con el resumen de tu pedido a: <strong>${
          contacto.email
        }</strong></p>
        <h3 style="color: #27ae60;">Pedido #${pedidoId}</h3>
        <p>Total: ${formatoChileno(totalConDescuento)}</p>
        <div style="border-top: 1px solid #eee; margin: 20px 0;"></div>
        <div style="font-size: 14px; line-height: 1.6;">
          <h4>Estado del Pago</h4>
          <p>Todavía queda un paso para finalizar este pedido. Realice el pago para finalizar el pedido.</p>
          <div style="border-top: 1px solid #eee; margin: 20px 0;"></div>
          <h4>Dejotaprint Spa</h4>
          <p>PUBLICIDAD Y DISEÑO PYH SpA</p>
          <p>77.807.896-1</p>
          <p>Banco Bci</p>
          <p>Cuenta corriente: 13760599</p>
          <p>Email: dejotaprint@gmail.com</p>
          <div style="border-top: 1px solid #eee; margin: 20px 0;"></div>
          <h4>Información de Envío</h4>
          <p>Nombre: ${contacto.nombre}</p>
          <p>Dirección: ${contacto.direccion}</p>
          <p>Método: ${metodoEntregaText}</p>
          <div style="border-top: 1px solid #eee; margin: 20px 0;"></div>
          <h4>Información de Facturación</h4>
          <p>Nombre: ${factura ? factura.nombre : contacto.nombre}</p>
          <p>Dirección: ${factura ? factura.direccion : contacto.direccion}</p>
          <div style="border-top: 1px solid #eee; margin: 20px 0;"></div>
          <h4>Resumen del Pedido</h4>
          ${productos
            .map(
              (producto) => `
            <p>${producto.nombre}: ${producto.cantidad} x ${formatoChileno(
                producto.precio
              )}</p>
          `
            )
            .join("")}
          <p>Subtotal: ${formatoChileno(subtotal)}</p>
          <p>IVA: ${formatoChileno(iva.toFixed(0))}</p>
          <p>Total con IVA: ${formatoChileno(totalConIva.toFixed(0))}</p>
          <p>Envío: ${formatoChileno(costo_envio)}</p>
          <p>Descuento aplicado: -${formatoChileno(descuentoAplicado)}</p>
          <p>Total: ${formatoChileno(totalConDescuento)}</p>
        </div>
        <div style="border-top: 1px solid #eee; margin: 20px 0;"></div>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <img src="http://localhost:3000/uploads/logo.png" alt="Logo Dejotaprint" style="width: 100px; height: auto;"/>
          <div>
            <p>Dejotaprint Spa</p>
            <p>PUBLICIDAD Y DISEÑO PYH SpA</p>
            <p>77.807.896-1</p>
            <p>Email: dejotaprint@gmail.com</p>
            <p>Instagram: @dejotaprint</p>
            <p>Teléfono: +56 9 1234 5678</p>
          </div>
        </div>
      </div>
    `;

    const asuntoAdmin = `Nuevo pedido #${pedidoId}`;
    const htmlAdmin = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #27ae60;">Nuevo pedido recibido</h2>
        <h3 style="color: #27ae60;">Pedido #${pedidoId}</h3>
        <p>Total: ${formatoChileno(totalConDescuento)}</p>
        <div style="border-top: 1px solid #eee; margin: 20px 0;"></div>
        <div style="font-size: 14px; line-height: 1.6;">
          <h4>Detalles del Cliente</h4>
          <p>Email: ${contacto.email}</p>
          <p>Nombre: ${contacto.nombre} ${contacto.apellido}</p>
          <p>Teléfono: ${contacto.telefono}</p>
          <p>Dirección: ${contacto.direccion}, ${contacto.comuna}, ${
      contacto.region
    }</p>
          <div style="border-top: 1px solid #eee; margin: 20px 0;"></div>
          <h4>Productos</h4>
          ${productos
            .map(
              (producto) => `
            <p>${producto.nombre}: ${producto.cantidad} x ${formatoChileno(
                producto.precio
              )}</p>
          `
            )
            .join("")}
        </div>
        <div style="border-top: 1px solid #eee; margin: 20px 0;"></div>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <img src="http://localhost:3000/uploads/logo.png" alt="Logo Dejotaprint" style="width: 100px; height: auto;"/>
          <div>
            <p>Dejotaprint Spa</p>
            <p>PUBLICIDAD Y DISEÑO PYH SpA</p>
            <p>77.807.896-1</p>
            <p>Email: dejotaprint@gmail.com</p>
            <p>Instagram: @dejotaprint</p>
            <p>Teléfono: +56 9 1234 5678</p>
          </div>
        </div>
      </div>
    `;

    await enviarCorreo(correoCliente, asuntoCliente, "", htmlCliente);
    await enviarCorreo(correoAdmin, asuntoAdmin, "", htmlAdmin);

    res.status(201).json({
      message: "Pedido creado exitosamente",
      id: pedidoId,
    });
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarPedido(req, res) {
  const pedidoId = req.params.id;

  if (!pedidoId) {
    return res.status(400).json({ error: "ID del pedido no proporcionado" });
  }

  try {
    await pedidoModel.eliminarPedido(req.pool, pedidoId);
    res.status(200).json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el pedido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

const completarPedido = async (req, res) => {
  const pedidoId = req.params.id;

  try {
    await pedidoModel.marcarComoCompletado(req.pool, pedidoId);
    res.status(200).json({ message: "Pedido completado correctamente" });
  } catch (error) {
    console.error("Error al completar el pedido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  getAllPedidos,
  getPedidoById,
  createPedido,
  eliminarPedido,
  completarPedido,
};
