const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // Si no hay token, no autorizado

  jwt.verify(token, "your_secret_key", (err, user) => {
    if (err) return res.sendStatus(403); // Si el token no es válido, prohibido

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
