<?php
include 'db.php';

header('Content-Type: application/json');

$sql = 'SELECT id, "Jerarquia", ST_AsGeoJSON(geom) AS geometry FROM sistema_vial';
$result = $conn->query($sql);

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

echo json_encode([
    "type" => "FeatureCollection",
    "features" => $features
]);
?>