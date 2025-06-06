DROP DATABASE IF EXISTS economark;
CREATE DATABASE economark;
USE economark;

-- 1) Credenciales
CREATE TABLE credenciales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rol VARCHAR(80) NOT NULL,
  username VARCHAR(80) NOT NULL,
  correo VARCHAR(300) NOT NULL,
  password VARCHAR(300) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO credenciales (rol, username, correo, password) VALUES
('admin',   'HCD',   'admin@correo.com',  '123'),
('admin',   'julian',   'julian7456@hotmail.com',  '123'),
('empleado','Acutor','acutor@correo.com','$2b$10$F8Bp2qS5td6W/...');

-- 2) Categorías
CREATE TABLE categoria (
  idCategoria INT AUTO_INCREMENT PRIMARY KEY,
  nombreCategoria VARCHAR(50) NOT NULL UNIQUE,
  descripcionCategoria VARCHAR(256),
  estado VARCHAR(80),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO categoria (nombreCategoria, descripcionCategoria, estado) VALUES
('Granos',    '--', '1'),
('Lácteos',   '--', '0'),
('Panadería', '--', '1'),
('Hierbas',   '--', '1'),
('Cereales',  '',   '1');

-- 3) Productos
CREATE TABLE productos (
  idProducto INT AUTO_INCREMENT PRIMARY KEY,
  idCategoria INT NOT NULL,
  nombreProducto VARCHAR(80) NOT NULL UNIQUE,
  precioVenta DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  estado VARCHAR(80),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (idCategoria) REFERENCES categoria(idCategoria)
);

INSERT INTO productos (idCategoria, nombreProducto, precioVenta) VALUES
(1, 'Arroz', 3.000),
(2, 'Leche', 3.500),
(3, 'Pan',   6.000);

-- 4) Proveedores
CREATE TABLE proveedores (
  idProveedor INT AUTO_INCREMENT PRIMARY KEY,
  nombreProveedor VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 5) Clientes
CREATE TABLE clientes (
  idCliente INT           NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombreCliente VARCHAR(100) NOT NULL,
  telefono      VARCHAR(20),
  email         VARCHAR(100),
  createdAt     DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 5a) Habilitamos NO_AUTO_VALUE_ON_ZERO para permitir 0 en AUTO_INCREMENT
SET @@SESSION.sql_mode = CONCAT(@@SESSION.sql_mode, ',NO_AUTO_VALUE_ON_ZERO');

-- 5b) Insertamos el cliente anónimo con ID = 0
INSERT INTO clientes (idCliente, nombreCliente, telefono, email)
VALUES (0, 'No registrado', '--0--', 'anonimo');

-- 5c) Restauramos modos (opcional)
SET @@SESSION.sql_mode = REPLACE(@@SESSION.sql_mode, 'NO_AUTO_VALUE_ON_ZERO', '');

-- 5d) Nos aseguramos de que el próximo ID sea 1
ALTER TABLE clientes AUTO_INCREMENT = 1;

-- 6) Entradas (ingresos)
CREATE TABLE entradas (
  idEntrada INT AUTO_INCREMENT PRIMARY KEY,
  idProveedor INT NOT NULL,
  idUsuario   INT NOT NULL,
  tipo_comprobante VARCHAR(20) NOT NULL,
  serie_comprobante VARCHAR(7),
  num_comprobante   VARCHAR(10) NOT NULL,
  fecha      DATETIME NOT NULL,
  impuesto   DECIMAL(4,2) NOT NULL,
  total      DECIMAL(11,2) NOT NULL,
  estado     VARCHAR(20) NOT NULL,
  createdAt  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (idProveedor) REFERENCES proveedores(idProveedor),
  FOREIGN KEY (idUsuario)   REFERENCES credenciales(id)
);

CREATE TABLE detalle_entradas (
  idDetalle_entrada INT AUTO_INCREMENT PRIMARY KEY,
  idEntrada   INT NOT NULL,
  idProducto  INT NOT NULL,
  cantidad    INT NOT NULL,
  precio      DECIMAL(11,2) NOT NULL,
  FOREIGN KEY (idEntrada)  REFERENCES entradas(idEntrada) ON DELETE CASCADE,
  FOREIGN KEY (idProducto) REFERENCES productos(idProducto)
);

-- 7) Ventas
CREATE TABLE venta (
  idVenta INT AUTO_INCREMENT PRIMARY KEY,
  idCliente INT NULL,
  idUsuario INT NOT NULL,
  tipo_comprobante VARCHAR(20) NOT NULL,
  serie_comprobante VARCHAR(7),
  num_comprobante   VARCHAR(10) NOT NULL,
  fecha_hora DATETIME NOT NULL,
  impuesto   DECIMAL(4,2) NOT NULL,
  total      DECIMAL(11,2) NOT NULL,
  estado     VARCHAR(20) NOT NULL,
  FOREIGN KEY (idCliente) REFERENCES clientes(idCliente),
  FOREIGN KEY (idUsuario) REFERENCES credenciales(id)
);

CREATE TABLE detalle_venta (
  idDetalle_venta INT AUTO_INCREMENT PRIMARY KEY,
  idVenta    INT NOT NULL,
  idProducto INT NOT NULL,
  cantidad   INT NOT NULL,
  precio     DECIMAL(11,2) NOT NULL,
  descuento  DECIMAL(11,2) NOT NULL,
  FOREIGN KEY (idVenta)    REFERENCES venta(idVenta) ON DELETE CASCADE,
  FOREIGN KEY (idProducto) REFERENCES productos(idProducto)
);
