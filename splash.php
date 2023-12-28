<!DOCTYPE html>
<html>

<head>
    <title>Park Side Duty 2.0 - Login</title>
    <link rel="stylesheet" type="text/css" href="css/splash.css">
</head>

<body>
    <?php session_start(); // Start the session at the beginning of the body ?>
    <div class="splash-container">
        <h2>Park Side Duty 2.0</h2>

        <!-- Display any login error messages -->
        <?php if (isset($_SESSION['login_error'])): ?>
        <div class="error-message">
            <?php echo $_SESSION['login_error']; ?>
            <?php unset($_SESSION['login_error']); // Remove the message after displaying it ?>
        </div>
        <?php endif; ?>

        <form action="login.php" method="post">
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit" name="login">Login</button>
        </form>

        <button onclick="location.href='register.php'">Register</button>
        <!-- The Register button should point to a PHP file that handles registration -->
        <button disabled="true" onclick="location.href='guest_access.php'">Guest</button>
        <!-- The Guest button should point to a PHP file or a specific HTML page for guest users -->
    </div>
    <nav-bar></nav-bar>
</body>

</html>