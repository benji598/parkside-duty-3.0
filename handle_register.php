<?php
require 'db.php';
session_start();

// Initialize an error array
$error_messages = [];

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name = $conn->real_escape_string($_POST['first_name']);
    $last_name = $conn->real_escape_string($_POST['last_name']);
    $email = $conn->real_escape_string($_POST['email']);
    $phone = $conn->real_escape_string($_POST['phone']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Check if the two passwords match
    if ($password !== $confirm_password) {
        $error_messages[] = "Passwords do not match.";
    }

    // Continue with registration if there are no errors
    if (empty($error_messages)) {
        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insert the new user into the database
        $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $first_name, $last_name, $email, $phone, $hashed_password);
        
        if ($stmt->execute()) {
            // Redirect to login page on success
            header("location: splash.php");
            exit();
        } else {
            $error_messages[] = "Error with registration: " . $stmt->error;
        }

        $stmt->close();
    }
}

$conn->close();

// If there were errors, display them on the registration page
if (!empty($error_messages)) {
    // $_SESSION['registration_errors'] = $error_messages;
    // print_r($error_messages,true);
    header("location: register.php");
    exit();
}
?>
