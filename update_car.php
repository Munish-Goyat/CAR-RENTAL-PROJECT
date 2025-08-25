<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "car_rental";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $_POST["id"];
$name = $_POST["name"];
$mileage = $_POST["mileage"];
$fuel = $_POST["fuel"];
$seats = $_POST["seats"];

$imagePath = null;
if (isset($_FILES["carImage"]) && $_FILES["carImage"]["error"] === UPLOAD_ERR_OK) {
    $uploadDir = "assets/";
    $fileName = basename($_FILES["carImage"]["name"]);
    $targetPath = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES["carImage"]["tmp_name"], $targetPath)) {
        $imagePath = $targetPath;
    } else {
        echo "Failed to upload image";
        exit;
    }
}

if ($imagePath) {
    $sql = "UPDATE cars SET name=?, mileage=?, fuel=?, seats=?, image=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssi", $name, $mileage, $fuel, $seats, $imagePath, $id);
} else {
    $sql = "UPDATE cars SET name=?, mileage=?, fuel=?, seats=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssi", $name, $mileage, $fuel, $seats, $id);
}

if ($stmt->execute()) {
    echo "success";
} else {
    echo "error";
}

$stmt->close();
$conn->close();
?>
