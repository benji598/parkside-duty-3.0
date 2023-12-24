<?php
require 'db.php';
require 'header.php';

// Check if the user is logged in and if the request is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $isAdmin) {

// Sanitize and validate inputs
$userId = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);
$firstname = filter_input(INPUT_POST, 'firstname', FILTER_SANITIZE_STRING);
$lastname = filter_input(INPUT_POST, 'lastname', FILTER_SANITIZE_STRING);
$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
$duties = json_decode($_POST['duties'], true); // Assuming duties are sent as a JSON array

// Begin transaction
$conn->begin_transaction();

try {
    // Update sub-user's basic information
    $stmt = $conn->prepare("UPDATE sub_users SET firstname = ?, lastname = ?, phone = ? WHERE id = ?");
    $stmt->bind_param("sssi", $firstname, $lastname, $phone, $userId);
    $stmt->execute();
    $stmt->close();

    // Update sub-user's duty assignments
    // First, clear existing assignments
    $stmt = $conn->prepare("DELETE FROM sub_user_duty_assignment WHERE sub_user_id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $stmt->close();

    // Then, insert new assignments
    $stmt = $conn->prepare("INSERT INTO sub_user_duty_assignment (sub_user_id, duty_id) VALUES (?, ?)");
    foreach ($duties as $dutyId) {
        $stmt->bind_param("ii", $userId, $dutyId);
        $stmt->execute();
    }
    $stmt->close();

    // Commit transaction
    $conn->commit();

    $_SESSION['message'] = "Sub-user updated successfully.";
} catch (Exception $e) {
    // An error occurred, rollback transaction
    $conn->rollback();
    $_SESSION['error_message'] = "Error updating sub-user: " . $e->getMessage();
}

// Redirect back to the admin page, specifically the user we just edited
header('Location: admin.php?edited=' . $userId);
exit;
}
?>
