<?php
require 'db.php';
require 'functions.php';
include 'header.php';

if (!isset($_GET['e'])) {
    $_SESSION['login_error'] = "";
}
if (isset($_GET['m'])) {
    $message = $_GET['m'];
    echo '<div style="width:100%;text-align:center;background-color:#baffba;">' . $message . '</div>';
}


if (isset($_SESSION['login_error']))
    $errMessage = $_SESSION['login_error'];
else
    $errMessage = "";

?>


<form-container icon="<login-icon></login-icon>" title="Login" form="<login-form></login-form>"
    data-error="<?php echo $errMessage; ?>"></form-container>
<nav-bar isAdmin="<?php echo $isAdmin; ?>"></nav-bar>