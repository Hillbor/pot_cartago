<?php
include 'db.php';
header('Content-Type: application/json');

$sql = 'SELECT "Nombre", ST_AsGeoJSON(geom) AS geometry FROM perimetro_urbano';
$result = $conn->query($sql);

$features = [];
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $features[] = [
        "type" => "Feature",
        "geometry" => json_decode($row['geometry']),
        "properties" => [
            "Nombre" => $row['Nombre']
        ]
    ];
}

echo json_encode([
    "type" => "FeatureCollection",
    "features" => $features
]);
?>
