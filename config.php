<?php
require('src/Razorpay.php'); // This is required if you're using Composer for Razorpay

use Razorpay\Api\Api;

// ✅ Replace with your Razorpay API credentials
$keyId = "rzp_test_n2bqaqSX2MyswJ";
$keySecret = "ez1um3o4JpAeGm6Qh9yECmsi";

// Create an instance of Razorpay API
$api = new Api($keyId, $keySecret);
?>
