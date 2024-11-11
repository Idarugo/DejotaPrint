const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const trabajadoreModel = require("../models/trabajadore.model");

// Controlador para el inicio de sesión
async function login(req, res) {
  const { rut, password } = req.body;

  if (!rut || !password) {
    return res.status(400).json({ error: "RUT y contraseña son obligatorios" });
  }

  try {
    const trabajadore = await trabajadoreModel.getTrabajadoreByRut(
      req.pool,
      rut
    );

    if (!trabajadore) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const passwordMatch = await bcrypt.compare(password, trabajadore.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ rut: trabajadore.rut }, "tu_secreto_jwt", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Controlador para el registro de un nuevo usuario
async function register(req, res) {
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

// Controlador para cerrar sesión
function logout(req, res) {
  res.json({ message: "Cierre de sesión exitoso" });
}

// Controlador para restablecer la contraseña
async function resetPassword(req, res) {
  const { rut, newPassword } = req.body;

  if (!rut || !newPassword) {
    return res
      .status(400)
      .json({ error: "RUT y nueva contraseña son obligatorios" });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await trabajadoreModel.updatePassword(req.pool, rut, hashedPassword);

    res.status(200).json({ message: "Contraseña restablecida exitosamente" });
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Controlador para verificar el token de restablecimiento de contraseña
function verifyResetToken(req, res) {
  const { token } = req.params;

  jwt.verify(token, "tu_secreto_jwt", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido o expirado" });
    }

    res.json({ message: "Token válido", decoded });
  });
}

module.exports = {
  login,
  register,
  logout,
  resetPassword,
  verifyResetToken,
};
