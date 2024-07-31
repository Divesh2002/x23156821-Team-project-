<?php
require 'db_config.php';

// Set the Content-Type of the response to JSON
header('Content-Type: application/json');

// Retrieve the username and password from the POST request
$username = $_POST['username'];
$password = $_POST['password'];

// Prepare the SQL query to select the hashed password for the given username
$sql = "SELECT password FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);

// Bind the username parameter to the SQL query
$stmt->bind_param('s', $username);
$stmt->execute();
$stmt->store_result();

// Initialize an array to hold the response
$response = [];

// Check if a user with the given username exists
if ($stmt->num_rows > 0) {
    // Bind the result to a variable
    $stmt->bind_result($hashed_password);
    $stmt->fetch();
    
    // Verify the provided password against the stored hashed password
    if (password_verify($password, $hashed_password)) {
        $response['success'] = true;
    } else {
        $response['success'] = false;
        $response['error'] = 'Invalid username or password';
    }
} else {
    $response['success'] = false;
    $response['error'] = 'Invalid username or password';
}

// Encode the response array as JSON and output it
echo json_encode($response);

// Close the statement and connection
$stmt->close();
$conn->close();
?>
