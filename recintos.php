<?php
include 'db.php';
header('Content-Type: application/json');

$sql = 'SELECT id, "SHAPE_Area", "Descripcio", ST_AsGeoJSON(geom) AS geometry FROM recintos_urbanos';
$result = $conn->query($sql);

$features = [];
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $features[] = [
        "type" => "Feature",
        "geometry" => json_decode($row['geometry']),
        "properties" => [
            "id" => $row['id'],
            "shape_area" => $row['SHAPE_Area'],
            "descripcio" => $row['Descripcio']
        ]
    ];
}

echo json_encode([
    "type" => "FeatureCollection",
    "features" => $features
]);
?>
