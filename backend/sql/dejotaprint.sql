-- Crear tabla de categorías
CREATE TABLE categorias (
    id INT AUTO_INCREMENT  PRIMARY KEY,
    nombre VARCHAR(100)
);

-- Crear tabla de subcategorías
CREATE TABLE subcategorias (
    id INT AUTO_INCREMENT  PRIMARY KEY,
    nombre VARCHAR(100),
    categoria INT,
    FOREIGN KEY (categoria) REFERENCES categorias(id)
);

-- Crear tabla de productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    subcategoria INT,
    precio INT NOT NULL,
    cantidad INT NOT NULL,
    estado TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    iva DECIMAL(5,2) DEFAULT 19.00,
    es_personalizado TINYINT(1) DEFAULT 0,
    FOREIGN KEY (subcategoria) REFERENCES subcategorias(id)
);

-- Crear tabla de descuentos
CREATE TABLE descuentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL,
    descuento DECIMAL(5, 2) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado BOOLEAN DEFAULT TRUE
);

-- Crear tabla de relación entre descuentos y productos
CREATE TABLE descuento_productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descuento_id INT NOT NULL,
    producto_id INT NOT NULL,
    FOREIGN KEY (descuento_id) REFERENCES descuentos(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Crear tabla de diseños
CREATE TABLE disenos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    subcategoria INT,
    FOREIGN KEY (subcategoria) REFERENCES subcategorias(id)
);



CREATE TABLE archivosSubidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT NOT NULL,
    url_archivo VARCHAR(255),
    color VARCHAR(50),
    diseño VARCHAR(50),
    texto_personalizado TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);


-- Crear tabla de imágenes de productos
CREATE TABLE imagenesProducto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT NOT NULL,
    url_imagen VARCHAR(255) NOT NULL,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Crear tabla de ofertas
CREATE TABLE ofertas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT NOT NULL,
    precio_descuento INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado INT DEFAULT 1,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

CREATE TABLE cotizacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    cantidad INT NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);


-- Crear tabla de testimonios
CREATE TABLE testimonios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    imagen_url VARCHAR(255),
    mensaje TEXT,
    titulo VARCHAR(255),
    empresa VARCHAR(255),
    estado BOOLEAN DEFAULT 0
);
-- Crear tabla de contactos para el formulario de contacto
CREATE TABLE contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de horarios
CREATE TABLE horarios (
    id INT PRIMARY KEY,
    dia VARCHAR(20),
    horario VARCHAR(900)
);

-- Crear tabla de marcas
CREATE TABLE marcas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    imagen VARCHAR(150),
    estado BOOLEAN
);

-- Crear tabla de posiciones
CREATE TABLE posicions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    posicion VARCHAR(100) NOT NULL
);

-- Crear tabla de trabajadores
CREATE TABLE trabajadores (
    rut CHAR(12) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    correo VARCHAR(100) NOT NULL UNIQUE,
    posicion INT,
    password VARCHAR(255) NOT NULL,
    estado TINYINT(1) DEFAULT 1,
    FOREIGN KEY (posicion) REFERENCES posicions(id)
);

-- Crear tabla de reseñas
CREATE TABLE reseñas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT NOT NULL,
    clasificacion INT NOT NULL,
    mensaje TEXT,
    nombre VARCHAR(255),
    correo VARCHAR(255),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Crear tabla de carrusel
CREATE TABLE carrusel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    imagen_url VARCHAR(255),
    enlace VARCHAR(255),
    posicion INT,
    estado BOOLEAN DEFAULT 1
);


-- Crear tabla de categorías de preguntas frecuentes
CREATE TABLE cat_faq (
    id INT  PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);

-- Crear tabla de subcategorías de preguntas frecuentes
CREATE TABLE subcat_faq (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    categoria INT,
    FOREIGN KEY (categoria) REFERENCES cat_faq(id)
);

