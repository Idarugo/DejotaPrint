const jwt = require("jsonwebtoken");
const trabajadoreModel = require("../models/trabajadore.model");
const bcrypt = require("bcrypt");

async function getAllTrabajadores(req, res) {
  try {
    const trabajadores = await trabajadoreModel.getAllTrabajadores(req.pool);
    res.json(trabajadores);
  } catch (error) {
    console.error("Error al obtener los trabajadores:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createTrabajadore(req, res) {
  const {
    rut,
    nombre,
    apellido,
    telefono,
    correo,
    posicion,
    password,
    estado,
  } = req.body;

  if (
    !rut ||
    !nombre ||
    !apellido ||
    !telefono ||
    !correo ||
    !posicion ||
    !password ||
    !estado
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const trabajadoreData = {
      rut,
      nombre,
      apellido,
      telefono,
      correo,
      posicion,
      password: hashedPassword,
      estado,
    };

    const result = await trabajadoreModel.createTrabajadore(
      req.pool,
      trabajadoreData
    );
    console.log("Trabajador creado correctamente:", result);
    res
      .status(201)
      .json({ message: "Trabajador creado exitosamente", id: result.insertId });
  } catch (error) {
    console.error("Error al crear el trabajador:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function updateTrabajadore(req, res) {
  const trabajadoreRut = req.params.rut;
  const { nombre, apellido, telefono, correo, posicion, password, estado } =
    req.body;

  try {
    const existingTrabajadore = await trabajadoreModel.getTrabajadoreByRut(
      req.pool,
      trabajadoreRut
    );
    if (!existingTrabajadore) {
      return res.status(404).json({ error: "Trabajador no encontrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedTrabajadoreData = {
      rut: trabajadoreRut,
      nombre,
      apellido,
      telefono,
      correo,
      posicion,
      password: hashedPassword,
      estado,
    };

    await trabajadoreModel.updateTrabajadore(
      req.pool,
      trabajadoreRut,
      updatedTrabajadoreData
    );

    res.status(200).json({ message: "Trabajador actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el trabajador:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarTrabajadore(req, res) {
  const trabajadoreRut = req.params.rut;

  if (!trabajadoreRut) {
    return res
      .status(400)
      .json({ error: "Rut del trabajador no proporcionado" });
  }

  try {
    await trabajadoreModel.eliminarTrabajadore(req.pool, trabajadoreRut);
    res.status(200).json({ message: "Trabajador eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el trabajador:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getCurrentUser(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "your_secret_key");
    const userRut = decodedToken.rut;

    const trabajador = await trabajadoreModel.getTrabajadoreByRut(
      req.pool,
      userRut
    );
    if (trabajador) {
      res.json(trabajador);
    } else {
      res.status(404).json({ error: "Trabajador no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el trabajador por RUT:", error);
    res.status(500).json({ error: "Error al obtener el trabajador por RUT" });
  }
}

async function cambiarEstadoTrabajador(req, res) {
  const { rut } = req.params;
  const { estado } = req.body;

  if (estado !== 0 && estado !== 1) {
    return res.status(400).json({ error: "El estado debe ser 0 o 1" });
  }

  try {
    await trabajadoreModel.cambiarEstadoTrabajador(req.pool, rut, estado);
    res
      .status(200)
      .json({ message: "Estado del trabajador actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el estado del trabajador:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllTrabajadores,
  createTrabajadore,
  updateTrabajadore,
  eliminarTrabajadore,
  getCurrentUser,
  cambiarEstadoTrabajador,
};
