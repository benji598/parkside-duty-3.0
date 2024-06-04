<?php if (!isset($_SESSION)) { session_start(); } header("Cache-Control: max-age=3600"); // Cache for 1 hour
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Park Side</title>
    <meta name="description" content="New Parkside duty app" />

    <link href="/css/global.css" rel="prefetch">
    <link href="/css/global.css" rel="stylesheet" type="text/css">

    <script src="components/header-info.js" defer></script>
    <script src="icon/duties-icon.js" defer></script>
    <script src="icon/login-icon.js" defer></script>
    <script src="icon/admin-icon.js" defer></script>
    <script src="components/main.js" defer></script>
    <script src="components/duty-btn.js" defer></script>
    <script src="components/btn-design.js" defer></script>
    <script src="components/duty-btn-grid.js" defer></script>
    <script src="components/get-duty-name.js" defer></script>
    <script src="components/network-status.js" defer></script>
    <script src="components/nav-bar.js" defer></script>
    <script src="js/global.js"></script>

    <?php
    // Stylesheets
    $styles = $styles ?? [
        '/css/admin.css',
        '/css/tables.css'
    ];
    foreach ($styles as $style) {
        echo "<link rel='stylesheet' href='{$style}' />";
        echo "<link rel='preload' href='{$style}' as='style' />";
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
        font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            'Open Sans',
            'Helvetica Neue',
            sans-serif;
    }
    </style>

    <script type="speculationrules">
        {
        "prerender": [
          {
            "source": "document",
            "where": {
              "href_matches": "/*"
            },
            "eagerness": "moderate"
          }
        ]
      }
    </script>

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