<?php
// comunas.php - Devuelve la capa de comunas en formato GeoJSON

include 'db.php';
header('Content-Type: application/json');

// Consulta SQL a la tabla comunas
$sql = 'SELECT id, shape_area, ST_AsGeoJSON(geom) AS geometry FROM comunas';
$result = $conn->query($sql);

// Convertir resultados en arreglo GeoJSON
$features = [];

while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $features[] = [
        "type" => "Feature",
        "geometry" => json_decode($row['geometry']),
        "properties" => [
            "id" => $row['id'],
            "shape_area" => $row['shape_area']
        ]
    ];
}

// Salida final como FeatureCollection
echo json_encode([
    "type" => "FeatureCollection",
    "features" => $features
]);
?>
