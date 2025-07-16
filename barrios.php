<?php
include 'db.php';
header('Content-Type: application/json');

$sql = 'SELECT id, "SHAPE_Area", "Nombre", ST_AsGeoJSON(geom) AS geometry FROM barrios';
$result = $conn->query($sql);

$features = [];
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $features[] = [
        "type" => "Feature",
        "geometry" => json_decode($row['geometry']),
        "properties" => [
            "id" => $row['id'],
            "SHAPE_Area" => $row['SHAPE_Area'],
            "Nombre" => $row['Nombre']
        ]
    ];
}

echo json_encode([
    "type" => "FeatureCollection",
    "features" => $features
]);
?>
