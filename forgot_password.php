<?php
require 'db.php';

$message = '';

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $conn->real_escape_string($_POST['email']);

    // Check if the email exists in the database
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Generate a unique token and expiration time
        $token = bin2hex(random_bytes(50));
        $expires = date("U") + 3600; // 1 hour from now

        // Save the token and expiration in the database
        $updateStmt = $conn->prepare("UPDATE users SET reset_token = ?, token_expires = ? WHERE email = ?");
        if ($updateStmt !== false) {
            $updateStmt->bind_param("sis", $token, $expires, $email);
            $updateStmt->execute();
            $updateStmt->close(); // Close inside this block
        }

        // Get the current URL (without the script name)
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $domainName = $_SERVER['HTTP_HOST'];
        $dir = dirname($_SERVER['SCRIPT_NAME']);

        // Construct the password reset URL
        $passwordResetUrl = $protocol . $domainName . $dir . "/reset_password.php?token=" . $token;

        // Send an email with the password reset link
        $to = $email;
        $subject = "Password Reset Request";
        $message = "Please click on the following link to reset your password: ";
        $message .= $passwordResetUrl;
        $headers = 'From: noreply@parksideappdomainhere.com' . "\r\n" .
                'Reply-To: noreply@parksideappdomainhere.com' . "\r\n" .
                'X-Mailer: PHP/' . phpversion();

        mail($to, $subject, $message, $headers);

        $message = "If an account with that email exists, we have sent a reset link to it.";
    } else {
        $message = "If an account with that email exists, we have sent a reset link to it.";
    }

    $stmt->close();

}

$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Forgot Password</title>
</head>
<body>
    <form action="forgot_password.php" method="post">
        Enter your email address: <input type="email" name="email">
        <input type="submit" value="Submit">
    </form>

    <?php if (!empty($message)): ?>
        <p><?= $message ?></p>
    <?php endif; ?>
</body>
</html>
