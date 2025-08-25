<?php
$mysqli = new mysqli("localhost", "root", "", "car_rental");
if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}

header("Content-Type: application/json");

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $stmt = $mysqli->prepare("SELECT id, name, image, fuel, seats, price, mileage FROM cars WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $car = $result->fetch_assoc();
    echo json_encode($car);
} else {
    echo json_encode(["error" => "Car ID not provided"]);
}
?>

