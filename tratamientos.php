<?php
include 'db.php';
header('Content-Type: application/json');

$sql = 'SELECT id, "SHAPE_Area", "Tratamient", ST_AsGeoJSON(geom) AS geometry FROM tratamientos_urbanisticos';
$result = $conn->query($sql);

$features = [];
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $features[] = [
        "type" => "Feature",
        "geometry" => json_decode($row['geometry']),
        "properties" => [
            "id" => $row['id'],
            "shape_area" => $row['SHAPE_Area'],
            "tratamient" => $row['Tratamient']
        ]
    ];
}

echo json_encode([
    "type" => "FeatureCollection",
    "features" => $features
]);
?>
