const { pool } = require("../app");

async function createToken(pool, token) {
  const sql = "INSERT INTO tokens (token, usado) VALUES (?, 0)";
  return pool.query(sql, [token]);
}

async function verifyToken(pool, token) {
  const sql = "SELECT * FROM tokens WHERE token = ? AND usado = 0";
  const [rows] = await pool.query(sql, [token]);
  return rows.length > 0;
}

async function invalidateToken(pool, token) {
  const sql = "UPDATE tokens SET usado = 1 WHERE token = ?";
  return pool.query(sql, [token]);
}

module.exports = {
  createToken,
  verifyToken,
  invalidateToken,
};
