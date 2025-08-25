<?php
session_start();
// Redirect if not logged in
if (!isset($_SESSION['username'])) {
    echo "<script>window.top.location.href = 'http://localhost/car_project/register.php';</script>";
    exit();
}
$username = $_SESSION['username'];
$carId = $_GET['id'] ?? '';
?>
<!DOCTYPE html>
<html>
<head>
    <title>Payment</title>
    <script src="https://code.jquery.com/jquery-3.5.0.js"></script>
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    <style>
  body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f4f7f9;
  color: #333;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  text-align: center;
  padding-top: 30px;
  color: #2c3e50;
}

.welcome-text {
  text-align: center;
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
}

#booking-info {
  width: 900px;
  background: white;
  margin: 0 auto 10px;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
}
.box1 {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.box2{
    width: 50%;
}

.heading3 {
  margin-top: 0;
  color: #2980b9;
  margin-bottom: 15px;
  font-size: 22px;
}

#booking-info p {
  font-size: 16px;
  margin: 14px 0;
  line-height: 1.5;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #ddd;
  padding-bottom: 6px;
}

#booking-info p strong {
  flex: 1;
  color: #444;
}

#booking-info span {
  flex: 1;
  text-align: right;
  font-weight: 500;
  color: #2c3e50;
}

#car-img {
  display: block;
  margin: 0 auto 15px;
  max-width: 100%;
  width: 400px;
  height: auto;
}

#car-name {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  display: block;
}

@media (max-width: 600px) {
  #booking-info {
    padding: 20px;
    margin: 20px;
  }

  #booking-info p {
    flex-direction: column;
    align-items: flex-start;
  }

  #booking-info span {
    text-align: left;
    margin-top: 5px;
  }
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
  #pay {
    background-color: #007bff; /* Bootstrap blue */
    color: white;
    padding: 12px 28px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(0, 123, 255, 0.4);
    transition: all 0.3s ease;
}

#pay:hover {
    background-color: #0056b3;
    box-shadow: 0 8px 20px rgba(0, 86, 179, 0.5);
    transform: translateY(-2px);
}

#pay:active {
    transform: translateY(1px);
    box-shadow: 0 4px 10px rgba(0, 86, 179, 0.3);
}

</style>
</head>
<body>
<p class="welcome-text">Hi! <strong><?php echo $username; ?></strong>, Welcome to <strong>Payment Page</strong></p>
<h3 class="heading3">Your Booking Details</h3>
<a href="http://localhost/CAR/index.html"><img src="assets/backBtn.png" alt="" id="backBtn"></a>
<div id="booking-info">
  
<div class="box1">
<img id="car-img" src="" alt="Car Image">
  <p class="car-name"><strong><span id="car-name"></span></strong> </p>
</div>
<div class="box2">
<p><strong>Fuel Type:</strong> <span id="fuel-type"></span></p>
  <p><strong>Seating Capacity:</strong> <span id="seats"></span></p>
  <p><strong>Mileage:</strong> <span id="mileage"></span></p>
  <p><strong>Price per hour:</strong> <span>₹<span id="price">-</span></span></p>
  <p><strong>Pickup Date:</strong> <span id="pickup-date"></span></p>
  <p><strong>Return Date:</strong> <span id="return-date"></span></p>
  <p><strong>Base Fare:</strong> <span>₹<span id="baseFare">-</span></span></p>
  <p><strong>Tax (18%):</strong> <span>₹<span id="taxAmt">-</span></span></p>
  <p><strong>Total Amount:</strong> <span>₹<span id="totlAmt">-</span></span></p>
</div>
</div>
<button onclick="startPayment()" id="pay">Pay using Razorpay >></button>

<script>
// Load booking data from sessionStorage
document.getElementById('pickup-date').textContent = sessionStorage.getItem('pickup');
document.getElementById('return-date').textContent = sessionStorage.getItem('return');

// Load car data using car ID
const carId = "<?= $_GET['id'] ?? '' ?>";
fetch(`get_cars.php?id=${carId}`)
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      alert("Error: " + data.error);
      return;
    }
    document.getElementById('car-name').textContent = data.name;
    document.getElementById('car-img').src = data.image;
    document.getElementById('fuel-type').textContent = data.fuel;
    document.getElementById('seats').textContent = data.seats;
    document.getElementById('price').textContent = data.price;
    document.getElementById('mileage').textContent = data.mileage;
  })
  .catch(err => console.error("Fetch error:", err));
  document.getElementById('baseFare').textContent = sessionStorage.getItem('baseFare') || '-';
    document.getElementById('taxAmt').textContent = sessionStorage.getItem('tax') || '-';
    document.getElementById('totlAmt').textContent = sessionStorage.getItem('total') || '-';

    // Payment function (only runs when user clicks the button)
    function startPayment() {
        const total = sessionStorage.getItem('total');
        if (!total || isNaN(total)) {
            alert("Invalid total amount.");
            return;
        }
        const amountInPaise = parseFloat(total) * 100;

        var options = {
            "key": "rzp_test_n2bqaqSX2MyswJ", // Replace with your Razorpay key
            "amount": amountInPaise.toString(),
            "currency": "INR",
            "name": "Car Rental",
            "description": "Rental Payment",
            handler: function (response) {
              const username = localStorage.getItem('username');
              const email = localStorage.getItem('email');
              const car_name = document.getElementById('car-name').textContent;
              const pickup = sessionStorage.getItem('pickup');
              const ret = sessionStorage.getItem('return');
              const baseFare = sessionStorage.getItem('baseFare');
              const tax = sessionStorage.getItem('tax');
              const total = sessionStorage.getItem('total');
              const carId = "<?php echo $_GET['id'] ?? ''; ?>";

              fetch('save_booking.php', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  user_name: username,
                    user_email: email,
                    car_name: car_name,
                    pickup_date: pickup,
                    return_date: ret,
                    total: total,
                    payment_id: response.razorpay_payment_id
                })
              })
              .then(res => res.text())
              .then(data => {
                console.log("Booking saved:", data);
                alert("Payment Successful!\nBooking has been saved.");
                sessionStorage.setItem('paymentDone', 'true');
                document.getElementById('pay').style.display = 'none';
              })
              .catch(err => console.error("Booking save failed:", err));
            },

            "theme": {
                "color": "#3399cc"
            }
        };

        var rzp = new Razorpay(options);
        rzp.open();
    }

// AJAX call to get order details and then call startPayment
// $.ajax({
//     type: "POST",
//     url: "order.php",
//     success: function (res) {
//         if (res.error) {
//             alert("Error creating order: " + res.error);
//         } else {
//             startPayment(res.order_id, res.amount);
//         }
//     }
// });
</script>
</body>
</html>
