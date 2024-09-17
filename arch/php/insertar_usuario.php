<?php
include 'conexion.php'; // Conectar a la base de datos

$nombre = "julian castellanos";
$email = "juliancastellanos@gmail.com";
$contraseña = password_hash("contraseña123", PASSWORD_BCRYPT); // Encriptar contraseña

$sql = "INSERT INTO usuarios (nombre, email, contraseña) VALUES ('$nombre', '$email', '$contraseña')";

if ($conn->query($sql) === TRUE) {
    echo "Usuario registrado exitosamente";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
?>