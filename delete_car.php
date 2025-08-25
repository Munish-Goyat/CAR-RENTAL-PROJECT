<?php
$conn = new mysqli("localhost", "root", "", "car_rental");
if ($conn->connect_error) die("Connection failed");

$id = $_POST['id'];
$stmt = $conn->prepare("DELETE FROM cars WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

echo $stmt->affected_rows > 0 ? "success" : "fail";
$conn->close();
?>
