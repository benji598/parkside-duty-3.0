<?php
require 'db.php';
session_start();

// Redirect to splash.php if the user isn't logged in
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header('Location: splash.php');
    exit;
}

// Get the duty ID from the URL parameter
$duty_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Fetch duty details from the database using the ID
$stmt = $conn->prepare("SELECT * FROM duty_type WHERE id = ?");
$stmt->bind_param("i", $duty_id);
$stmt->execute();
$result = $stmt->get_result();
$duty = $result->fetch_assoc();

// If no duty found, redirect to index or show an error
if (!$duty) {
    header('Location: index.php');
    exit;
}

// Close the database connection
$stmt->close();
$conn->close();

// Duty name for the title
$duty_name = $duty['name'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo htmlspecialchars($duty_name); ?> - Park Side</title>
    <!-- ... [other head elements] ... -->
</head>
<body>

<header-info>
      <div slot="subtitle-slot">
      <h1><?php echo htmlspecialchars($duty_name); ?> Duties</h1>
         <?php include 'header.php'; ?>
      </div>
    </header-info>

    <main class="container overflow">
      <div class="hp-btn-container">

          <main class="container overflow">
              <div class="hp-btn-container">
                <p>the users assigned to this duty will go here.</p>
              </div>
          </main>
      </div>
    </main>


</body>
</html>
