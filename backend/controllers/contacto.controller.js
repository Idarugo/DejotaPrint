const contactoModel = require("../models/contacto.model");

async function getAllContactos(req, res) {
  try {
    const contactos = await contactoModel.getAllContactos(req.pool);
    res.json(contactos);
  } catch (error) {
    console.error("Error al obtener los contactos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createContacto(req, res) {
  const { nombre, correo, telefono, mensaje, fecha } = req.body;

  if (!nombre || !correo || !telefono || !mensaje) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const contactoData = { nombre, correo, telefono, mensaje, fecha };

  try {
    const result = await contactoModel.createContacto(req.pool, contactoData);
    console.log("Contacto creado correctamente:", result);
    res.status(201).json({
      message: "Contacto creado exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear el contacto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarContacto(req, res) {
  const contactId = req.params.id; // Obtener el ID del contacto de los parámetros de la URL

  if (!contactId) {
    return res.status(400).json({ error: "ID del contacto no proporcionado" });
  }

  try {
    await contactoModel.eliminarContacto(req.pool, contactId);
    res.status(200).json({ message: "Contacto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el contacto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllContactos,
  createContacto,
  eliminarContacto,
};
