<?php

include 'header.php'; 
require 'db.php';  // Ensure this points to your database connection file

// Redirect to splash.php if the user isn't logged in
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header('Location: splash.php');
    exit;
}

// Fetch all duty types from the database
$result_duty_types = $conn->query("SELECT * FROM duty_type");

// Fetch all sub users and their duty assignments from the database
$result_sub_users = $conn->query("
    SELECT su.id, su.firstname, su.lastname, su.phone, GROUP_CONCAT(dt.name ORDER BY dt.name ASC SEPARATOR ', ') AS duties,
    GROUP_CONCAT(dt.id ORDER BY dt.name ASC SEPARATOR ',') AS duty_ids
    FROM sub_users su
    LEFT JOIN sub_user_duty_assignment suda ON su.id = suda.sub_user_id
    LEFT JOIN duty_type dt ON suda.duty_id = dt.id
    GROUP BY su.id
");

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- ... [Other head elements] ... -->
    <link rel="stylesheet" href="/css/admin.css" rel="prefetch" />
    <!-- ... -->
</head>
<body>
    <main class="container overflow">
        <header-info>
            <div slot="title-slot">Admin Management</div>
            <div slot="subtitle-slot"></div>
        </header-info>
        <div class="account-container">
            <h2>Manage Duty Types</h2>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Icon</th>
                    <th>Link</th>
                </tr>
                <?php while ($row = $result_duty_types->fetch_assoc()): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($row['id']); ?></td>
                        <td><?php echo htmlspecialchars($row['name']); ?></td>
                        <td><?php echo htmlspecialchars($row['icon']); ?></td>
                        <td><?php echo htmlspecialchars($row['link']); ?></td>
                    </tr>
                <?php endwhile; ?>
            </table>
        </div>
       <!-- Manage Sub Users Section -->
     <div class="account-container">
            <h2>Manage Sub Users</h2>
            <!-- Table for displaying existing sub users -->
            <table>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Assigned Duties</th>
                </tr>
                <?php while ($row = $result_sub_users->fetch_assoc()): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($row['id']); ?></td>
                        <td><?php echo htmlspecialchars($row['firstname']); ?></td>
                        <td><?php echo htmlspecialchars($row['lastname']); ?></td>
                        <td><?php echo htmlspecialchars($row['phone']); ?></td>
                        <td>
                            <?php
                            // Split duties and ids into arrays
                            $duties = explode(', ', $row['duties']);
                            $duty_ids = explode(',', $row['duty_ids']);
                            foreach ($duties as $index => $duty) {
                                // Ensure there's a corresponding ID for this duty
                                if (isset($duty_ids[$index])) {
                                    $duty_id = $duty_ids[$index];
                                    echo "<a href='duty.php?id=" . htmlspecialchars($duty_id) . "' class='tag'>" . htmlspecialchars($duty) . "</a> ";
                                }
                            }
                            ?>
                        </td>
                    </tr>
                <?php endwhile; ?>
            </table>
        </div>
    </main>
    <nav-bar></nav-bar>
</body>
</html>