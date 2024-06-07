const productoModel = require("../models/producto.model");

async function getAllProductos(req, res) {
  try {
    const productos = await productoModel.getAllProductos(req.pool);
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createProducto(req, res) {
  const { nombre, descripcion, subcategoria, precio, cantidad } = req.body;

  if (!nombre || !descripcion || !subcategoria || !precio || !cantidad) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const productoData = {
    nombre,
    descripcion,
    subcategoria,
    precio,
    cantidad,
  };

  try {
    const result = await productoModel.createProducto(req.pool, productoData);
    console.log("producto creado correctamente:", result);
    res.status(201).json({
      message: "producto creado exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function updateProducto(req, res) {
  const productoId = req.params.id; // Obtener el ID del producto de los parámetros de la URL
  const { nombre, descripcion, precio, cantidad } = req.body;

  if (!productoId) {
    return res.status(400).json({ error: "ID del producto no proporcionado" });
  }

  if (!nombre || !descripcion || !precio || !cantidad) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const productoData = {
    nombre,
    descripcion,
    precio,
    cantidad,
  };

  try {
    await productoModel.updateProducto(req.pool, productoId, productoData);
    res.status(200).json({ message: "producto actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function eliminarProducto(req, res) {
  const productoId = req.params.id; // Obtener el ID del producto de los parámetros de la URL

  if (!productoId) {
    return res.status(400).json({ error: "ID del producto no proporcionado" });
  }

  try {
    await productoModel.eliminarProducto(req.pool, productoId);
    res.status(200).json({ message: "producto eliminado correctamente" });
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
    // Enviar todos los detalles del producto en la respuesta JSON
    res.json(producto);
  } catch (error) {
    console.error("Error al obtener el producto por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function obtenerProductosRelacionados(req, res) {
  const { id } = req.params; // Obtener el ID del producto
  try {
    console.log("ID del producto:", id); // Imprimir el ID del producto
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
  createProducto,
  updateProducto,
  eliminarProducto,
  getProductoById,
  obtenerProductosRelacionados,
  getProductosConImagenes,
  getLastProductosByCategoria,
};
