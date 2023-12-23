<?php
include 'header.php'; 

// Redirect to splash.php if the user isn't logged in
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header('Location: splash.php');
    exit;
}

// Retrieve user details from the session
$first_name = $_SESSION['first_name'];
$last_name = $_SESSION['last_name'];
$email = $_SESSION['email'];
$phone = $_SESSION['phone']; 
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Account Settings - Park Side</title>
    <meta name="description" content="New Parkside duty app" />

    <link rel="stylesheet" href="/css/hp.css" rel="prefetch" />
    <link rel="stylesheet" href="/css/global.css" rel="prefetch" />
    <!-- <meta name="view-transition" content="same-origin" /> -->

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
    <script src="/components/duty-btn.js" defer></script>
    <script src="/components/circle-icon-btn.js" defer></script>
    <script src="/components/nav.js" defer></script>
    <script src="/components/header-info.js" defer></script>
  </head>
<body>
    <main class="container overflow">
    <header-info>
      <div slot="title-slot">Account Settings</div>
      <div slot="subtitle-slot">
      </div>
    </header-info>
        <div class="account-container">
        
            <form action="handle_account_update.php" method="post">
                <input type="text" name="first_name" value="<?php echo htmlspecialchars($first_name); ?>" required>
                <input type="text" name="last_name" value="<?php echo htmlspecialchars($last_name); ?>" required>
                <input type="email" name="email" value="<?php echo htmlspecialchars($email); ?>" required>
                <input type="tel" name="phone" value="<?php echo htmlspecialchars($phone); ?>" required>
                <!-- Include additional fields as necessary -->
                <button type="submit" name="update_account">Update Account</button>
                <a href="index.php" class="back-button">Back to Dashboard</a>
            </form>
        </div>
    </main>
    <nav-bar></nav-bar>
</body>
</html>
