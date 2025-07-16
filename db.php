<?php
$host = "localhost";
$dbname = "pot_cartago";
$user = "postgres";
$password = "pos";

try {
    $conn = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>
