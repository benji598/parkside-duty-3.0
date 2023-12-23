<?php

require 'db.php';
require 'functions.php';
include 'header.php'; 

// Redirect to splash.php if the user isn't logged in
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header('Location: splash.php');
    exit;
}

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
    SELECT su.id as sub_user_id, su.firstname, su.lastname, su.phone 
    FROM sub_user_duty_assignment as suda
    JOIN sub_users as su ON suda.sub_user_id = su.id
    WHERE suda.duty_id = ?
");
$stmt->bind_param("i", $duty_id);
$stmt->execute();
$result_sub_users = $stmt->get_result();

// Duty name for the title
$duty_name = $duty['name'];
$stmt->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title><?php echo htmlspecialchars($duty_name); ?> - Park Side</title>
    <script>
        // Confirm deletion with JavaScript before submitting the form
        function confirmDeletion() {
            return confirm('Are you sure you want to remove this user from the duty?');
        }
    </script>
</head>
<body>

<header-info>
    <div slot="subtitle-slot">
        <h1><?php echo htmlspecialchars($duty_name); ?> Duties</h1>
    </div>
</header-info>

<main class="container overflow">
    <div class="hp-btn-container">
    <table>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Actions</th>
            </tr>
            <?php while ($sub_user = $result_sub_users->fetch_assoc()): ?>
                <tr>
                    <td><?php echo htmlspecialchars($sub_user['firstname']); ?></td>
                    <td><?php echo htmlspecialchars($sub_user['lastname']); ?></td>
                    <td><?php echo htmlspecialchars($sub_user['phone']); ?></td>
                    <td>
                        <form method="post" onsubmit="return confirm('Are you sure?');">
                            <input type="hidden" name="sub_user_id" value="<?php echo $sub_user['sub_user_id']; ?>">
                            <input type="hidden" name="duty_id" value="<?php echo $duty_id; ?>">
                            <button type="submit" class="delete-button" name="delete">Delete</button>
                        </form>
                    </td>
                </tr>
            <?php endwhile; ?>
        </table>
    </div>
</main>

</body>
</html>
