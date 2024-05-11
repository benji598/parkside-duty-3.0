<?php if (!isset($_SESSION)) { session_start(); } ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="view-transition" content="same-origin" />
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Park Side</title>
    <meta name="description" content="New Parkside duty app" />

    <?php
    // Stylesheets
    $styles = $styles ?? [
        '/css/global.css',
        '/css/admin.css',
        '/css/tables.css'
    ];
    foreach ($styles as $style) {
        echo "<link rel='stylesheet' href='{$style}' />";
        echo "<link rel='preload' href='{$style}' as='style' />";
    }

    // Global scripts that are needed on every page
    $globalScripts = [
        "components/header-info.js",
        "icon/duties-icon.js",
        "icon/login-icon.js",
        "icon/admin-icon.js",
        "components/main.js",
        "components/duty-btn.js",
        "components/btn-design.js",
        "components/duty-btn-grid.js",
        "components/get-duty-name.js",
        "components/network-status.js",
        "components/nav-bar.js"
    ];

    foreach ($globalScripts as $script) {
        echo "<script src='{$script}' defer></script>";
    }

    // Include page-specific scripts
    if (!empty($pageSpecificScripts)) {
        foreach ($pageSpecificScripts as $script) {
            echo "<script src='{$script}' defer></script>";
        }
    }
    ?>

    <style>
    body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    </style>
</head>



<!-- Redirect to splash.php if the user isn't logged in -->
<?php 
    // if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    //     header('Location: splash.php');
    // exit;
    //} 

     if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
        $isAdmin = false;
     } 
     else{
        $isAdmin = true;
     }
?>

<!-- User's first name and last name are stored in the session -->
<?php
if ($isAdmin) {
    $first_name = $_SESSION['first_name'];
    $last_name = $_SESSION['last_name'];
    $fullName = $first_name . ' ' . $last_name;
  }
//   else{
//     $first_name = "Guest";
//     $last_name = "Account";
//     $fullName = "";
//   }

// Get the current page's filename
$current_page = basename($_SERVER['PHP_SELF']);
?>