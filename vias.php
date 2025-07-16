<?php
// vias.php - Devuelve la capa de sistema vial en formato GeoJSON

include 'db.php';
header('Content-Type: application/json');

// Consulta SQL a la tabla sistema_vial
$sql = 'SELECT id, "Jerarquia", ST_AsGeoJSON(geom) AS geometry FROM sistema_vial';
$result = $conn->query($sql);

// Convertir resultados en arreglo GeoJSON
$features = [];

while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $features[] = [
        "type" => "Feature",
        "geometry" => json_decode($row['geometry']),
        "properties" => [
            "id" => $row['id'],
            "jerarquia" => $row['Jerarquia']
        ]
    ];
}

// Salida final como FeatureCollection
echo json_encode([
    "type" => "FeatureCollection",
    "features" => $features
]);
?>
