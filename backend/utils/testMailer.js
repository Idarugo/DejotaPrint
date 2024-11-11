const { enviarCorreo } = require("./mailer");

async function testEnviarCorreo() {
  const correoCliente = "onepiecemonkeydluffy20@gmail.com";
  const correoAdmin = "dejotaprint@gmail.com";

  const asuntoCliente = "Prueba de correo";
  const htmlCliente = "<p>Este es un correo de prueba para el cliente.</p>";

  const asuntoAdmin = "Prueba de correo";
  const htmlAdmin = "<p>Este es un correo de prueba para el administrador.</p>";

  await enviarCorreo(correoCliente, asuntoCliente, "", htmlCliente);
  await enviarCorreo(correoAdmin, asuntoAdmin, "", htmlAdmin);
}

testEnviarCorreo();
