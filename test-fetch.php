<?php
require 'db.php';

header('Content-Type: application/json');

try {
    $stmt = $conn->prepare("SELECT id, name FROM duty_type");
    $stmt->execute();
    $result = $stmt->get_result();
    $duty_types = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();

    // Output the JSON data
    echo json_encode($duty_types);
} catch (Exception $e) {
    // Handle error - output JSON error message
    echo json_encode(['error' => 'Error fetching duties: ' . $e->getMessage()]);
}
?>