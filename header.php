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

    <!-- Preload the stylesheets -->
    <link rel="preload" href="/css/global.css" as="style" />
    <link rel="preload" href="/css/view-transitions.css" as="style" />
    <!-- <link rel="preload" href="/css/hp.css" as="style" /> -->
    <link rel="preload" href="/css/tables.css" as="style" />

    <!-- Apply the stylesheets -->
    <link rel="stylesheet" href="/css/global.css" rel="preload" />
    <!-- <link rel="stylesheet" href="/css/hp.css" rel="preload" /> -->
    <link rel="stylesheet" href="/css/tables.css" rel="preload" />

    <script src="components/header-info.js" defer></script>

    <!-- Nav Icons -->
    <script src="icon/duties-icon.js" defer></script>
    <script src="icon/login-icon.js" defer></script>
    <script src="icon/admin-icon.js" defer></script>


    <!-- Global components -->
    <script src="components/view-transitions.js" defer></script>
    <script src="components/get-duty-name.js" defer></script>
    <script src="components/duty-btn.js" defer></script>
    <script src="components/btn-design.js" defer></script>
    <script src="components/network-status.js" defer></script>
    <script src="components/duty-btn-grid.js" defer></script>
    <script src="components/nav.js" defer></script>


    <!-- <script src="components/filterbrothers-data.js" defer></script> -->
    <style>
    body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
            'Helvetica Neue', sans-serif;
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