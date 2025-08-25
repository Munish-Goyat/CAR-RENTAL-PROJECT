<?php
$servername = "localhost";
$username = "root";
$password = ""; // No password as seen in your previous setup
$database = "car_rental";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
