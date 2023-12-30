<?php
require 'db.php';
require 'functions.php';
include 'header.php';

$errMessage = $_SESSION['login_error'];
?>

<body>
    <login-form data-error="<?php echo $errMessage; ?>"></login-form>
    <nav-bar></nav-bar>
</body>


</html>