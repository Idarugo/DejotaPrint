const { pool } = require("../app");

async function getAllHorarios(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM horarios");
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    throw error;
  }
}

async function updateHorario(pool, horarioId, horarioData) {
  const { dia, horario } = horarioData;
  const sql = "UPDATE horarios SET dia = ?, horario = ? WHERE id = ?";
  return pool.query(sql, [dia, horario, horarioId]);
}

module.exports = {
  getAllHorarios,
  updateHorario,
};
