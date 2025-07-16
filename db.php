<?php
// db.php - Conexión a la base de datos PostgreSQL/PostGIS

$host = "localhost";
$dbname = "pot_cartago";
$user = "postgres";
$password = "pos";

try {
    // Conexión PDO
    $conn = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
} catch (PDOException $e) {
    // Si hay error, detener ejecución
    die("Error de conexión: " . $e->getMessage());
}
?>
