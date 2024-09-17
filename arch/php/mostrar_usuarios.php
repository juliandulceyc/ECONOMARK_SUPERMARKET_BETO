<?php
include 'conexion.php'; // Asegúrate de que la ruta sea correcta

// Abrir HTML
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>Usuarios</title>
</head>
<body>
    <div class="container">
        <h1 class="mt-5">Lista de Usuarios</h1>
        <table class="table table-striped mt-3">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Fecha de Creación</th>
                </tr>
            </thead>
            <tbody>
                <?php
                // Consultar usuarios
                $sql = "SELECT id, nombre, email, fecha_creacion FROM usuarios";
                $result = $conn->query($sql);

                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        echo "<tr>
                                <td>{$row['id']}</td>
                                <td>{$row['nombre']}</td>
                                <td>{$row['email']}</td>
                                <td>{$row['fecha_creacion']}</td>
                              </tr>";
                    }
                } else {
                    echo "<tr><td colspan='4'>No hay usuarios</td></tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</body>
</html>
Resumen