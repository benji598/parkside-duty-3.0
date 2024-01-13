<?php

require 'db.php'; // Ensure this points to your database connection file

// Check if the form has been submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $meeting_1 = $_POST['meeting_1'] ?? '';
    $meeting_2 = $_POST['meeting_2'] ?? '';

    // Update meeting_1
    $stmt = $conn->prepare("UPDATE core_config_data SET setting_1 = ? WHERE name = 'meeting_1'");
    $stmt->bind_param("s", $meeting_1);
    $stmt->execute();

    // Update meeting_2
    $stmt = $conn->prepare("UPDATE core_config_data SET setting_1 = ? WHERE name = 'meeting_2'");
    $stmt->bind_param("s", $meeting_2);
    $stmt->execute();

    $stmt->close();

    header('Location: admin.php?meeting_update=success');
    exit;
}

?>
