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
    <form-container icon="<admin-icon></admin-icon>" title="Login" form="<login-form></login-form>"
        data-error="<?php echo $errMessage; ?>"></form-container>
    <nav-bar></nav-bar>
</body>


</html>