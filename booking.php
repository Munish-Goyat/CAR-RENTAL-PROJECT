<?php
session_start();

$conn = mysqli_connect("localhost", "root", "", "car_rental");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Cancel booking logic
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['cancel_booking_id'])) {
    $booking_id = $_POST['cancel_booking_id'];
    $delete_sql = "DELETE FROM bookings WHERE id = $booking_id";
    mysqli_query($conn, $delete_sql);
}

if (!isset($_SESSION['username'])) {
    echo "Please log in to view your bookings.";
    exit();
}

$user_name = $_SESSION['username'];

$sql = "SELECT b.*, c.image, c.brand, c.rating, c.reviews, c.seats, c.transmission, c.mileage, c.fuel, c.price
        FROM bookings b
        JOIN cars c ON b.car_name = c.name
        WHERE b.user_name = '$user_name'";

$result = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html>
<head>
    <title>My Bookings</title>
    <style>
        :root {
            --max-width: 1200px;
            --primary-color: #2C5364;
            --primary-color-dark: #0F2027;
            --text-dark: #1f2937;
            --text-light: #6b7280;
            --extra-light: #E5ECF4;
            --white: #ffffff;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', sans-serif;
            background-color: var(--extra-light);
            padding: 40px 0;
            color: var(--text-dark);
        }

        h1 {
            text-align: center;
            color: var(--primary-color);
            margin-bottom: 40px;
        }

        .container {
            max-width: var(--max-width);
            margin: 0 auto;
            padding: 0 20px;
        }

        .booking-card {
            background-color: var(--white);
            border: 1.5px solid var(--primary-color);
            border-radius: 12px;
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            box-shadow: 0 4px 12px rgba(44, 83, 100, 0.1);
            overflow: hidden;
            width: 750px;
            margin-left: auto;
            margin-right: auto;
            transition: transform 0.2s ease;
        }

        .booking-card:hover {
            transform: translateY(-4px);
        }

        .car-image {
            flex: 0 0 200px;
            text-align: center;
            background-color: var(--extra-light);
            padding: 20px;
        }

        .car-image img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
        }

        .car-name {
            margin-top: 10px;
            font-weight: bold;
            color: var(--primary-color-dark);
        }

        .details {
            flex: 1;
            padding: 20px;
            font-size: 15.5px;
            color: var(--text-dark);
            line-height: 1.7;
        }

        .details span {
            font-weight: bold;
            color: var(--primary-color);
        }

        .cancel-form {
            margin-top: 10px;
        }

        .cancel-form button {
            background-color: #dc3545;
            color: white;
            padding: 6px 12px;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }

        .cancel-form button:hover {
            background-color: #b02a37;
        }

        .no-bookings {
            text-align: center;
            font-size: 18px;
            color: var(--text-light);
        }
        #backBtn {
            position: absolute;
            top: 40px;
            right: 30px;
            height: 40px;
        }
        #backBtn:hover{
            cursor: pointer;
        }
    </style>
</head>
<body>

<h1>My Bookings</h1>
<div class="container">
<a href="http://localhost/CAR/index.html"><img src="assets/backBtn.png" alt="" id="backBtn"></a>
<?php
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        echo "<div class='booking-card'>";
        echo "<div class='car-image'>";
        echo "<img src='" . $row['image'] . "' alt='Car'>";
        echo "<div class='car-name'>" . $row['car_name'] . "</div>";
        echo "</div>";
        echo "<div class='details'>";
        echo "<div><span>Pickup:</span> " . $row['pickup_date'] . "</div>";
        echo "<div><span>Return:</span> " . $row['return_date'] . "</div>";
        echo "<div><span>Total:</span> ₹" . $row['total'] . "</div>";
        echo "<div><span>Fuel:</span> " . $row['fuel'] . "</div>";
        echo "<div><span>Mileage:</span> " . $row['mileage'] . "</div>";

        echo "<form method='POST' class='cancel-form' onsubmit='return confirm(\"Are you sure you want to cancel this booking?\")'>";
        echo "<input type='hidden' name='cancel_booking_id' value='" . $row['id'] . "'>";
        echo "<button type='submit'>Cancel Booking</button>";
        echo "</form>";

        echo "</div>";
        echo "</div>";
    }
} else {
    echo "<p class='no-bookings'>No bookings found.</p>";
}
mysqli_close($conn);
?>

</div>
</body>
</html>
