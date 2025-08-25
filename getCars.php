<?php
$brand = $_GET['brand'];

$conn = new mysqli("localhost", "root", "", "car_rental");
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("SELECT * FROM cars WHERE brand = ?");
$stmt->bind_param("s", $brand);
$stmt->execute();

$result = $stmt->get_result();
$cars = [];

while ($row = $result->fetch_assoc()) {
  $cars[] = $row;
}

echo json_encode($cars);
?>
