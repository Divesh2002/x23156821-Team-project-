<?php
require 'db_config.php';

// Set the Content-Type of the response to JSON
header('Content-Type: application/json');

// Retrieve the form data and cart data from the POST request
$cart = json_decode($_POST['cart'], true);
$name = $_POST['name'];
$email = $_POST['email'];
$address = $_POST['address'];
$city = $_POST['city'];
$paymentMethod = $_POST['payment-method'];
$cardNumber = $_POST['card-number'];
$expiryDate = $_POST['expiry-date'];
$cvv = $_POST['cvv'];

// Prepare the SQL query to insert order information into the orders table
$sql = "INSERT INTO orders (name, email, address, city, payment_method, card_number, expiry_date, cvv, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// Calculate the total amount for the order
$totalAmount = array_reduce($cart, function($sum, $item) {
    return $sum + ($item['price'] * $item['quantity']);
}, 0);

// Bind the parameters and execute the SQL query
$stmt->bind_param('sssssssss', $name, $email, $address, $city, $paymentMethod, $cardNumber, $expiryDate, $cvv, $totalAmount);

$response = [];

// If the order is successfully placed, insert order details into the order_details table
if ($stmt->execute()) {
    $orderId = $stmt->insert_id;

    $orderDetailsSql = "INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
    $orderDetailsStmt = $conn->prepare($orderDetailsSql);

    // Insert each item in the cart as part of the order details
    foreach ($cart as $item) {
        $orderDetailsStmt->bind_param('iiid', $orderId, $item['id'], $item['quantity'], $item['price']);
        $orderDetailsStmt->execute();
    }

    $response['success'] = true;
} else {
    $response['success'] = false;
    $response['error'] = 'Could not place order.';
}

// Output the JSON response
echo json_encode($response);

// Close the statement and connection
$stmt->close();
$conn->close();
?>
