<?php
include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Parse raw JSON input
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        echo "Invalid JSON input.";
        exit;
    }

    $user_name = $data['user_name'] ?? '';
    $user_email = $data['user_email'] ?? '';
    $car_name = $data['car_name'] ?? '';
    $pickup_date = $data['pickup_date'] ?? '';
    $return_date = $data['return_date'] ?? '';
    $total = $data['total'] ?? 0;
    $payment_id = $data['payment_id'] ?? '';
    $booked_at = date("Y-m-d H:i:s");

    $sql = "INSERT INTO bookings (user_name, user_email, car_name, pickup_date, return_date, total, payment_id, booked_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssdss", $user_name, $user_email, $car_name, $pickup_date, $return_date, $total, $payment_id, $booked_at);

    if ($stmt->execute()) {
        echo "Booking saved successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request.";
}
?>

