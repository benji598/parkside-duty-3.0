<?php if (!isset($_SESSION)) { session_start(); } ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- <meta name="view-transition" content="same-origin" /> -->
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Park Side</title>
    <meta name="description" content="New Parkside duty app" />

    <!-- Preload the stylesheets -->
    <link rel="preload" href="/css/global.css" as="style" />
    <link rel="preload" href="/css/hp.css" as="style" />
    <link rel="preload" href="/css/tables.css" as="style" />

    <!-- Apply the stylesheets -->
    <link rel="stylesheet" href="/css/global.css" rel="preload" />
    <link rel="stylesheet" href="/css/hp.css" rel="preload" />
    <link rel="stylesheet" href="/css/tables.css" rel="preload" />


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
    <script src="icon/admin-icon.js" defer></script>
    <script src="icon/register-icon.js" defer></script>
    <script src="icon/account-icon.js" defer></script>
    <script src="icon/send-icon.js" defer></script>
    <script src="icon/whatsapp-icon.js" defer></script>
    <script src="icon/sms-icon.js" defer></script>

    <script src="components/network-status.js" defer></script>
    <!-- <script src="components/filterbrothers-data.js" defer></script> -->
    <script src="components/header-info.js" defer></script>
    <script src="components/name-send-title.js" defer></script>
    <script src="components/grid-layout.js" defer></script>
    <script src="components/name-list-layout.js" defer></script>
    <script src="components/nav.js" defer></script>
    <script src="components/slide-up-modal.js" defer></script>
    <script src="components/send-options-content.js" defer></script>
    <script src="components/duty-btn.js" defer></script>
    <script src="components/name-holder.js" defer></script>
    <script src="components/send-btn.js" defer></script>
    <script src="components/login-form.js" defer></script>
    <script src="components/welcome-message.js" defer></script>
    <script src="components/account-form.js" defer></script>
    <script src="components/form-container.js" defer></script>
    <script src="components/register-form.js" defer></script>




    <script src="icon/duties-icon.js" defer></script>
    <!-- <script src="icon/rota-icon.js" defer></script> -->
    <!-- <script src="icon/counter-icon.js" defer></script> -->
    <script src="icon/login-icon.js" defer></script>

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

<div class="user-details">

    <!-- Dashboard Button -->
    <form style="display: inline;" action="index.php" method="get">
        <button type="submit" name="dashboard" class="button"
            <?php echo ($current_page == 'index.php') ? 'disabled' : ''; ?>>Dashboard</button>
    </form>

    <?php if ($isAdmin) { ?>
    <!-- Admin Button -->
    <form style="display: inline;" action="admin.php" method="get">
        <button type="submit" name="admin" class="button"
            <?php echo ($current_page == 'admin.php') ? 'disabled' : ''; ?>>Admin</button>
    </form>

    <!-- Account Button -->
    <form style="display: inline;" action="account.php" method="get">
        <button type="submit" name="account" class="button"
            <?php echo ($current_page == 'account.php') ? 'disabled' : ''; ?>>Account</button>
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