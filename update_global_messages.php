<?php

require 'db.php'; // Ensure this points to your database connection file

// Check if the form has been submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Extract posted values
    $duty_message = isset($_POST['duty_message']) ? $_POST['duty_message'] : '';
    $cover_message = isset($_POST['cover_message']) ? $_POST['cover_message'] : '';

    // Prepare SQL statement to update duty_message
    $stmt = $conn->prepare("UPDATE core_config_data SET setting_1 = ? WHERE name = 'duty_message'");
    $stmt->bind_param("s", $duty_message);
    $stmt->execute();

    // Prepare SQL statement to update cover_message
    $stmt = $conn->prepare("UPDATE core_config_data SET setting_1 = ? WHERE name = 'cover_message'");
    $stmt->bind_param("s", $cover_message);
    $stmt->execute();

    // Close statement
    $stmt->close();

    // Redirect back to the admin page or display a success message
    header('Location: admin.php');
    exit;
}

?>
