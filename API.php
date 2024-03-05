<?php
require 'db.php';

header('Content-Type: application/json');

// Function to get duty types
function getDutyTypes($conn) {
    try {
        $stmt = $conn->prepare("SELECT id, name FROM duty_type");
        $stmt->execute();
        $result = $stmt->get_result();
        $duty_types = $result->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $duty_types;
    } catch (Exception $e) {
        return ['error' => 'Error fetching duties: ' . $e->getMessage()];
    }
}

// Function to get a duty type by ID
function getDutyTypeByID($conn, $id) {
    try {
        $stmt = $conn->prepare("SELECT id, name FROM duty_type WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $duty_type = $result->fetch_assoc();
        $stmt->close();

        return $duty_type ?: ['error' => 'Duty type not found'];
    } catch (Exception $e) {
        return ['error' => 'Error fetching duty type: ' . $e->getMessage()];
    }
}

// Call the function based on the 'functionName' parameter
if (isset($_GET['functionName'])) {
    $functionName = $_GET['functionName'];

    switch ($functionName) {
        case 'getDutyTypes':
            $data = getDutyTypes($conn);
            break;
        case 'getDutyTypeByID':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
            $data = getDutyTypeByID($conn, $id);
            break;
        // Add more cases for other functions here
        default:
            $data = ['error' => 'Unknown function'];
    }

    echo json_encode($data);
} else {
    echo json_encode(['error' => 'No function name provided']);
}
?>
