CREATE DATABASE api;
USE api;

CREATE TABLE Productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    categoria VARCHAR(100),
    precio DECIMAL(10, 2),
    stock INT
);

CREATE TABLE Ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    cantidad INT,
    fecha DATE,
    FOREIGN KEY (producto_id) REFERENCES Productos(id)
);

INSERT INTO Productos (nombre, categoria, precio, stock) VALUES
('Arroz', 'Granos', 3.000, 100),
('Leche', 'Lácteos', 3.500, 50),
('Pan', 'Panadería', 6.000, 30);

INSERT INTO Ventas (producto_id, cantidad, fecha) VALUES
(1, 10, '2024-05-18'),
(2, 5, '2024-09-18');

SELECT * FROM Productos;

UPDATE Productos
SET stock = 80
WHERE nombre = 'Arroz';

DELETE FROM Productos
WHERE nombre = 'Pan';

SELECT * FROM Productos
WHERE stock < 10;

SELECT p.nombre, v.cantidad, v.fecha
FROM Productos p
JOIN Ventas v ON p.id = v.producto_id;

SELECT * FROM Productos
WHERE precio = (SELECT MAX(precio) FROM Productos);

CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    contrasena VARCHAR(32)
);

INSERT INTO Usuarios (nombre, contrasena)
VALUES ('Jefferson Contreras', MD5('123'));

INSERT INTO Usuarios (nombre, contrasena)
VALUES ('Julian Castellanos', MD5('1234'));

INSERT INTO Usuarios (nombre, contrasena)
VALUES ('Brandon Carvajal', MD5('12345'));

SELECT * FROM usuarios;



