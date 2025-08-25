<?php
$mysqli = new mysqli("localhost", "root", "", "car_rental");
if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}

$result = $mysqli->query("SELECT * FROM cars");
$cars = [];

while ($row = $result->fetch_assoc()) {
    $brand = $row['brand'];
    if (!isset($cars[$brand])) {
        $cars[$brand] = [];
    }
    $cars[$brand][] = $row;
}

header("Content-Type: application/json");
echo json_encode($cars);
?>
