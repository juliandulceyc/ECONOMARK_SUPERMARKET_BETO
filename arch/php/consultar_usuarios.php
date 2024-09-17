<?php
include 'conexion.php'; // Conectar a la base de datos

// Consulta con JOIN
$sql = "SELECT u.nombre, p.nombre_producto FROM usuarios u JOIN pedidos p ON u.id = p.usuario_id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "Usuario: " . $row["nombre"]. " - Producto: " . $row["nombre_producto"]. "<br>";
    }
} else {
    echo "0 resultados";
}
?>