-- Crear tabla de preguntas frecuentes
CREATE TABLE faqs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pregunta VARCHAR(255) NOT NULL,
    respuesta TEXT NOT NULL,
    subcat_id INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (subcat_id) REFERENCES subcat_faq(id)
);

-- Tabla de Pedidos
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metodo_envio VARCHAR(100),
    costo_envio INT,
    metodo_pago VARCHAR(100),
    total INT,
    completed TINYINT(1) DEFAULT 0
);


-- Tabla de Información de Contacto para Pedidos
CREATE TABLE contacto_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    email VARCHAR(100) NOT NULL,
    rut VARCHAR(12) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    region VARCHAR(100) NOT NULL,
    comuna VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    apartamento VARCHAR(100),
    numeracion VARCHAR(100) NOT NULL,
    instruccionesEspeciales TEXT,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);

-- Tabla de Facturación
CREATE TABLE facturas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    rut VARCHAR(12),
    direccion VARCHAR(255),
    correo VARCHAR(100),
    telefono VARCHAR(20),
    region VARCHAR(100),
    comuna VARCHAR(100),
    giro VARCHAR(100),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);

-- Tabla de Detalles de Pedidos
CREATE TABLE detalle_pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    producto_id INT,
    cantidad INT,
    precio INT,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Tabla de Carro de Compras
CREATE TABLE carro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    cantidad INT,
    session_id VARCHAR(255),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);


-- Tabla de plantillas
CREATE TABLE plantillas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    ruta_archivo VARCHAR(255),
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP(),
    fecha_modificacion DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(),
    etiquetas VARCHAR(255) DEFAULT NULL
);


CREATE TABLE tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  token VARCHAR(255) NOT NULL,
  usado BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Inserciones en la tabla cat_faq
INSERT INTO cat_faq (id, nombre)
VALUES 
    (1, 'General'),
    (2, 'Productos'),
    (3, 'Envíos');

-- Inserciones en la tabla subcat_faq
INSERT INTO subcat_faq (id, nombre, categoria)
VALUES 
    (1, 'Uso del sitio', 1),
    (2, 'Pago y facturación', 2),
    (3, 'Tiempos de entrega', 3);

-- Inserciones en la tabla faqs
INSERT INTO faqs (pregunta, respuesta, subcat_id)
VALUES 
    ('¿Cómo puedo registrarme?', 'Puedes registrarte haciendo clic en el botón de registro en la parte superior de la página.', 1),
    ('¿Cuáles son los métodos de pago aceptados?', 'Aceptamos tarjetas de crédito, débito y PayPal.', 2),
    ('¿Cuánto tiempo tarda en llegar mi pedido?', 'Los pedidos suelen tardar entre 3 y 5 días hábiles en llegar.', 3);

-- Inserciones en la tabla categorias
INSERT INTO categorias (id, nombre)
VALUES 
    (1, 'Llaveros'),
    (2, 'Lanyard'),
    (3, 'Credencial'),
    (4, 'Personalizado');


-- Inserciones en la tabla subcategorias
INSERT INTO subcategorias (id, nombre, categoria)
VALUES 
    (1, 'Estandar MD01', 2),
    (2, 'Estandar MD02', 2),
    (3, 'Pro MR01', 2),
    (4, 'Pro MR01', 2),
    (5, 'Publicitarios', 1),
    (6, 'PVC Inkjet', 4);

-- Inserciones en la tabla productos
INSERT INTO productos (id, nombre, descripcion, subcategoria, precio, cantidad)
VALUES 
    (1, 'Llavero simple', 'Agrega un toque personal a tus llaveros.', 1, 10, 100),
    (2, 'Lanyard premium', 'Explora nuestra línea premium de lanyards.', 2, 20, 200),
    (3, 'Portacredenciales personalizados', 'Encuentra el portacredenciales perfecto para ti.', 3, 15, 150);



ALTER TABLE pedidos ADD COLUMN descuentoAplicado DECIMAL(10, 2) DEFAULT 0;

