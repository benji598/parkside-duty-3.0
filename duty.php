<?php

require 'db.php';
require 'functions.php';
include 'header.php'; 

// Get the duty ID from the URL parameter
$duty_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Handle delete request
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete'])) {
    $sub_user_id = $_POST['sub_user_id'] ?? null;
    if ($sub_user_id && deleteSubUserFromDuty($conn, $sub_user_id, $duty_id)) {
        // Deletion was successful
    }
}

// Fetch duty details from the database using the ID
$stmt = $conn->prepare("SELECT * FROM duty_type WHERE id = ?");
$stmt->bind_param("i", $duty_id);
$stmt->execute();
$result_duty = $stmt->get_result();
$duty = $result_duty->fetch_assoc();

// If no duty found, redirect to index or show an error
if (!$duty) {
    header('Location: index.php');
    exit;
}

// Fetch sub-users assigned to this duty
    $stmt = $conn->prepare("
    SELECT su.id as sub_user_id, su.firstname, su.lastname, su.phone, dt.message 
        FROM sub_user_duty_assignment as suda
        JOIN sub_users as su ON suda.sub_user_id = su.id
        join duty_type as dt on dt.id = ?
        WHERE suda.duty_id = 1
    ");
    $stmt->bind_param("i", $duty_id);
    $stmt->execute();
    $result_sub_users = $stmt->get_result();

    // Duty name for the title
    $duty_name = $duty['name'];
    $stmt->close();
?>

<body>

    <header-info title="<?php echo htmlspecialchars($duty_name); ?>" subtitle="Choose a Duty"></header-info>
    <name-send></name-send>
    <name-list-layout>
        <?php while ($sub_user = $result_sub_users->fetch_assoc()): ?>
        <name-holder name="
                <?php echo htmlspecialchars($sub_user['firstname']); ?> 
                <?php echo htmlspecialchars($sub_user['lastname']); ?>">
        </name-holder>
        <send-button firstName="<?php echo htmlspecialchars($sub_user['firstname']); ?>"
            lastName="<?php echo htmlspecialchars($sub_user['lastname']); ?>"
            message="<?php echo htmlspecialchars($sub_user['message']); ?>"
            dutyName="<?php echo htmlspecialchars($duty_name); ?>"
            number="<?php echo htmlspecialchars($sub_user['phone']); ?>" icon="<send-icon></send-icon>">
        </send-button>

        <?php endwhile; ?>
    </name-list-layout>


    <!-- admin see only -->
    <?php if ($isAdmin) { ?>
    <?php } ?>


    <filtered-data></filtered-data>
    <nav-bar></nav-bar>
</body>

</html>