<?php
require 'db.php';
require 'header.php';

// Check if the form is submitted and user is admin
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $isAdmin) {

    // Sanitize and validate input
    $subUserId = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);

    // Begin transaction
    $conn->begin_transaction();

    try {
        // Delete duty assignments for the sub user
        $stmt = $conn->prepare("DELETE FROM sub_user_duty_assignment WHERE sub_user_id = ?");
        $stmt->bind_param("i", $subUserId);
        $stmt->execute();
        $stmt->close();

        // Delete the sub user
        $stmt = $conn->prepare("DELETE FROM sub_users WHERE id = ?");
        $stmt->bind_param("i", $subUserId);
        $stmt->execute();
        $stmt->close();

        // Commit transaction
        $conn->commit();

        // Set a success message (optional)
        $_SESSION['message'] = "Sub-user deleted successfully.";
    } catch (Exception $e) {
        // An error occurred, rollback transaction
        $conn->rollback();
        // Set an error message to display to the admin
        $_SESSION['error_message'] = "Error deleting sub user: " . $e->getMessage();
    }

    // Redirect back to the admin page
    header('Location: admin.php?edited=99999');
    exit;
}
?>
