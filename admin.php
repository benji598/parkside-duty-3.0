<?php
require 'db.php';  // Ensure this points to your database connection file
session_start();

// Redirect to splash.php if the user isn't logged in
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header('Location: splash.php');
    exit;
}

// Fetch all duty types from the database
$result = $conn->query("SELECT * FROM duty_type");
?>
<!DOCTYPE html>
<html lang="en">
<head>
   

    <link rel="stylesheet" href="/css/admin.css" rel="prefetch" />
    
</head>
<body>
    <main class="container overflow">
    <header-info>
      <div slot="title-slot">Admin Management</div>
      <div slot="subtitle-slot">
         <?php include 'header.php'; ?>
      </div>
    </header-info>
    <div class="account-container">
            <h2>Manage Duty Types</h2>

            <!-- Table for displaying existing duty types -->
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Icon</th>
                    <th>Link</th>
                </tr>
                <?php while ($row = $result->fetch_assoc()): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($row['id']); ?></td>
                        <td><?php echo htmlspecialchars($row['name']); ?></td>
                        <td><?php echo htmlspecialchars($row['icon']); ?></td>
                        <td><?php echo htmlspecialchars($row['link']); ?></td>
                    </tr>
                <?php endwhile; ?>
            </table>
        </div>
    </main>
    <nav-bar></nav-bar>
</body>
</html>
