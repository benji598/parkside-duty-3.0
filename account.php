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

<body>
    <account-form firstName="<?php echo $first_name; ?>" lastName="<?php echo $last_name; ?>"
        email="<?php echo $email; ?>" phone="<?php echo $phone; ?>">
    </account-form>

    <nav-bar isAdmin="<?php echo $isAdmin; ?>"></nav-bar>

</body>

</html>