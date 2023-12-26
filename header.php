<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- <meta name="view-transition" content="same-origin" /> -->
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Park Side</title>
    <meta name="description" content="New Parkside duty app" />

    <link rel="stylesheet" href="/css/hp.css" rel="preload" />
    <link rel="stylesheet" href="/css/tables.css" rel="preload" />

    <!-- Preload the stylesheets -->
    <link rel="preload" href="/css/global.css" as="style" />

    <!-- Apply the stylesheets -->
    <link rel="stylesheet" href="/css/global.css" />

    <script src="components/filterbrothers-data.js" defer></script>
    <script src="components/send-options-content.js" defer></script>
    <script src="components/slide-up-modal.js" defer></script>
    <script src="components/header-info.js" defer></script>
    <script src="components/grid-layout.js" defer></script>
    <script src="components/duty-btn.js" defer></script>

    <script src="icons/chairman-icon.js" defer></script>
    <script src="icons/platform-icon.js" defer></script>
    <script src="icons/entrance-attendant-icon.js" defer></script>
    <script src="icons/auditorium-attendant-icon.js" defer></script>
    <script src="icons/zoom-attendant-icon.js" defer></script>
    <script src="icons/sound-box-icon.js" defer></script>
    <script src="icons/bs-reader-icon.js" defer></script>
    <script src="icons/wt-reader-icon.js" defer></script>
    <script src="icons/roving-mic-icon.js" defer></script>
    <script src="icons/hall-cleaning-icon.js" defer></script>
  

    <script src="icons/duties-icon.js" defer></script>
    <script src="icons/rota-icon.js" defer></script>
    <script src="icons/counter-icon.js" defer></script>
    <script src="components/nav.js" defer></script>
    <style>

      body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
          'Helvetica Neue', sans-serif;
      }
    </style>
  </head>


<?php if (!isset($_SESSION)) { session_start(); } ?>

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
  else{
    $first_name = "Guest";
    $last_name = "Account";
    $fullName = "";
  }

// Get the current page's filename
$current_page = basename($_SERVER['PHP_SELF']);
?>

<div class="user-details">

    <!-- Dashboard Button -->
    <form style="display: inline;" action="index.php" method="get">
        <button type="submit" name="dashboard" class="button" <?php echo ($current_page == 'index.php') ? 'disabled' : ''; ?>>Dashboard</button>
    </form>

    <?php if ($isAdmin) { ?>
        <!-- Admin Button -->
    <form style="display: inline;" action="admin.php" method="get">
        <button type="submit" name="admin" class="button" <?php echo ($current_page == 'admin.php') ? 'disabled' : ''; ?>>Admin</button>
    </form>
    
    <!-- Account Button -->
    <form style="display: inline;" action="account.php" method="get">
        <button type="submit" name="account" class="button" <?php echo ($current_page == 'account.php') ? 'disabled' : ''; ?>>Account</button>
    </form>
    
    <!-- Logout Button -->
    <form style="display: inline;" action="logout.php" method="post">
        <button type="submit" name="logout" class="button">Logout</button>
    </form>

    <?php } ?>

    <?php if (!$isAdmin) { ?>
            <!-- Logout Button -->
    <form style="display: inline;" action="splash.php" method="post">
        <button type="submit" name="logout" class="button">Admin Login</button>
    </form>

    <?php } ?>
</div>
