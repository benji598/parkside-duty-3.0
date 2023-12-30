<?php
require 'db.php';
require 'functions.php';
include 'header.php';
?>

<body>
    <!-- Display any login error messages -->
    <!-- <?php if (isset($_SESSION['login_error'])): ?>
    <div class="error-message">
        <?php echo $_SESSION['login_error']; ?>
        <?php unset($_SESSION['login_error']); // Remove the message after displaying it ?>
    </div>
    <?php endif; ?> -->
    <login-form></login-form>
    <nav-bar></nav-bar>
</body>

</html>