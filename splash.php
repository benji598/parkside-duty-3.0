<?php
require 'db.php';
require 'functions.php';
include 'header.php';

if (!isset($_GET['e'])) {
    $_SESSION['login_error'] = "";
}

if (isset($_SESSION['login_error']))
    $errMessage = $_SESSION['login_error'];
else
    $errMessage = "";

?>

<body>
    <login-form data-error="<?php echo $errMessage; ?>"></login-form>
    <nav-bar></nav-bar>
</body>


</html>