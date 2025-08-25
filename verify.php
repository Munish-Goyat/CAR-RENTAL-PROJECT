<?php
require('src/Razorpay.php');
require('config.php');

use Razorpay\Api\Api;

header('Content-Type: application/json');

$api_key = 'rzp_test_n2bqaqSX2MyswJ';
$api_secret = 'ez1um3o4JpAeGm6Qh9yECmsi';

$api = new Api($api_key, $api_secret);

$success = true;
$error = null;

$payment_id = $_POST['razorpay_payment_id'];
$razorpay_signature = $_POST['razorpay_signature'];

try {
    $attributes = array(
        'razorpay_order_id' => $_POST['razorpay_order_id'],
        'razorpay_payment_id' => $payment_id,
        'razorpay_signature' => $razorpay_signature
    );

    $api->utility->verifyPaymentSignature($attributes);
} catch (\Razorpay\Api\Errors\SignatureVerificationError $e) {
    $success = false;
    $error = 'Razorpay Signature verification failed: ' . $e->getMessage();
}

if ($success) {
    $payment = $api->payment->fetch($payment_id);
    $amount_paid = $payment->amount / 100;

    echo json_encode([
        'status' => 'success',
        'amount' => $amount_paid,
        'message' => 'Payment Successful!'
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => $error
    ]);
}
?>
