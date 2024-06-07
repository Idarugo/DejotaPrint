const ofertaModel = require("../models/oferta.model");

async function getAllOfertas(req, res) {
  try {
    const ofertas = await ofertaModel.getAllOfertas(req.pool);
    res.json(ofertas);
  } catch (error) {
    console.error("Error al obtener las ofertas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getAllOfertasEspeciales(req, res) {
  try {
    const ofertas = await ofertaModel.getAllOfertasEspeciales(req.pool);
    res.json(ofertas);
  } catch (error) {
    console.error("Error al obtener las ofertas especiales:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createOferta(req, res) {
  const { producto_id, precio_descuento, fecha_inicio, fecha_fin, estado } =
    req.body;

  if (
    !producto_id ||
    !precio_descuento ||
    !fecha_inicio ||
    !fecha_fin ||
    estado === undefined
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const fecha_inicio_formatted = new Date(fecha_inicio)
    .toISOString()
    .split("T")[0];
  const fecha_fin_formatted = new Date(fecha_fin).toISOString().split("T")[0];

  const ofertaData = {
    producto_id,
    precio_descuento,
    fecha_inicio: fecha_inicio_formatted,
    fecha_fin: fecha_fin_formatted,
    estado,
  };

  try {
    const result = await ofertaModel.createOferta(req.pool, ofertaData);
    console.log("Oferta creada correctamente:", result);
    res.status(201).json({
      message: "Oferta creada exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear la oferta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function updateOferta(req, res) {
  const ofertaId = req.params.id;
  const { producto_id, precio_descuento, fecha_inicio, fecha_fin, estado } =
    req.body;

  if (!ofertaId) {
    return res.status(400).json({ error: "ID de la oferta no proporcionado" });
  }

  if (
    !producto_id ||
    !precio_descuento ||
    !fecha_inicio ||
    !fecha_fin ||
    estado === undefined
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const ofertaData = {
    producto_id,
    precio_descuento,
    fecha_inicio,
    fecha_fin,
    estado,
  };

  try {
    await ofertaModel.updateOferta(req.pool, ofertaId, ofertaData);
    res.status(200).json({ message: "Oferta actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la oferta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarOferta(req, res) {
  const ofertaId = req.params.id;

  if (!ofertaId) {
    return res.status(400).json({ error: "ID de la oferta no proporcionado" });
  }

  try {
    await ofertaModel.eliminarOferta(req.pool, ofertaId);
    res.status(200).json({ message: "Oferta eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la oferta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getOfertaById(req, res) {
  try {
    const oferta = await ofertaModel.getOfertaById(req.pool, req.params.id);
    if (!oferta) {
      return res.status(404).json({ error: "Oferta no encontrada" });
    }
    res.json(oferta);
  } catch (error) {
    console.error("Error al obtener la oferta por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getOfertaByProductoId(req, res) {
  const productoId = req.params.producto_id;

  try {
    const oferta = await ofertaModel.getOfertaByProductoId(
      req.pool,
      productoId
    );
    if (!oferta) {
      return res
        .status(404)
        .json({ error: "Oferta no encontrada para este producto" });
    }
    res.json(oferta);
  } catch (error) {
    console.error("Error al obtener la oferta por ID de producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function cambiarEstadoOferta(req, res) {
  const { id } = req.params;
  const { estado } = req.body;

  if (estado !== 0 && estado !== 1) {
    return res.status(400).json({ error: "El estado debe ser 0 o 1" });
  }

  try {
    await ofertaModel.cambiarEstadoOferta(req.pool, id, estado);
    res
      .status(200)
      .json({ message: "Estado de la oferta actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el estado de la oferta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllOfertas,
  getAllOfertasEspeciales,
  createOferta,
  updateOferta,
  eliminarOferta,
  getOfertaById,
  getOfertaByProductoId,
  cambiarEstadoOferta,
};
