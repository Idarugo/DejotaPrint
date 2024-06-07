const carroModel = require("../models/carro.model");

async function getAllCarros(req, res) {
  try {
    const carros = await carroModel.getAllCarros(req.pool);
    res.json(carros);
  } catch (error) {
    console.error("Error al obtener los carros:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createCarro(req, res) {
  const { producto_id, cantidad, session_id } = req.body;

  if (!producto_id || !cantidad || !session_id) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const carroData = { producto_id, cantidad, session_id };

  try {
    const result = await carroModel.createCarro(req.pool, carroData);
    console.log("carro creado correctamente:", result);
    res.status(201).json({
      message: "carro creado exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear el carro:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarCarro(req, res) {
  const contactId = req.params.id; // Obtener el ID del carro de los parámetros de la URL

  if (!contactId) {
    return res.status(400).json({ error: "ID del carro no proporcionado" });
  }

  try {
    await carroModel.eliminarCarro(req.pool, contactId);
    res.status(200).json({ message: "carro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el carro:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllCarros,
  createCarro,
  eliminarCarro,
};
