const nodemailer = require("nodemailer");

// Configuración del transportador SMTP
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    // user: "dejotaprint@gmail.com", // Reemplaza con tu correo
    // pass: "ynsi lvxu vefe toyc", // Reemplaza con tu contraseña de aplicación si tienes 2FA habilitado

    user: "onepiecemonkeydluffy20@gmail.com", // Reemplaza con tu correo
    pass: "buxk fckb onrc lkvy",
  },
});

// Función para enviar correo
async function enviarCorreo(destinatario, asunto, texto, html) {
  const mailOptions = {
    from: "tu_correo@gmail.com",
    to: destinatario,
    subject: asunto,
    text: texto,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado: " + info.response);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
}

module.exports = {
  enviarCorreo,
};
