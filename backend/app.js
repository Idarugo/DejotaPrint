const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2/promise");
const routes = require("./routes/routes");
const path = require("path");
const multer = require("multer");
const cron = require("node-cron");

const app = express();
const PORT = 3000;

// Configurar el pool de conexiones a la base de datos MySQL
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "dejotaprint",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = {
  app,
  pool,
};

// Función para eliminar productos y archivos subidos no completados
async function limpiarComprasNoCompletadas() {
  const queryArchivos = `
  DELETE a 
    FROM archivosSubidos a 
    JOIN productos p ON a.producto_id = p.id 
    LEFT JOIN detalle_pedidos dp ON dp.producto_id = p.id
    LEFT JOIN pedidos pe ON dp.pedido_id = pe.id
    WHERE p.es_personalizado = 1 AND (pe.id IS NULL OR (pe.completed = 0 AND pe.created_at < NOW() - INTERVAL 1 DAY));
  `;

  const queryProductos = `
    DELETE p 
    FROM productos p
    LEFT JOIN detalle_pedidos dp ON dp.producto_id = p.id
    LEFT JOIN pedidos pe ON dp.pedido_id = pe.id
    WHERE p.es_personalizado = 1 AND (pe.id IS NULL OR (pe.completed = 0 AND pe.created_at < NOW() - INTERVAL 1 DAY));
  `;

  const queryPedidos = `
  DELETE FROM pedidos 
  WHERE completed = 0 AND created_at < NOW() - INTERVAL 1 DAY;
`;

  const connection = await pool.getConnection();

  try {
    await connection.query(queryArchivos);
    await connection.query(queryProductos);
    await connection.query(queryPedidos);
    console.log("Compras no completadas eliminadas");
  } catch (error) {
    console.error("Error al eliminar compras no completadas:", error);
  } finally {
    connection.release();
  }
}

// Programa la tarea para que se ejecute todos los días a la medianoche
cron.schedule("0 0 * * *", limpiarComprasNoCompletadas);
// cron.schedule("* * * * *", limpiarComprasNoCompletadas); /*Prueba de minutos*/

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para registrar solicitudes
app.use((req, res, next) => {
  console.log(`Solicitud ${req.method} a ${req.originalUrl}`);
  next();
});

// Middleware para pasar el pool de conexiones a las rutas
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// Configurar la ruta para servir archivos estáticos (imágenes de productos)
app.use(
  "/uploads/productos",
  express.static(path.join(__dirname, "/uploads/productos"))
);

// Configurar Express para servir archivos estáticos desde la carpeta "uploads"
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configuración de multer para guardar los archivos en el directorio deseado
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads/productos"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Ruta base
app.get("/", (req, res) => {
  res.send(
    "¡Bienvenido a la página de inicio de mi aplicación! La conexión a MySQL está activa."
  );
});

// Rutas API
app.use("/api", routes);

// Puerto
const port = process.env.PORT || PORT;
app.listen(port, () =>
  console.log(`Servidor API corriendo en el puerto ${port}`)
);
