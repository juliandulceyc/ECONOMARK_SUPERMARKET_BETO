DROP DATABASE IF EXISTS credenciales;
CREATE DATABASE credenciales;
USE credenciales;

CREATE TABLE credenciales (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	rol INT NOT NULL, 
	username varchar(80) NOT NULL,
	password varchar(300) NOT NULL
);

INSERT INTO credenciales (id, rol, username, password) VALUES
(1, 1, 'HCD', '$2b$10$g/oBQPO9KrWLoxDG6NJbjeMfW1/NQMKjK7cE70uwCGwIqLLrs8EEW'),
(2, 2, 'Acutor', '$2b$10$F8Bp2qS5td6W/wxILMUuBOzluZmaSiVkwvM6cJVZptQEXU25GPlx.');

DROP DATABASE IF EXISTS productos;
CREATE DATABASE productos;
USE productos;
CREATE TABLE productos  (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre varchar(80) NOT NULL,
  categoria varchar(150) NOT NULL,
  precio DECIMAL(10,3) NOT NULL,
  createdAt DATE,
  updatedAt DATE	
)

¡¡¡¡esto datos siguientes se ingresan luego de los que se preceden no a la vez!!!

INSERT INTO productos (nombre, categoria, precio) VALUES
('Arroz', 'Granos', 3.000),
('Leche', 'Lácteos', 3.500),
('Pan', 'Panadería', 6.000);