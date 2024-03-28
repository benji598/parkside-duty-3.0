<?php 

// Router script to handle API requests
if (preg_match('/^\/api\//', $_SERVER['REQUEST_URI'])) {
    require __DIR__ . '/backend.php';
    exit; // Stop further processing
}

include 'header.php'; 
require 'db.php';

if ($isAdmin) {
    $first_name = $_SESSION['first_name'];
    $last_name = $_SESSION['last_name'];
    $fullName = $first_name . ' ' . $last_name;
} else {
    $first_name = "Guest";
    $last_name = "Account";
    $fullName = "";
}
?>


<body>
    <header-info title="Parkside Duties" subtitle="Choose a Duty"></header-info>
    <duty-btn-grid></duty-btn-grid>
    <nav-bar isAdmin="<?php echo $isAdmin; ?>"></nav-bar>
</body>

</html>