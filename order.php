<?php
require('src/Razorpay.php');
require('config.php');

use Razorpay\Api\Api;

header('Content-Type: application/json'); // ✅ Important

$api_key = 'rzp_test_n2bqaqSX2MyswJ';
$api_secret = 'ez1um3o4JpAeGm6Qh9yECmsi';

$api = new Api($api_key, $api_secret);

// You can dynamically set this based on frontend logic
$amount = 9900; // in paise (₹99)

try {
    $order = $api->order->create([
        'amount' => $amount,
        'currency' => 'INR',
        'receipt' => 'order_rcptid_11',
        'payment_capture' => 1
    ]);

    echo json_encode([
        'order_id' => $order->id,
        'amount' => $amount
    ]);
} catch (Exception $e) {
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
?>

