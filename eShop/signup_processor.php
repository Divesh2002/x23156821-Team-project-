<?php
require 'db_config.php';

// Set the Content-Type of the response to JSON
header('Content-Type: application/json');

// Retrieve the username and password from the POST request
$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

// Prepare the SQL query to insert a new user into the 'users' table
$sql = "INSERT INTO users (username, password) VALUES (?, ?)";
$stmt = $conn->prepare($sql);

// Bind the parameters (username and hashed password) to the SQL query
$stmt->bind_param('ss', $username, $password);

// Initialize an array to hold the response
$response = [];

// Execute the SQL query and check if it was successful
if ($stmt->execute()) {
    $response['success'] = true;
} else {
    $response['success'] = false;
    $response['error'] = 'Could not create user.';
}

// Encode the response array as JSON and output it
echo json_encode($response);

// Close the statement and connection
$stmt->close();
$conn->close();
?>
