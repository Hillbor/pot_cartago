<?php
include 'db.php';
header('Content-Type: application/json');

$sql = 'SELECT id, "Shape_Area", "Actividad", ST_AsGeoJSON(geom) AS geometry FROM areas_actividad';
$result = $conn->query($sql);

$features = [];
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $features[] = [
        "type" => "Feature",
        "geometry" => json_decode($row['geometry']),
        "properties" => [
            "id" => $row['id'],
            "shape_area" => $row['Shape_Area'],
            "actividad" => $row['Actividad']
        ]
    ];
}

echo json_encode([
    "type" => "FeatureCollection",
    "features" => $features
]);
?>
