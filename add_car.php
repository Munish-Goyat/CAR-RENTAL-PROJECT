<?php
$conn = new mysqli("localhost", "root", "", "car_rental");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $brand = $_POST['brand'];
    $name = $_POST['name'];
    $rating = $_POST['rating'];
    $reviews = $_POST['reviews'];
    $seats = $_POST['seats'];
    $transmission = $_POST['transmission'];
    $mileage = $_POST['mileage'];
    $fuel = $_POST['fuel'];
    $price = $_POST['price'];

    // Handle file upload
    if (isset($_FILES['image'])) {
        $image = $_FILES['image']['name'];
        $temp = $_FILES['image']['tmp_name'];
        $path = "assets/" . basename($image);
        move_uploaded_file($temp, $path);
    } else {
        echo "Image upload failed";
        exit;
    }

    $query = "INSERT INTO cars (brand, name, image, rating, reviews, seats, transmission, mileage, fuel, price)
              VALUES ('$brand', '$name', '$path', '$rating', '$reviews', '$seats', '$transmission', '$mileage', '$fuel', '$price')";

    if ($conn->query($query) === TRUE) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
