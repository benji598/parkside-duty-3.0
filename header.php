<link rel="stylesheet" href="/css/hp.css" rel="prefetch" />
    <link rel="stylesheet" href="/css/global.css" rel="prefetch" />
    <!-- <meta name="view-transition" content="same-origin" /> -->
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Park Side</title>
    <meta name="description" content="New Parkside duty app" />


 
    <script src="/components/duty-btn.js" defer></script>
    <script src="/components/circle-icon-btn.js" defer></script>
    <script src="/components/nav.js" defer></script>
    <script src="/components/header-info.js" defer></script>
  </head>
    <!-- material icons -->
    <link rel="preload" href="/icons/MaterialIcons-Regular.woff2" as="font" type="font/woff2" crossorigin />
    <style>
      @font-face {
        font-family: 'Material Icons';
        src: url(/icons/MaterialIcons-Regular.woff2) format('woff2');
        font-style: normal;
        font-weight: 400;
        font-display: block;
      }

      body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
          'Helvetica Neue', sans-serif;
      }
    </style>

<?php if (!isset($_SESSION)) { session_start(); } ?>

<!-- Redirect to splash.php if the user isn't logged in -->
<?php if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header('Location: splash.php');
    exit;
} ?>

<!-- User's first name and last name are stored in the session -->
<?php
$first_name = $_SESSION['first_name'] ?? 'Guest';
$last_name = $_SESSION['last_name'] ?? '';

// Get the current page's filename
$current_page = basename($_SERVER['PHP_SELF']);
?>

<div class="user-details">

    <!-- Dashboard Button -->
    <form style="display: inline;" action="index.php" method="get">
        <button type="submit" name="dashboard" class="button" <?php echo ($current_page == 'index.php') ? 'disabled' : ''; ?>>Dashboard</button>
    </form>

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
</div>
