const { pool } = require("../app");

async function getAllDisenos(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT 
        d.*, 
        sc.nombre AS nombre_subcategoria, 
        c.nombre AS nombre_categoria
      FROM 
        disenos d
      LEFT JOIN 
        subcategorias sc ON d.subcategoria = sc.id
      LEFT JOIN 
        categorias c ON sc.categoria = c.id;
    `);
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener disenos:", error);
    throw error;
  }
}

async function getAllDisenosAdmin(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT 
        d.*, 
        sc.nombre AS nombre_subcategoria, 
        c.nombre AS nombre_categoria
      FROM 
        disenos d
      LEFT JOIN 
        subcategorias sc ON d.subcategoria = sc.id
      LEFT JOIN 
        categorias c ON sc.categoria = c.id;
    `);
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener disenos:", error);
    throw error;
  }
}

async function createDiseno(pool, disenoData) {
  const { nombre, descripcion, subcategoria, imagen } = disenoData;
  const sql =
    "INSERT INTO disenos (nombre, descripcion, subcategoria, imagen) VALUES (?, ?, ?, ?)";
  const [result] = await pool.query(sql, [
    nombre,
    descripcion,
    subcategoria,
    imagen,
  ]);
  return result;
}

async function updateDiseno(pool, disenoId, disenoData) {
  const { nombre, descripcion, subcategoria, imagen } = disenoData;
  const sql =
    "UPDATE disenos SET nombre = ?, descripcion = ?, subcategoria = ?, imagen = ? WHERE id = ?";
  return pool.query(sql, [nombre, descripcion, subcategoria, imagen, disenoId]);
}

async function eliminarDiseno(pool, disenoId) {
  const sql = "DELETE FROM disenos WHERE id = ?";
  return pool.query(sql, [disenoId]);
}

async function getDisenoById(pool, id) {
  const sql = "SELECT * FROM disenos WHERE id = ?";
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
}

async function getDisenosConImagenes(pool) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT d.id, d.nombre, d.descripcion, d.imagen
      FROM disenos d;
    `);
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener disenos con imágenes:", error);
    throw error;
  }
}

async function getLastDisenosByCategoria(pool, categoriaId) {
  try {
    const connection = await pool.getConnection();
    const query = `
      SELECT 
        d.*, 
        d.imagen 
      FROM 
        disenos d
      LEFT JOIN 
        subcategorias sc ON d.subcategoria = sc.id
      LEFT JOIN 
        categorias c ON sc.categoria = c.id
      WHERE 
        c.id = ?
      ORDER BY 
        d.id DESC
      LIMIT 5
    `;
    const [rows] = await connection.query(query, [categoriaId]);
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error al obtener los últimos disenos por categoría:", error);
    throw error;
  }
}

module.exports = {
  getAllDisenos,
  getAllDisenosAdmin,
  createDiseno,
  updateDiseno,
  eliminarDiseno,
  getDisenoById,
  getDisenosConImagenes,
  getLastDisenosByCategoria,
};
