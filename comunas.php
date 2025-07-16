<?php
include 'db.php';

header('Content-Type: application/json');

$sql = "SELECT id, shape_area, ST_AsGeoJSON(geom) AS geometry FROM comunas";
$result = $conn->query($sql);

$features = [];

while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $features[] = [
        "type" => "Feature",
        "geometry" => json_decode($row['geometry']),  // Corrección aquí
        "properties" => [
            "id" => $row['id'],
            "shape_area" => $row['shape_area']
        ]
    ];
}

echo json_encode([
    "type" => "FeatureCollection",
    "features" => $features
]);
?>
