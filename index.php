<?php 

// Router script to handle API requests
if (preg_match('/^\/api\//', $_SERVER['REQUEST_URI'])) {
    require __DIR__ . '/backend.php';
    exit; // Stop further processing
}

// Include database connection
require 'db.php';

// Start session
session_start();

// Check admin status
$isAdmin = isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true;

// Define Page-specific JavaScript files before including header.php
$pageSpecificScripts = [
    "icon/chairman-icon.js", 
    "icon/platform-icon.js", 
    "icon/entrance-attendant-icon.js",
    "icon/auditorium-attendant-icon.js",
    "icon/zoom-attendant-icon.js",
    "icon/sound-box-icon.js",
    "icon/bs-reader-icon.js",
    "icon/wt-reader-icon.js",
    "icon/roving-mic-icon.js",
    "icon/hall-cleaning-icon.js",
];

// Include the header file
include 'header.php'; 
?>




<body>

    <header-info title="Parkside Duties" subtitle="Choose a Duty">
    </header-info>
    <main-wrapper>
        <duty-btn-grid></duty-btn-grid>
    </main-wrapper>

    <nav-bar isAdmin="<?php echo $isAdmin; ?>"></nav-bar>

</body>

</html>