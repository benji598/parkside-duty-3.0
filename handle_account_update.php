<?php
require 'db.php';
session_start();

// Check if the user is logged in and the form is submitted
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true && $_SERVER["REQUEST_METHOD"] == "POST") {
    // Assign variables from posted data
    $user_id = $_SESSION['user_id'];
    $first_name = $conn->real_escape_string($_POST['first_name']);
    $last_name = $conn->real_escape_string($_POST['last_name']);
    $email = $conn->real_escape_string($_POST['email']);
    $phone = $conn->real_escape_string($_POST['phone']);

    // Update the user's details in the database
    $stmt = $conn->prepare("UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?");
    $stmt->bind_param("ssssi", $first_name, $last_name, $email, $phone, $user_id);
    
    if ($stmt->execute()) {
        // Update the session variables
        $_SESSION['first_name'] = $first_name;
        $_SESSION['last_name'] = $last_name;
        $_SESSION['email'] = $email;
        $_SESSION['phone'] = $phone;

        // Redirect back to index page with success message
        $_SESSION['account_updated'] = "Your account has been updated successfully.";
        header("location: index.php");
    } else {
        // Handle errors, e.g., duplicate email, etc.
        $_SESSION['account_update_error'] = "An error occurred: " . $stmt->error;
        header("location: index.php");
    }

    $stmt->close();
} else {
    // Redirect to login page if not logged in
    header("location: splash.php");
}

$conn->close();
exit;
?>
