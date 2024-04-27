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

<head>
    <script src="icon/chairman-icon.js" defer></script>
    <script src="icon/platform-icon.js" defer></script>
    <script src="icon/entrance-attendant-icon.js" defer></script>
    <script src="icon/auditorium-attendant-icon.js" defer></script>
    <script src="icon/zoom-attendant-icon.js" defer></script>
    <script src="icon/sound-box-icon.js" defer></script>
    <script src="icon/bs-reader-icon.js" defer></script>
    <script src="icon/wt-reader-icon.js" defer></script>
    <script src="icon/roving-mic-icon.js" defer></script>
    <script src="icon/hall-cleaning-icon.js" defer></script>
</head>


<body>
    <header-info title="Parkside Duties" subtitle="Choose a Duty">
    </header-info>
    <duty-btn-grid></duty-btn-grid>
    <nav-bar isAdmin="<?php echo $isAdmin; ?>"></nav-bar>
</body>

</html>