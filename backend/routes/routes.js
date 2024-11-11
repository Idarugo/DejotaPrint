const express = require("express");
const router = express.Router();

const archivosSubidosController = require("./archivoSubido.routes");
const authRoutes = require("./auth.routes");
const carroRoutes = require("./carro.routes");
const carruselRoutes = require("./carrusel.routes");
const cat_faqRoutes = require("./cat-faq.routes");
const categoriaRoutes = require("./categoria.routes");
const contactoPedidoRoutes = require("./contacto_pedido.routes");
const contactoRoutes = require("./contacto.routes");
const cotizacionRoutes = require("./cotizacion.routes");
const descuentoRoutes = require("./descuento.routes");
const detallePedidoRoutes = require("./detalle_pedido.routes");
const disenoRoutes = require("./diseno.routes");
const facturaRoutes = require("./factura.routes");
const faqRoutes = require("./faq.routes");
const horarioRoutes = require("./horario.routes");
const imagenProductoRoutes = require("./imagen-producto.routes");
const marcaRoutes = require("./marca.routes");
const ofertaRoutes = require("./oferta.routes");
const pedidoRoutes = require("./pedido.routes");
const plantillaRoutes = require("./plantilla.routes");
const posicionRoutes = require("./posicion.routes");
const productoRoutes = require("./producto.routes");
const reseñaRoutes = require("./reseña.routes");
const subcategoriaRoutes = require("./subcategoria.routes");
const subcat_faqRoutes = require("./subcat_faq.routes");
const testimonioRoutes = require("./testimonio.routes");
const tokenRoutes = require("./token.routes");
const trabajadoreRoutes = require("./trabajadore.routes");
const transbankRoutes = require("./transbank.routes");

// Ruta base /api
router.get("/", (req, res) => {
  res.send("¡Bienvenido a la API de mi aplicación!");
});

router.use("/archivosSubidos", archivosSubidosController);
router.use("/auth", authRoutes);
router.use("/carro", carroRoutes);
router.use("/carrusel", carruselRoutes);
router.use("/cat_faq", cat_faqRoutes);
router.use("/categorias", categoriaRoutes);
router.use("/contacto_pedidos", contactoPedidoRoutes);
router.use("/contactos", contactoRoutes);
router.use("/cotizacion", cotizacionRoutes);
router.use("/descuentos", descuentoRoutes);
router.use("/detalle_pedidos", detallePedidoRoutes);
router.use("/disenos", disenoRoutes);
router.use("/facturas", facturaRoutes);
router.use("/faqs", faqRoutes);
router.use("/horarios", horarioRoutes);
router.use("/imagenesProducto", imagenProductoRoutes);
router.use("/marcas", marcaRoutes);
router.use("/ofertas", ofertaRoutes);
router.use("/pedidos", pedidoRoutes);
router.use("/plantillas", plantillaRoutes);
router.use("/posicions", posicionRoutes);
router.use("/productos", productoRoutes);
router.use("/resenas", reseñaRoutes);
router.use("/subcat_faq", subcat_faqRoutes);
router.use("/subcategorias", subcategoriaRoutes);
router.use("/testimonios", testimonioRoutes);
router.use("/tokens", tokenRoutes);
router.use("/trabajadores", trabajadoreRoutes);
router.use("/pago", transbankRoutes);

module.exports = router;
