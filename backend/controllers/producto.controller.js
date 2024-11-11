const productoModel = require("../models/producto.model");
const archivosSubidosModel = require("../models/archivoSubido.model"); // Importa el modelo de archivos subidos

async function getAllProductos(req, res) {
  try {
    const productos = await productoModel.getAllProductos(req.pool);
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getAllProductosAdmin(req, res) {
  try {
    const productos = await productoModel.getAllProductosAdmin(req.pool);
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

const createProducto = async (req, res) => {
  const {
    nombre,
    descripcion,
    subcategoria,
    precio,
    cantidad,
    estado,
    iva,
    es_personalizado,
  } = req.body;

  if (
    !nombre ||
    !descripcion ||
    !subcategoria ||
    !precio ||
    !cantidad ||
    estado === undefined ||
    iva === undefined ||
    es_personalizado === undefined
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const productoData = {
    nombre,
    descripcion,
    subcategoria,
    precio,
    cantidad,
    estado,
    iva,
    es_personalizado,
  };

  try {
    const result = await productoModel.createProducto(req.pool, productoData);
    console.log("Producto creado correctamente:", result);
    res.status(201).json({
      message: "Producto creado exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const createProductoPersonalizado = async (req, res) => {
  const { nombre, descripcion, subcategoria, precio, cantidad, iva } = req.body;

  if (
    !nombre ||
    !descripcion ||
    !subcategoria ||
    !precio ||
    !cantidad ||
    iva === undefined
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const productoData = {
    nombre,
    descripcion,
    subcategoria,
    precio,
    cantidad,
    iva,
  };

  try {
    const result = await productoModel.createProductoPersonalizado(
      req.pool,
      productoData
    );
    res.status(201).json({
      message: "Producto personalizado creado exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear el producto personalizado:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

async function updateProducto(req, res) {
  const productoId = req.params.id;
  const { nombre, descripcion, subcategoria, precio, cantidad, estado, iva } =
    req.body;

  if (!productoId) {
    return res.status(400).json({ error: "ID del producto no proporcionado" });
  }

  if (
    !nombre ||
    !descripcion ||
    !subcategoria ||
    !precio ||
    !cantidad ||
    estado === undefined ||
    iva === undefined
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const productoData = {
    nombre,
    descripcion,
    subcategoria,
    precio,
    cantidad,
    estado,
    iva,
  };

  try {
    await productoModel.updateProducto(req.pool, productoId, productoData);
    res.status(200).json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarProducto(req, res) {
  const productoId = req.params.id;

  if (!productoId) {
    return res.status(400).json({ error: "ID del producto no proporcionado" });
  }

  try {
    // Elimina los registros relacionados en archivossubidos
    await archivosSubidosModel.eliminarArchivosPorProductoId(
      req.pool,
      productoId
    );

    // Luego elimina el producto en productos
    await productoModel.eliminarProducto(req.pool, productoId);

    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getProductoById(req, res) {
  try {
    const producto = await productoModel.getProductoById(
      req.pool,
      req.params.id
    );
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    console.error("Error al obtener el producto por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function obtenerProductosRelacionados(req, res) {
  const { id } = req.params;
  try {
    console.log("ID del producto:", id);
    const productosRelacionados =
      await productoModel.obtenerProductosRelacionados(id);
    res.json(productosRelacionados);
  } catch (error) {
    console.error("Error al obtener productos relacionados:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getProductosConImagenes(req, res) {
  try {
    const productosConImagenes = await productoModel.getProductosConImagenes(
      req.pool
    );
    res.json(productosConImagenes);
  } catch (error) {
    console.error("Error al obtener productos con imágenes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getLastProductosByCategoria(req, res) {
  const categoriaId = req.params.categoriaId;
  try {
    const productos = await productoModel.getLastProductosByCategoria(
      req.pool,
      categoriaId
    );
    res.json(productos);
  } catch (error) {
    console.error(
      "Error al obtener los últimos productos por categoría:",
      error
    );
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getAllProductos,
  getAllProductosAdmin,
  createProducto,
  createProductoPersonalizado,
  updateProducto,
  eliminarProducto,
  getProductoById,
  obtenerProductosRelacionados,
  getProductosConImagenes,
  getLastProductosByCategoria,
};
