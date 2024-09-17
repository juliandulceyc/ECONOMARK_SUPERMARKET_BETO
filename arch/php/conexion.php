<?php

$server = "localhost";
$user = "root";
$pass = "";
$db = "supermercado_beto";

$conexion = new mysqli($server, $user, $pass, $db);

if ($conexion->connect_errno) {
    die("Conexión Fallida: " . $conexion->connect_error);
} else { 
    echo "Conexión Exitosa";
}

?>