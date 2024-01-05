<?php
require 'db.php';


// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Sanitize and validate input
    $firstname = isset($_POST['firstname']) ? filter_var($_POST['firstname'], FILTER_SANITIZE_SPECIAL_CHARS) : '';
    $lastname = isset($_POST['lastname']) ? filter_var($_POST['lastname'], FILTER_SANITIZE_SPECIAL_CHARS) : '';
    $phone = isset($_POST['phone']) ? filter_var($_POST['phone'], FILTER_SANITIZE_SPECIAL_CHARS) : '';
    $duty_ids = filter_input(INPUT_POST, 'duty_ids', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY);

    // Begin transaction
    $conn->begin_transaction();

    try {
        // Insert new sub user
        $stmt = $conn->prepare("INSERT INTO sub_users (firstname, lastname, phone) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $firstname, $lastname, $phone);
        $stmt->execute();
        $new_sub_user_id = $conn->insert_id;
        $stmt->close();

        // Assign duties to the new sub user
        $stmt = $conn->prepare("INSERT INTO sub_user_duty_assignment (sub_user_id, duty_id) VALUES (?, ?)");
        foreach ($duty_ids as $duty_id) {
            $stmt->bind_param("ii", $new_sub_user_id, $duty_id);
            $stmt->execute();
        }
        $stmt->close();

        // Commit transaction
        $conn->commit();
    } catch (Exception $e) {
        // An error occurred, rollback transaction
        $conn->rollback();
        // Set an error message to display to the admin
        echo("there's an error..");
        print_r('Error adding sub user: ' . $e->getMessage(), true);
    }

    // Redirect back to the admin page
    header('Location: admin.php?edited=99999');
    exit;
}
?>
